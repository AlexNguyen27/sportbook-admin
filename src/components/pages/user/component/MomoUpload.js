import React, { useState } from "react";
import { Paper, Tooltip } from "@material-ui/core";
import PageLoader from "../../../custom/PageLoader";
import { BASE_IMAGE_URL } from "../../../../store/actions/types";
import { makeStyles } from "@material-ui/core/styles";
import { uploadMomoQRCode } from "../../../../store/actions/user";
import { storage } from "../../../../constants/firebase";
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
  // btnUploadMomo: {
  //   position: "absolute",
  //   right: "116px",
  //   top: "450px",
  // },
  inputFile: {
    // display: "none",
  },
}));
const MomoUpload = ({
  momoQRCode,
  setMomoQRCode,
  uploadMomoQRCode,
  userId,
}) => {
  const classes = useStyles();
  const [loadingUploadMomo, setLoadingUploadMomo] = useState(false);

  const handleUploadMomoQRCode = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      try {
        setLoadingUploadMomo(true);
        const uploadTask = storage
          .ref(`/manager/momoQRCode/${file.name}`)
          .put(file);
        uploadTask.on("state_changed", console.log, console.error, () => {
          storage
            .ref("/manager/momoQRCode")
            .child(file.name)
            .getDownloadURL()
            .then((url) => {
              setMomoQRCode(url);
              uploadMomoQRCode(setLoadingUploadMomo, url, userId);
            });
        });
      } catch (error) {
        console.log(error, "upload error------------------");
      }
    }
  };
  return (
    <Paper className={[classes.paper, "mt-4"].join(" ")}>
      <PageLoader loading={loadingUploadMomo}>
        <img
          src={momoQRCode || BASE_IMAGE_URL}
          alt="Girl in a jacket"
          width="100%"
          height={200}
          onClick={() => window.open(momoQRCode || BASE_IMAGE_URL, "_black")}
        />
        <Tooltip title="Upload new QR Cocde" aria-label="image">
          <div>
            <input
              accept="image/*"
              id="icon-button-file"
              multiple
              key="momoQRCode"
              type="file"
              onChange={(e) => handleUploadMomoQRCode(e)}
            />
            {/* <label htmlFor="icon-button-file">
              <IconButton
                aria-label="upload"
                className={classes.btnUploadMomo}
                component="span"
              >
                <CloudUploadIcon fontSize="large" />
              </IconButton>
            </label> */}
          </div>
        </Tooltip>
        <h6 className="mb-0 mt-2 font-weight-bold">Personal Momo QR Code</h6>
      </PageLoader>
    </Paper>
  );
};

export default connect(null, { uploadMomoQRCode })(MomoUpload);
