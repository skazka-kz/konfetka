import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 0.5rem;
  width: 45%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    width: 30%;
  }

  @media (min-width: 1024px) {
    width: 20%;
  }
`;
const ImageWrapper = styled.div`
  height: 200px;
  display: flex;
`;
const FrontImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  align-self: center;
`;
const Label = styled.p`
  padding: 0;
  margin: 0;
  color: #393939;
  font-weight: 300;
`;

const PriceLabel = styled(Label)`
  color: #FE6321;
  font-weight: 700;
  padding-top: 1rem;
`;

const LargeLabel = styled.h4`
  margin: 0;
  color: #1d1d1d;
  font-weight: 300;
  font-size: 1.3rem;
  text-align: center;
  padding: 0 0 1rem;
`;


const ProductItem = props => (
  <Wrapper>
    <ImageWrapper>
      <FrontImage src={props.frontImage.path} alt={props.frontImage.title} />
    </ImageWrapper>
    <LargeLabel>{props.title}</LargeLabel>
    <Label>{props.weight}</Label>
    <PriceLabel>{props.price}</PriceLabel>
  </Wrapper>
);

export default ProductItem;
