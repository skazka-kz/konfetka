import React, { Component } from "react";
import styled from "styled-components";
import geolib from "geolib";
import axios from "axios";

import GeoLocator from "../../../helpers/GeoLocator";

import {
  SlimContentSection,
  SectionWrapper
} from "../../styled/frontPageCollection";

const ErrorPanel = styled.div``;
const Button = styled.button`
  align-self: center;
  background-color: #fe6321;
  font-size: 1.2rem;
  font-weight: 300;
  border: none;
  border-radius: 0.5rem;
  color: white;
  padding: 1rem 5rem;
  margin-top: 1rem;
`;
const ShopButton = styled.a`
  background-color: #fe6321;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  text-align: center;
`;
const ShopItem = styled.div`
  display: flex;
  margin: 0.5rem 0;
  border: 1px solid #fe6321;
  border-radius: 0.25rem;
`;

const ShopTitle = styled.h3``;
const ShopImage = styled.div`
  width: 200px;
  height: 125px;
  background-color: rgba(254, 99, 33, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 300;
  font-size: 1.2rem;
`;
const ShopDescription = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const ShopDistance = styled.p`
  font-size: 1.5rem;
  margin: 0;
  padding: 0;
  font-weight: bold;
  color: #fe6321;
`;
const Notice = styled.p`

`;

class ShopFinder extends Component {
  constructor(props) {
    super(props);

    this.locator = new GeoLocator();

    this.state = {
      userLocation: null,
      shops: [],
      isSupported: this.locator.isSupported,
      accuracy: null
    };

    console.log(this.locator);
  }

  async componentDidMount() {
    const response = await axios.get("shops.json");
    this.setState({
      shops: response.data.shops
    });
  }

  async findUser() {
    try {
      const userLocation = await this.locator.getCurrentPosition();
      // Converted explicitly cause the library needs that
      this.setState({
        userLocation: {
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude
        },
        accuracy: userLocation.coords.accuracy
      });
    } catch (e) {
      this.setState({ error: true });
    }
  }

  calculateDistances() {
    if (this.state.userLocation) {
      const shopsCalculated = this.state.shops
        .map(shop => {
          shop.distance = geolib.getDistance(
            shop.coords,
            this.state.userLocation
          );
          return shop;
        })
        .sort((a, b) => a.distance > b.distance);

      return shopsCalculated.map(shop => (
        <ShopItem>
          <ShopImage>Картинка</ShopImage>
          <ShopDescription>
            <ShopTitle>{shop.title}</ShopTitle>
            <ShopDistance>{shop.distance} м</ShopDistance>
          </ShopDescription>
          <ShopButton
            href={`https://yandex.kz/maps/20809/kokshetau/?ll=${
              shop.coords.longitude
            }%2C${shop.coords.latitude}&z=16&pt=${shop.coords.longitude},${
              shop.coords.latitude
            }`}
            target="_blank"
          >
            На Яндекс Картах
          </ShopButton>
        </ShopItem>
      ));
    }
  }

  render() {
    if (!this.state.isSupported) {
      return (
        <ErrorPanel>
          Ваш браузер не поддерживается. Пора переходить на современный браузер,
          такой как Chrome или Firefox
        </ErrorPanel>
      );
    } else if (this.state.error) {
      return (
        <ErrorPanel>
          Не удалось найти ваше местоположение. Попробуйте перезагрузить
          страницу.
        </ErrorPanel>
      );
    } else {
      return (
        <SectionWrapper>
          <SlimContentSection>
            <Button onClick={this.findUser.bind(this)}>
              Найти ближайшую "Конфетку"
            </Button>
            <Notice>
              Расстояния приблезительны, точность зависит от GPS данных, полученых с вашего устройства.
              {(this.state.accuracy) ? `Приблезительная погрешность - ${this.state.accuracy} метров` : null}
            </Notice>
            {this.calculateDistances()}
          </SlimContentSection>
        </SectionWrapper>
      );
    }
  }
}

export default ShopFinder;
