import React from "react";
import styled, { keyframes } from "styled-components";

import candyPattern from "../../../resources/candy_pattern.png";

const orange = "#fc5f21";
/*const brown = "#70401C";
const lightGrey = "#A2A2A2";
const darkGrey = "#686868";*/

export const CandyOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url(${candyPattern});
  z-index: -2;
`;
export const TransparencyLayer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: white;
  background: -webkit-linear-gradient(
    rgba(255, 255, 255, 0.25),
    white,
    rgba(0, 0, 0, 0)
  );
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.65),
    rgba(255, 255, 255, 0.9),
    rgba(255, 255, 255, 0.65)
  );
`;

export const ShopListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 900px;
  padding: 0 2rem;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const ShopListDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    width: 37%;
  }
`;
export const Gallery = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 2rem;
  @media (min-width: 768px) {
    width: 60%;
  }
`;
export const GalleryImage = styled.img`
  max-width: 250px;
  max-height: 250px;
  margin-bottom: 2rem;
`;
export const DropDown = styled.select`
  width: 90%;
  background-color: white;
  border-radius: 0.25rem;
  border: 2px solid ${orange};
  padding: 0.5rem;
  font-size: 1.1rem;
`;

export const DetailsTable = styled.table`
  width: 100%;
  font-size: 1.2rem;
`;

export const CenteredCell = styled.td`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const GreySpan = styled.span`
  color: gray;
`;

const orangePulse = keyframes`
  0% {
    background-color: rgba(252,95,33,0.1)
  }
  50% {
    background-color: rgba(252,95,33,0.3)
  }
  100% {
    background-color: rgba(252,95,33,0.1)
  }
`;

const blackPulse = keyframes`
  0% {
    background-color: rgba(0,0,0,0.1)
  }
  50% {
    background-color: rgba(0,0,0,0.3)
  }
  100% {
    background-color: rgba(0,0,0,0.1)
  }
`;

const greyPulse = keyframes`
  0% {
    background-color: rgba(104,104,104,0.1)
  }
  50% {
    background-color: rgba(104,104,104,0.3)
  }
  100% {
    background-color: rgba(104,104,104,0.1)
  }
`;

const FakeText = styled.div`
  height: 1rem;
  width: 75%;
  min-width: 75px;
  margin-bottom: 0.25rem;
`;

export const OrangeFakeText = styled(FakeText)`
  animation: ${orangePulse} 2s linear infinite;
  margin-top: 2rem;
  margin-bottom: 1rem;
  height: 1.75rem;
`;

export const BlackFakeText = styled(FakeText)`
  animation: ${blackPulse} 2s linear infinite;
`;

export const GreyFakeText = styled(FakeText)`
  animation: ${greyPulse} 2s linear infinite;
`;

export const FakeImage = styled.div`
  opacity: 0.5;
  width: 47%;
  height: 100px;
  margin-bottom: 1rem;
  animation: ${orangePulse} 5s linear infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  font-weight: 300;
  text-align: center;

  @media (min-width: 768px) {
    height: 150px;
  }
  
  @media (min-width: 1024px) {
    width: 240px;
    height: 170px;
  }
  
`;

export const PlaceholderImage = () => <FakeImage>Фото скоро будет</FakeImage>;
