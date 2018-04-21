import React from "react";
import PropTypes from "prop-types";
import { store, view } from "react-easy-state";
import productStore from "../../../stores/productStore";
import categoryStore from "../../../stores/categoryStore";
import ClickableIcon from "../../styled/ClickableIcon";
import FileHelper from "../../../helpers/fileHelpers";
import {
  ControlsWrap,
  EditModeWrapper,
  FormSelect,
  FormTextArea,
  HorizontalContainer,
  ImageList,
  InfoPiece,
  ItemWrapper,
  ListImage,
  ListImageWrap,
  MainImage,
  SimpleFileInput,
  Title,
  TitleInput,
  VerticalContainer,
  ViewModeWrapper
} from "./ProductRelatedStyled";

import placeholderImage from "../../../resources/no_image.jpg";

class EditableListItem extends React.Component {
  constructor(props) {
    super(props);
    this.localState = store({
      isLoading: false,
      isEditMode: false,
      stagedProduct: {},
      frontImageId: props.product.frontImage
        ? props.product.frontImage._id
        : null
    });
  }

  handleModeChange = () => {
    this.localState.isEditMode = !this.localState.isEditMode;
  };

  handleFileAdd = async e => {
    this.localState.isLoading = true;
    if (this.props.product.images.length >= 8) {
      alert("8 files max, please delete a file before uploading a new one");
    } else {
      try {
        this.localState.isLoading = true;
        const convertedFile = await FileHelper.convertFiles(
          Array.from(e.target.files)
        );
        FileHelper.addUniqueIds(convertedFile);
        const meta = await FileHelper.getImageMetadata(convertedFile[0]);

        // Upload file with this form structure:
        // file, fileMeta, productId

        const formData = new FormData();
        formData.append("file", convertedFile[0]);
        formData.append("fileMeta", JSON.stringify(meta));
        formData.append("productId", this.props.product._id);

        await productStore.addProductImage(formData);
      } catch (e) {
        console.log("Error adding image", e);
      }
    }
    this.localState.isLoading = false;
  };

  handleSelectFrontImage = async id => {
    this.localState.isLoading = true;
    await productStore.makeImagePrimaryImage(this.props.product._id, id);
    this.localState.frontImageId = id;
    this.localState.isLoading = false;
  };

  handleProductSave = async e => {
    this.localState.isLoading = true;
    e.preventDefault();
    // Collect the data from the form, send to server
    const submittedData = new FormData(e.target);
    const productData = {
      title: submittedData.get("title"),
      categoryId: submittedData.get("category"),
      description: submittedData.get("description"),
      weight: submittedData.get("weight"),
      price: submittedData.get("price")
    };
    await productStore.updateProduct(this.props.product._id, productData);
    this.localState.isEditMode = false;
    this.localState.isLoading = false;
  };

  handleDeleteImage = async imageId => {
    this.localState.isLoading = true;
    await productStore.deleteProductImage(this.props.product._id, imageId);
    this.localState.isLoading = false;
  };

  render() {
    let content;
    const loading = this.localState.isLoading ? (
      <div className="progress">
        <div className="indeterminate" />
      </div>
    ) : null;
    if (!this.localState.isEditMode) {
      const image = this.props.product.frontImage ? (
        <MainImage
          src={"/" + this.props.product.frontImage.path}
          alt={this.props.product.frontImage.name}
        />
      ) : (
        <MainImage src={placeholderImage} alt="No image" />
      );
      content = (
        <ViewModeWrapper>
          {image}
          <HorizontalContainer>
            <Title>{this.props.product.title}</Title>
            <VerticalContainer>
              <InfoPiece>{this.props.product.price}</InfoPiece>
              <InfoPiece>{this.props.product.weight}</InfoPiece>
            </VerticalContainer>
          </HorizontalContainer>
          <ControlsWrap>
            <ClickableIcon
              color="red"
              onClick={() => {
                this.props.handleDelete(this.props.product._id);
              }}
            >
              delete
            </ClickableIcon>
            <ClickableIcon onClick={this.handleModeChange}>edit</ClickableIcon>
          </ControlsWrap>
        </ViewModeWrapper>
      );
    } else {
      content = (
        <EditModeWrapper onSubmit={this.handleProductSave}>
          <TitleInput name="title" defaultValue={this.props.product.title} />
          <VerticalContainer>
            <FormTextArea
              name="description"
              className="materialize-textarea"
              rows="4"
              defaultValue={this.props.product.description}
            />
            <HorizontalContainer>
              <input
                name="weight"
                type="text"
                defaultValue={this.props.product.weight}
              />
              <input
                name="price"
                type="text"
                defaultValue={this.props.product.price}
              />
            </HorizontalContainer>
          </VerticalContainer>
          <FormSelect
            name="category"
            className="browser-default"
            defaultValue={this.props.product.category}
          >
            <option value="none">---Pick a value---</option>
            {categoryStore.all.map(cat => (
              <option key={cat._id} value={cat._id}>
                {cat.title}
              </option>
            ))}
          </FormSelect>

          <SimpleFileInput type="file" onChange={this.handleFileAdd} />

          <ImageList>
            {this.props.product.images.map(image => (
              <ListImageWrap
                key={image._id}
                isFrontImage={this.localState.frontImageId === image._id}
              >
                <ListImage src={"/" + image.path} alt={image.title} />
                <VerticalContainer>
                  <ClickableIcon
                    color="green"
                    onClick={async () => {
                      await this.handleSelectFrontImage(image._id);
                    }}
                  >
                    check
                  </ClickableIcon>
                  <ClickableIcon
                    color="red"
                    onClick={() => {
                      this.handleDeleteImage(image._id);
                    }}
                  >
                    delete
                  </ClickableIcon>
                </VerticalContainer>
              </ListImageWrap>
            ))}
          </ImageList>
          <VerticalContainer flexAlign="space-between">
            <button className="waves-effect waves-light btn" type="submit">
              <i className="material-icons">save</i>
            </button>
            <button
              className="waves-effect waves-light btn red"
              type="button"
              onClick={this.handleModeChange}
            >
              <i className="material-icons">cancel</i>
            </button>
          </VerticalContainer>
        </EditModeWrapper>
      );
    }
    return (
      <ItemWrapper className="collection-item">
        {content}
        {loading}
      </ItemWrapper>
    );
  }
}

EditableListItem.propTypes = {
  product: PropTypes.object,
  handleDelete: PropTypes.func,
  handleImageAdd: PropTypes.func
};

export default view(EditableListItem);
