import React, { Component } from "react";
import {
  Divider,
  GreyText,
  OrangeHeader,
  SectionWrapper,
  SlimContentSection
} from "../../styled/frontPageCollection";
import { CandyOverlay, TransparencyLayer } from "./styledCollection";
import ShopList from "./ShopList";

class ShopSelector extends Component {
  render() {
    return (
      <SectionWrapper>
        <CandyOverlay />
        <TransparencyLayer />
        <SlimContentSection>
          <OrangeHeader>О Нас</OrangeHeader>
          <GreyText>
            Конфетка - сеть специализированных магазинов кондитерских изделий в
            городе Кокшетау. В Конфетке вы всегда найдете огромный выбор
            сладостей на любой вкус от самых вкусных производителей Казахстана,
            России и Украины. Так же в Конфетке вы найдете большой выбор
            сезонных продуктов, таких как новогодние подарки.
          </GreyText>
          <Divider />
          <ShopList />
        </SlimContentSection>
      </SectionWrapper>
    );
  }
}

export default ShopSelector;
