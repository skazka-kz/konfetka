import React from "react";
import PropTypes from "prop-types";
import {
  BlackFakeText,
  CenteredCell,
  DetailsTable,
  GreyFakeText,
  OrangeFakeText,
  GreySpan
} from "./styledCollection";
import {
  OrangeHeader
} from "../../styled/frontPageCollection";


import locSymbol from "../../../resources/location.png";
import timeSymbol from "../../../resources/time.png";

const DetailsView = props => {
  if (props.isLoading) {
    return [
      <OrangeFakeText key="or"/>,
      <DetailsTable key="ora">
        <tbody>
          <tr>
            <CenteredCell>
              <img src={locSymbol} alt="Location" />
            </CenteredCell>
            <td>
              <address>
                <BlackFakeText />
                <GreyFakeText />
              </address>
            </td>
          </tr>
          <tr>
            <CenteredCell>
              <img src={timeSymbol} alt="Время работы:" />
            </CenteredCell>
            <td>
              <address>
                <BlackFakeText />
                <GreyFakeText />
              </address>
            </td>
          </tr>
        </tbody>
      </DetailsTable>
    ];
  } else {
    return [
      <OrangeHeader key="or">{props.shop.title}</OrangeHeader>,
      <DetailsTable key="ora">
        <tbody>
        <tr>
          <CenteredCell>
            <img src={locSymbol} alt="Location" />
          </CenteredCell>
          <td>
            <address>
              {props.shop.addressOne}
              <br/>
              <GreySpan>{props.shop.addressTwo}</GreySpan>

            </address>
          </td>
        </tr>
        <tr>
          <CenteredCell>
            <img src={timeSymbol} alt="Время работы:" />
          </CenteredCell>
          <td>
            <address>
              Время работы:
              <br/>
              <GreySpan>{props.shop.openingTimes}</GreySpan>
            </address>
          </td>
        </tr>
        </tbody>
      </DetailsTable>
    ];
  }
};

DetailsView.propTypes = {
  isLoading: PropTypes.bool,
  shop: PropTypes.object
};

export default DetailsView;
