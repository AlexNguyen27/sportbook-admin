import React, { Component } from "react";
import { DropzoneArea } from "material-ui-dropzone";

class DropzoneAreaCustom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
  }
  handleChange(files) {
    this.setState({
      files: files,
    });

    console.log(files);
  }
  render() {
    return (
      <DropzoneArea
        onChange={(files) => this.handleChange(files)}
        acceptedFiles={["image/*"]}
        dropzoneText={"Drag and drop an image here or click"}
        maxFileSize={5000000}
        filesLimit={10}
      />
    );
  }
}

export default DropzoneAreaCustom;
