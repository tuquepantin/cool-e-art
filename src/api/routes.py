"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

def set_password(password, salt):
    return generate_password_hash(f"{password}{salt}")


def check_password(hash_password, password, salt):
    return check_password_hash(hash_password, f"{password}{salt}")


@api.route('/user', methods=['POST'])
def register_user():
    if request.method == "POST":
        data_files = request.files
        data_form = request.form
        

        data = {
            "name": data_form.get("name"),
            "last_name": data_form.get("lastname"),
            "email": data_form.get("email"),
            "password": data_form.get("password"),
            "avatar": data_files.get("avatar")
        }

        
        if data is None:
            return jsonify({"msg": "Missing JSON in request"}), 400
        if data.get("name") is None:
            return jsonify({"msg": "Missing name parameter"}), 400
        if data.get("last_name") is None:
            return jsonify({"msg": "Missing last name parameter"}), 400
        if data.get("email") is None:
            return jsonify({"msg": "Missing email parameter"}), 400
        if data.get("password") is None:
            return jsonify({"msg": "Missing password parameter"}), 400
        if data.get("avatar") is None:
            return jsonify({"msg": "Missing avatar parameter"}), 400

        user = User.query.filter_by(email=data.get("email")).first()
        if user is not None:
            return jsonify({"msg": "Email already registered"}), 400

        password_salt = b64encode(os.urandom(32)).decode('utf-8')
        password_hash = set_password(data.get("password"), password_salt)

        response_image = uploader.upload(data.get("avatar"))
        data.update({"avatar": response_image.get("url")})

        new_user = User(
            name=data.get("name"),
            last_name=data.get("last_name"),
            email=data.get("email"),
            password=password_hash,
            avata=data.get("avatar"),
            salt=password_salt
        )

        db.session.add(new_user)
        try:
            db.session.commit()
            return jsonify({"msg": "User successfully registered"}), 201
        except Exception as error:
            db.session.rollback()
            return jsonify({"msg": "Error registering user", "error": str(error)}), 500
        return jsonify([]), 200