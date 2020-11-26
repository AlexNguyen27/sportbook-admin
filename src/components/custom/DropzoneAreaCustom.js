import React, { useState } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import { storage } from "../../constants/firebase";
import { Row, Col } from "reactstrap";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import PageLoader from "./PageLoader";
const DropzoneAreaCustom = ({ urls, setUrls }) => {
  const [loading, setLoading] = useState(false);

  const handleUpload = (files) => {
    const file = files[urls.length];
    if (file) {
      try {
        setLoading(true);
        const uploadTask = storage.ref(`/ground/images/${file.name}`).put(file);
        uploadTask.on("state_changed", console.log, console.error, () => {
          storage
            .ref("/ground/images")
            .child(file.name)
            .getDownloadURL()
            .then((url) => {
              console.log(url);
              console.log(file.name);
              setLoading(false);
              setUrls([...urls, url]);
            });
        });
      } catch (error) {
        console.log(error, "error------------------");
      }
    }
  };
  const onDeleteImage = (url) => {
    const newUrls = urls.filter((item) => item !== url);
    setUrls(newUrls);
  };

  console.log(urls);
  return (
    <>
      <DropzoneArea
        onChange={(files) => handleUpload(files)}
        acceptedFiles={["image/*"]}
        dropzoneText={"Drag and drop an image here or click"}
        maxFileSize={5000000}
        filesLimit={10}
        showPreviewsInDropzone={false}
      />
      <PageLoader loading={loading}>
        <Row className="mt-4">
          {urls.map((url, index) => (
            <Col xs={4} key={index + 1}>
              <img
                style={{ position: "relative" }}
                width="100%"
                height="100%"
                src={url}
                onClick={() => window.open(url, "_blank")}
                alt={"ground"}
              />
              <IconButton
                onClick={() => onDeleteImage(url)}
                style={{ position: "absolute", right: "17px" }}
                aria-label="delete"
                size="small"
              >
                <CloseIcon />
              </IconButton>
            </Col>
          ))}
        </Row>
      </PageLoader>
    </>
  );
};

// https://image.plo.vn/Uploaded/2020/xpckxpiu/2019_10_21/lisa-plo-1_jttt.jpg
export default DropzoneAreaCustom;
