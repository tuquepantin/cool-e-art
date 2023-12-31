import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Card } from "../component/Card";
import { Favorite } from "../component/Favorite.jsx";
import UserSVG from "../component/UserSVG.jsx";
import { SocialIcon } from 'react-social-icons'
import Card2 from "../component/Card2.jsx"
import EditUser from "../component/EditUser.jsx";


function UserPage() {
  const { store, actions } = useContext(Context);
  const { getIlustrationsByUser, getFavorite } = actions
  const { ilustrationsUser, userData, favoriteData } = store;

  useEffect(() => { getIlustrationsByUser(userData.alias) },
    [userData.alias])

  useEffect(() => { getFavorite }, [])

  return (
    <>
      <div>
        <div className="container-fluid profile d-inline-flex justify-content-center py-3">
          {!userData.image ? <UserSVG /> : <img
            src={userData.image}
            className="rounded-circle "
            alt="..."
            style={{ width: "150px" }}
          />}

          <div className="col-lg-5 col-md-8 h-25 text-black ps-3 pt-2 ">
            <h1 className="fw-light">{userData.alias}</h1>
            <p className="fst-italic">
              {userData.name} {userData.lastname}
            </p>
            <EditUser />
          </div>
          <div className="row flex-column  link-dark">

            {userData.facebook && (
              <div>
                <SocialIcon network="facebook" className="p-2 link-dark" />{" "}
                <a href={`https://www.facebook.com/${userData.facebook}`} className="link-dark">
                  {userData.facebook}
                </a>
              </div>
            )}
            {userData.instagram && (
              <div className="link-dark py-2">
                <SocialIcon network="instagram" /><a href={`https://www.instagram.com/${userData.instagram}`} className="link-dark">  {userData.instagram}</a>
              </div>

            )}
            {userData.twitter && (
              <div>
                <SocialIcon network="twitter" className="link-dark" /> <a href={`https://www.twitter.com/${userData.twitter}`} className="link-dark">{userData.twitter}</a>
              </div>
            )}

          </div>

        </div>
        <div className=" d-flex justify-content-between p-3 my-3 rounded text-white">
          <div className="lh-1">
            <h3 className="mb-0 lh-1"><i className="fa-solid fa-palette"></i>&nbsp;My Art</h3>
          </div>
          <div>
            <Link to={`/edit`}>
              <button type="button" className="btn btn-danger"><i class="fa-solid fa-eraser"></i></button>
            </Link>
          </div>
        </div>
        {ilustrationsUser.length > 0 ? (
          <div className=" py-5 bg-body-tertiary">
            <div className="container  ">
              <div className=" row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

                {ilustrationsUser.map((ilustration) => (

                  <div className="d-flex gap-2 pb-2" key={ilustration.id}>
                    <Card2
                      image={ilustration.image}
                      title={ilustration.title}
                      description={ilustration.description}
                      user={ilustration.user}
                      id={ilustration.id}
                      alias={userData.alias}
                      category={ilustration.category}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (

          <div className="alert alert-warning mx-3" role="alert">
            Por favor, agrega alguna ilustración.
          </div>

        )}

        {favoriteData.length > 0 ? (
          <>
            <div className="d-flex align-items-center p-3 my-3 rounded text-white">
              <div className="lh-1">
                <h3 className="mb-0 lh-1"><i className="fa-solid fa-star" style={{ color: "yellow" }}></i>&nbsp;Favorites</h3>
              </div>
            </div>

            <div className="album py-5 bg-body-tertiary">
              <div className="container">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

                  {favoriteData.map((ilustration) => (
                    <div className="col" key={ilustration.id}>
                      {ilustration && (
                        <Favorite

                          image={ilustration.image}
                          title={ilustration.title}
                          description={ilustration.description}
                          user={ilustration.user}
                          id={ilustration.id}
                          
                          alias={ilustration.user.alias}
                          category={ilustration.category}
                          ilustration_id={ilustration.ilustration_id}
                        />)}
                      <div className="btn-group">
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="alert alert-info mx-3" role="alert">
            No tienes Favoritos.
          </div>
        )}
      </div>
    </>
  );
}

export default UserPage;
