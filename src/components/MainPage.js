import React from "react";
import { HeaderLink, HeaderLinksContainer } from "./styled/frontPageCollection";
import PopularProducts from "./front/products/PopularProductsSection";
import FrontErrorBoundary from "./FrontErrorBoundary";
import Carousel from "./front/Carousel";
import ShopSelector from "./front/shops/ShopSelector";
import MapSection from "./front/map/MapSection";

const MainPage = () => (
  <div>
    <HeaderLinksContainer>
      <HeaderLink href="#">Популярные</HeaderLink>
      <HeaderLink href="#">О Нас</HeaderLink>
      <HeaderLink href="#">Контакты</HeaderLink>
    </HeaderLinksContainer>
    <FrontErrorBoundary>
      {/*<Carousel />*/}
      <PopularProducts
        perPage={4}
        onlyPopular
        sectionTitle="Популярные продукты"
        showCategories={false}
      />
      <PopularProducts perPage={8} sectionTitle="Ассортимент" showCategories />
      <ShopSelector />
      <MapSection />
    </FrontErrorBoundary>
  </div>
);

export default MainPage;
