import React, { Fragment } from 'react';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';
import Colors from '../../constants/Colors';

const PageLoader = ({ loading, children, style, noPadding }) => {
  const custom = noPadding ? {paddingTop: '0px'} : {paddingTop: "100px"}
  return loading ? (
    <div style={{ ...style, ...LoadingStyle, ...custom}}>
      <Loader type="Plane" color={Colors.purple} height="100" width="100" />
    </div>
  ) : (
    <Fragment>{children}</Fragment>
  );
};

PageLoader.propsType = {
  loading: PropTypes.bool,
};

const LoadingStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  // paddingTop: '100px',
};

export default PageLoader;
