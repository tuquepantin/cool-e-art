import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const initialState = {
  email: "",
  password: "",
};

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const { userData, name, alias } = store;
  const [user, setUser] = useState(initialState);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await actions.login(user);
    if (response == 200) {
      Swal.fire({
        title: "Usuario logueado con éxito",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
      await actions.getUserData;
      navigate(`/`);
    }
    if (response == 400) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Bad Credentials!",
      });
    }
  };

  const handleChange = ({ target }) => {
    setUser({
      ...user,
      [target.name]: target.value,
    });
  };
  return (
 
<nav className="navbar navbar-expand-lg navbar-light  ">
  <div className="container ">
    <Link className="navbar-brand" to="#">Cool-e-Art</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {!store.token && (
          <>
            <li className="nav-item">
              <Link to="/" className="nav-link " aria-current="page">Home</Link>
            </li>
          </>
        )}

        {store.token && (
          <>
            <li className="nav-item">
              <Link to="/" className="nav-link " aria-current="page">Home</Link>
            </li>
            <li className="nav-item">
              <Link to={`/profile`} className="nav-link ">My Profile</Link>
            </li>
            <li className="nav-item">
              <Link to="/upload" className="nav-link ">Upload Creation</Link>
            </li>
          </>
        )}
      </ul>

      <div className="ms-auto d-flex">
        {!store.token && (
          <>
            <div className="me-2">
              <Link to="/register" className="btn btn-primary">Registro</Link>
            </div>
            <div className="dropdown">
              <button
                type="button"
                className="btn btn-primary dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                data-bs-auto-close="outside"
              >
                Login
              </button>
              <form className="dropdown-menu p-4">
              <div className="mb-3">
                  <label
                    htmlFor="exampleDropdownFormEmail2"
                    className="form-label"
                  >
                    Email address
                  </label>

                  <input
                    onChange={handleChange}
                    name="email"
                    type="email"
                    className="form-control"
                    id="exampleDropdownFormEmail2"
                    placeholder="email@example.com"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleDropdownFormPassword2"
                    className="form-label"
                  >
                    Password
                  </label>
                  <input
                    onChange={handleChange}
                    name="password"
                    type="password"
                    className="form-control"
                    id="exampleDropdownFormPassword2"
                    placeholder="Password"
                  />
                </div>
                <div className="mb-3">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="dropdownCheck2"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="dropdownCheck2"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-primary w-100 mt-3"
                  onClick={() => handleLogin()}
                >
                  Sign in
                </button>
              </form>
            </div>
          </>
        )}

        {store.token && (
          <>
          
            <span className="m-2">Hey, {name}!</span>
          
          
      <button
        className=" btn btn-outline-info "
        onClick={()=> actions.logout()}
      >
        Log Out
      </button>
    
          </>
        )}
      </div>
    </div>
  </div>
</nav>


  );
};
