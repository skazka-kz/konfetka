import PropTypes from "prop-types";
import styled, { css } from "styled-components";

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #0000001a;
`;

export const FormLabel = styled.label`
  flex: 1 0 120px;
  max-width: 220px;
  font-size: 1.25rem;
  text-align: right;
  padding-right: 1rem;
`;

export const flexCss = css`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

export const InnerFormContainer = styled.ul`
  ${flexCss};
  flex-direction: column;
`;

export const FormRow = styled.li`
  ${flexCss};
  width: 100%;
`;

export const inputStyle = css`
  flex: 1 0 220px;
`;

export const FormInput = styled.input`
  ${inputStyle};
`;

export const FormTextArea = styled.textarea`
  ${inputStyle};
  border-top-style: none;
  border-right-style: none;
  border-bottom: 1px solid #9e9e9e;
  border-left-style: none;
  min-height: 100px;
`;

export const FormSelect = styled.select`
  ${inputStyle};
`;

export const UploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`;

export const FileInput = styled.input`
  display: flex;
  opacity: 0;
  z-index: 10;
  min-height: 12.5rem;
`;

export const ProductListWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 100px;
`;

export const ItemWrapper = styled.div`
  min-height: 170px;
`;
export const ViewModeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const EditModeWrapper = styled.form`
  min-height: 500px;
`;
export const MainImage = styled.img`
  height: 150px;
`;
export const HorizontalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex-grow: 1;
  padding: 0.5rem;
`;
export const ControlsWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 0.5rem;
`;
export const Title = styled.span`
  text-align: center;
  font-size: 1.75rem;
`;
export const VerticalContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${props =>
    props.flexAlign ? props.flexAlign : "space-around"};
`;
VerticalContainer.propTypes = {
  flexAlign: PropTypes.string
};

export const InfoPiece = styled.div``;

export const TitleInput = styled.input``;

export const ImageList = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;
export const ListImageWrap = styled.div`
  width: 23%;
  margin: 0.2rem;
  background-color: ${props => (props.isFrontImage ? "lightgreen" : "none")};
  padding: 0.5rem;
`;
export const ListImage = styled.img`
  width: 100%;
`;

export const SimpleFileInput = styled.input`
  width: 100%;
  text-align: center;
  margin: 0.5rem;
  border: 1px dashed black;
  padding: 1rem;
`;
