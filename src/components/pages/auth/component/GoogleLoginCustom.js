import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import Swal from "sweetalert2";
import { Button } from "@material-ui/core";
import LoginModal from "./LoginModal";

// TODO ADD ENVIRONMENT KEY
const GoogleLoginCustom = () => {
  const [googleData, setGoogleData] = useState();
  const [loginModal, setLoginModal] = useState(false);

  const onFailure = (response) => {
    if (response?.error !== 'popup_closed_by_user') {
      Swal.fire({
        position: "center",
        type: "Warning",
        title: "An error occurred!\n Please try again!",
        showConfirmButton: true,
      });
    }
  };

  const ohSuccess = (response) => {
    setGoogleData(response?.profileObj);
    setLoginModal(true);

    // CREATE ACOUNT
    // create account
    // call api login
    // LOGIN WITH EMAIL AND PASSWORD ALSO
  };

  return (
    <>
      <GoogleLogin
        clientId="763384219926-86bkbi1pht54l1bl321epthe7n63b0ra.apps.googleusercontent.com"
        buttonText="Login with google"
        render={(renderProps) => (
          <Button
            className="mt-3 w-100"
            variant="contained"
            type="submit"
            style={{ backgroundColor: "#ec524b", color: "white" }}
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            startIcon={<i className="fab fa-google-plus-g" />}
          >
            Login with Google
          </Button>
        )}
        onSuccess={ohSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
      />
      <LoginModal
        modal={loginModal}
        setModal={setLoginModal}
        userData={googleData}
      />
    </>
  );
};

export default GoogleLoginCustom;
