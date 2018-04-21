import React from "react";
import styled from "styled-components";
import { view } from "react-easy-state";
import overlayStore from "../../../stores/overlayStore";

const OverlayDiv = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 64px;
  background-color: gray;
  z-index: 2;
  opacity: 0.7;
`;

class Overlay extends React.Component {
  render() {
    return overlayStore.isActive ? <OverlayDiv /> : null;
  }
}

export default view(Overlay);
