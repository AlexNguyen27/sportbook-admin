import React, { useState, useEffect } from "react";
import { FacebookProvider, LoginButton } from "react-facebook";
import { Button } from "@material-ui/core";
import { checkExitsEmail } from "../../../../store/actions/user";
import { loginUser } from "../../../../store/actions/auth";
import { connect } from "react-redux";
import LoginModal from "./LoginModal";
import Swal from "sweetalert2";

const FacebookLoginCustom = ({
  checkExitsEmail,
  loginUser,
  title = " Login with Facebook",
}) => {
  const [fbData, setFBData] = useState();
  const [loginModal, setLoginModal] = useState(false);
  const [exitEmail, setIsExitEmail] = useState({});

  const handleError = (response) => {
    console.log('reponse-------', response);
    if (response?.error) {
      Swal.fire({
        position: "center",
        type: "Warning",
        title: "An error occurred!\n Please try again!",
        showConfirmButton: true,
      });
    }
  };

  const [loading, setLoading] = useState(false);

  const handleResponse = (response) => {
    console.log("d--------ohSuccess------------", response);
    const { email } = response?.profile;
    setLoading(true);
    checkExitsEmail(setLoading, email, setIsExitEmail).then(() => {
      const formatData = {
        email: response.profile.email,
        familyName: response?.profile?.first_name || "",
        givenName: response?.profile?.last_name || "",
        imageUrl: response?.profile?.picture?.data.url,
      };
      setFBData(formatData);
    });
  };

  useEffect(() => {
    if (exitEmail?.status) {
      loginUser({
        email: fbData?.email,
        hashPassword: exitEmail.hashPassword,
      });
    } else if (fbData?.email) {
      setLoginModal(true);
    }
  }, [setIsExitEmail, exitEmail, setFBData, fbData]);

  return (
    <>
      <FacebookProvider appId="685323535689330">
        <LoginButton
          className="w-100 border-0 bg-white"
          scope="email"
          onCompleted={handleResponse}
          onError={handleError}
        >
          <Button
            className="mt-3 w-100"
            variant="contained"
            style={{ backgroundColor: "#3f72af", color: "white" }}
          >
            {title}
          </Button>
        </LoginButton>
      </FacebookProvider>
      <LoginModal
        title="Facebook"
        modal={loginModal}
        setModal={setLoginModal}
        userData={fbData}
      />
    </>
  );
};

export default connect(null, { checkExitsEmail, loginUser })(
  FacebookLoginCustom
);
