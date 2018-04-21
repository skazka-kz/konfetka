import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const LoadingOverlayDiv = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #c2c2c2cc;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 15;
`;

export default class LoadingOverlay extends React.Component {
  render() {
    if (this.props.isLoading) {
      return (
        <LoadingOverlayDiv>
          <div className="preloader-wrapper big active">
            <div className="spinner-layer spinner-blue-only">
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
        </LoadingOverlayDiv>
      );
    } else {
      return null;
    }
  }
}

LoadingOverlay.propTypes = {
  isLoading: PropTypes.bool
};
