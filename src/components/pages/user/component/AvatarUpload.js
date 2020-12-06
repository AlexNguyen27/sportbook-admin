import React, { useState } from "react";
import { Paper, Tooltip } from "@material-ui/core";
import PageLoader from "../../../custom/PageLoader";
import { BASE_IMAGE_URL } from "../../../../store/actions/types";
import { makeStyles } from "@material-ui/core/styles";
import { storage } from "../../../../constants/firebase";
import { uploadAvatar } from "../../../../store/actions/user";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  // image: {
  //   position: "relative",
  // },
  // btnUpload: {
  //   position: "absolute",
  //   right: "116px",
  //   top: "155px",
  // },
  inputFile: {
    // display: "none",
  },
}));
const AvatarUpload = ({ avatar, setAvatar, uploadAvatar, userId }) => {
  const classes = useStyles();
  const [loadingUpload, setLoadingUpload] = useState(false);

  const handleUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      try {
        setLoadingUpload(true);
        const uploadTask = storage.ref(`/user/avatars/${file.name}`).put(file);
        uploadTask.on("state_changed", console.log, console.error, () => {
          storage
            .ref("/user/avatars")
            .child(file.name)
            .getDownloadURL()
            .then((url) => {
              setAvatar(url);
              uploadAvatar(setLoadingUpload, url, userId);
            });
        });
      } catch (error) {
        console.log(error, "upload error------------------");
      }
    }
  };

  return (
    <Paper className={[classes.paper, "mt-4"].join(" ")}>
      <PageLoader loading={loadingUpload}>
        <img
          src={avatar || BASE_IMAGE_URL}
          alt="Girl in a jacket"
          width="100%"
          height={200}
          onClick={() => window.open(avatar || BASE_IMAGE_URL, "_black")}
        />
        <Tooltip title="Upload new Avatar" aria-label="image">
          <div>
            <input
              accept="image/*"
              id="icon-button-file"
              multiple
              key="avatar"
              type="file"
              onChange={(e) => handleUpload(e)}
            />
          </div>
        </Tooltip>
        <h6 className="mb-0 mt-2 font-weight-bold">Your Avatar</h6>
      </PageLoader>
    </Paper>
  );
};

export default connect(null, { uploadAvatar })(AvatarUpload);
