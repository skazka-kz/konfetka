import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ClickableIcon from "../../styled/ClickableIcon";

const InputOverlayStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  position: absolute;
  outline: 2px dashed black;
  outline-offset: -0.5rem;
  z-index: 1;
  width: 100%;
  height: 12.5rem;
  background-color: ${props => (props.fileIsDragged ? "#c1fec1" : "#ecebea")};
`;

const Text = styled.span`
  font-size: 1.25rem;
  text-align: center;
`;

const InputOverlay = props => {
  return (
    <InputOverlayStyle fileIsDragged={props.fileIsDragged}>
      <ClickableIcon large>file_upload</ClickableIcon>
      <Text>Click to add files or drag-n-drop here (max 8 images)</Text>
    </InputOverlayStyle>
  );
};

InputOverlayStyle.propTypes = {
  fileIsDragged: PropTypes.bool
};

export default InputOverlay;
