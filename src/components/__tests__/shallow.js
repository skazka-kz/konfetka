import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MainPage from "../MainPage";
import LandingPage from "../LandingPage";
import CarouselContainer from "../front/Carousel";
import ShopSelector from "../front/shops/ShopSelector";
import MapSection from "../front/map/MapSection";

describe("Can shallowly render main components that don't rely on APIs", () => {
  beforeAll(() => {
    Enzyme.configure({ adapter: new Adapter() });
  });

  it("Renders <MainPage />", () => {
    Enzyme.shallow(<MainPage />);
  });

  it("Renders <LandingPage />", () => {
    Enzyme.shallow(<LandingPage/>);
  });

  it("Renders <Carousel />", () => {
    Enzyme.shallow(<CarouselContainer/>);
  });

  it("Renders <ShopSelector />", () => {
    Enzyme.shallow(<ShopSelector/>);
  });

  it("Renders <MapSection/>", () => {
    Enzyme.shallow(<MapSection/>)
  });
});
