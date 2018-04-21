import PropTypes from "prop-types";
import styled from "styled-components";

const ClickableIcon = styled.i.attrs({ className: "material-icons" })`
  cursor: pointer;
  color: ${props => (props.color ? props.color : "black")};
  font-size: ${props => (props.large ? "5rem" : "1.5rem")};
`;

ClickableIcon.propTypes = {
  color: PropTypes.string,
  large: PropTypes.bool
};

export default ClickableIcon;
