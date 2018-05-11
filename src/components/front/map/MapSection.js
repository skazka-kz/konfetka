import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import map from "../../../resources/map.png";

const MapWrapper = styled.div`
  height: 482px;
  width: 100%;
  background: url(${map}) no-repeat center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const RoundButton = styled.a`
  background-color: rgba(255, 255, 255, 0.77);
  border: 2px solid #fc5f21;
  margin: 1rem;
  font-size: 1.4rem;
  color: #70401c;
  padding: 0.5rem;
  border-radius: 1rem;
  text-decoration: none;
  cursor: pointer;
`;

const FinderLink = styled(Link)`
  width: 100%;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 0.7rem 0;
  background-color: #fc5f21;
  color: white;
  font-size: 1.5rem;
  border-top: 2px solid #70401c;
  border-bottom: 2px solid #70401c;
`;

class MapSection extends Component {

  showShopFinder() {
    if (window.innerWidth < 2000) {
      return <FinderLink key="hola" to="/finder">Найти ближайшую Конфетку</FinderLink>;
    } else {
      return null;
    }
  }

  render() {
    return [
      this.showShopFinder(),
      <MapWrapper key="adios">
        <RoundButton
          href="https://yandex.kz/maps/20809/kokshetau/?ll=69.377554%2C53.287661&z=12&mode=search&text=%D0%9A%D0%BE%D0%BD%D1%84%D0%B5%D1%82%D0%BA%D0%B0%20%D0%B2%20%D0%9A%D0%BE%D0%BA%D1%88%D0%B5%D1%82%D0%B0%D1%83&sll=69.405132%2C53.294647&sspn=0.252342%2C0.081456"
          target="_blank"
        >
          Открыть в "Яндекс Карты"
        </RoundButton>
      </MapWrapper>
    ];
  }
}

export default MapSection;
