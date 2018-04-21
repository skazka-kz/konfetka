import React from "react";
import PropTypes from "prop-types";
import { FakeImage, Gallery, PlaceholderImage } from "./styledCollection";

const ShopGallery = props => {
  return props.isLoading ? (
    <Gallery>
      <FakeImage key="one" />
      <FakeImage key="two" />
      <FakeImage key="three" />
      <FakeImage key="four" />
    </Gallery>
  ) : (
    <Gallery>
      <PlaceholderImage />
      <PlaceholderImage />
      <PlaceholderImage />
      <PlaceholderImage />
    </Gallery>
  );
};

ShopGallery.propTypes = {
  isLoading: PropTypes.bool
};

export default ShopGallery;
