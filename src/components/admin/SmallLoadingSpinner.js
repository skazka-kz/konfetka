import React from "react";
import PropTypes from "prop-types";

const LoadingSpinner = props => {
  if (props.isLoading) {
    return (
      <div className="preloader-wrapper active">
        <div className="spinner-layer spinner-green-only">
          <div className="circle-clipper left">
            <div className="circle" />
          </div>
          <div className="gap-patch">
            <div className="circle" />
          </div>
          <div className="circle-clipper right">
            <div className="circle" />
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

LoadingSpinner.propTypes = {
  isLoading: PropTypes.bool
};

export default LoadingSpinner;
