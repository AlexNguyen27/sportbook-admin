import React, { useState } from "react";
import { storage } from "../../constants/firebase";
import Swal from "sweetalert2";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

export default function Upload({
  showImage,
  path = "iamges",
  successMessage = () =>
    Swal.fire({
      position: "center",
      type: "success",
      title: "Uploaded successfully!",
      showConfirmButton: false,
      timer: 1500,
    }),
  accept = "images/*",
}) {
  const [file, setFile] = useState(null);
  const [url, setURL] = useState("");

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  function handleUpload(e) {
    e.preventDefault();
    try {
      const uploadTask = storage.ref(`/${path}/${file.name}`).put(file);
      uploadTask.on("state_changed", console.log, console.error, () => {
        storage
          .ref(`${path}`)
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            setFile(null);
            setURL(url);
            successMessage();
          });
      });
    } catch (error) {
      console.log(error, "upload error------------------");
    }
  }

  return (
    <div>
      <form onSubmit={handleUpload}>
        <div style={{ overflow: "hidden" }}>
          <input type="file" accept={accept} onChange={handleChange} />
          
        </div>
        <Button
          variant="contained"
          color="primary"
          size="small"
          className="m-2"
          startIcon={<SaveIcon />}
          disabled={!file}
        >
          Apply change
        </Button>
      </form>
      {showImage && <img src={url} alt="" />}
    </div>
  );
}
