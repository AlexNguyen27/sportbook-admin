import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Videocam from '@material-ui/icons/Videocam';

const styles = (theme) => ({
  input: {
    display: 'none',
  },
});

const MediaCapture = () => {
  const [image, setImage] = useState({
    name: '',
    data: '',
  });
  const [video, setVideo] = useState([]);

  const handleCapture = ({ target }) => {
    const fileReader = new FileReader();
    const name = target.accept.includes('image') ? 'images' : 'videos';

    fileReader.readAsDataURL(target.files[0]);
    fileReader.onload = (e) => {
      // HANDLE WHEN SHOW IMAGE
    };
  };

  return (
    <Fragment>
      <input
        // accept="image/*"
        // className={classes.input}
        style={styles.input}
        id="icon-button-photo"
        onChange={handleCapture}
        type="file"
      />
      <label htmlFor="icon-button-photo">
        <IconButton color="primary" component="span">
          <PhotoCamera />
        </IconButton>
      </label>

      <input
        // accept="video/*"
        capture="camcorder"
        style={styles.input}
        id="icon-button-video"
        onChange={handleCapture}
        type="file"
      />
      <label htmlFor="icon-button-video">
        <IconButton color="primary" component="span">
          <Videocam />
        </IconButton>
      </label>
    </Fragment>
  );
};

export default withStyles(styles, { withTheme: true })(MediaCapture);
