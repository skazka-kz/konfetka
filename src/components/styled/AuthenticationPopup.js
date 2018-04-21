import styled, { keyframes } from "styled-components";
import { fadeInDown } from "react-animations";

const fader = keyframes`${fadeInDown}`;

export default styled.div`
  position: absolute;
  top: 64px;
  padding: 1rem;
  width: 100%;
  right: 0;
  z-index: 5;
  animation: 0.5s ${fader};
  background-color: white;
`;
