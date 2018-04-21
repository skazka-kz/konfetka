import styled from "styled-components";

export const orange = "#FE6321";
const brown = "#70401C";
const lightGrey = "#A2A2A2";
const darkGrey = "#686868";

export const Header = styled.header`
  width: 100%;
  background-color: ${orange};
  display: flex;
  justify-content: center;
  border-bottom: 6px solid ${brown};
`;

export const HeaderLogo = styled.img`
  padding: 1rem;
`;

export const HeaderLinksContainer = styled.div`
  display: flex;
  justify-content: center;

  a {
    font-size: 0.9rem;
    margin: 1rem 0;
    padding: 0 0.5rem;
    border-right: 2px solid #70401c;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: bold;
  }
  a:last-of-type {
    border: none;
  }

  @media (min-width: 768px) {
    a {
      font-size: 1.3rem;
      padding: 0 2rem;
    }
  }
`;

export const HeaderLink = styled.a`
  color: #70401c;
`;

export const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProductContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-around;
  max-width: 1300px;
`;

export const SlimContentSection = styled.section`
  max-width: 900px;
  width: 100%;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
`;

export const OrangeHeader = styled.h2`
  text-align: center;
  color: ${orange};
  font-size: 2rem;
  font-weight: 500;
`;

export const GreyText = styled.p`
  color: ${darkGrey};
  font-size: 1.4rem;
`;

export const Divider = styled.hr`
  width: 80%;
  color: ${lightGrey};
  margin-top: 3rem;
  margin-bottom: 3rem;
`;

export const PageContainer = styled.ul`
  display: flex;
  list-style: none;
  width: 90%;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 3rem;
  max-width: 1300px;
`;

export const PagePea = styled.li`
  color: ${props => (props.selected ? orange : lightGrey)};
  margin: 0.25rem;
`;

export const LargePea = styled.div`
  width: 50px;
  height: 50px;
  background-size: cover;
  z-index: 10;
  background: white no-repeat center;
  border: 2px solid ${props => (props.isActive ? orange : lightGrey)};
  border-radius: 5rem;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  color: ${props => (props.isActive ? orange : lightGrey)};
  box-shadow: 0 0 16px -1px ${props => (props.isActive ? orange : lightGrey)};
  cursor: pointer;
  font-weight: 300;
  margin: 0 0.5rem;
`;

export const CategoryContainer = styled.ul`
  display: flex;
  list-style: none;
  justify-content: space-around;
  width: 90%;
  max-width: 1300px;
`;

export const CategoryItem = styled.li`
  color: ${props => (props.active ? "white" : brown)};
  background-color: ${props => (props.active ? orange : "none")};
  border-radius: 0.25rem;
  text-transform: uppercase;
  font-size: 1.25rem;
  padding: 0.5rem;
`;

export const CentralPeaContainer = styled.div`
  display: flex;
`;
