import React, { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import Colors from "../../constants/Colors";
import { logoutUser } from "../../store/actions/auth";

import Landing from "./Landing";

const Navbar = ({ logoutUser }) => {
  const isAuthenticated = true;
  // const logoutButton = (
  //   <ul className="navbar-nav">
  //     <li className="nav-item">
  //       <Link
  //         className="nav-link"
  //         to=""
  //         onClick={() => {
  //           logoutUser();
  //         }}
  //       >
  //         Log out
  //       </Link>
  //     </li>
  //   </ul>
  // );

  // const loginButton = (
  //   <ul className="navbar-nav">
  //     <li className="nav-item">
  //       <Link className="nav-link" to="/staffLogin">
  //         Login
  //       </Link>
  //     </li>
  //   </ul>
  // );

  const signUpButton = (
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link className="nav-link" to="/signup">
          Sign up
        </Link>
      </li>
    </ul>
  );

  return (
    <>
      <nav
        className="navbar navbar-expand-md navbar-dark"
        style={{ background: Colors.purple }}
      >
        <Link className="navbar-brand" to="/login">
          Dev Troops
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav mr-auto">
            {/* Login */}
            <Fragment>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
              {/* <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Admin
              </NavLink>
            </li> */}
              {/* <li className="nav-item">
              <NavLink className="nav-link" to="/studentLogin">
                Student
              </NavLink>
            </li> */}
            </Fragment>
          </ul>
          {/* {loginButton} */}
          {signUpButton}
          {/* {logoutButton} */}
        </div>
      </nav>
      {!isAuthenticated && <Landing />}
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(Navbar);
