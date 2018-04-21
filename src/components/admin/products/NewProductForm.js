import React from "react";
import { store, view } from "react-easy-state";
import { Link } from "react-router-dom";
import categoryStore from "../../../stores/categoryStore";
import FileHelper from "../../../helpers/fileHelpers";
import InputOverlay from "./InputOverlay";
import LoadingOverlay from "./LoadingOverlay";
import FileList from "./FileList";
import productStore from "../../../stores/productStore";
import {
  FileInput,
  FormInput,
  FormLabel,
  FormRow,
  FormSelect,
  FormTextArea,
  FormWrapper,
  InnerFormContainer,
  Title,
  UploadWrapper,
  VerticalContainer
} from "./ProductRelatedStyled";
import SmallLoadingSpinner from "../SmallLoadingSpinner";

class NewProductForm extends React.Component {
  constructor(props) {
    super(props);

    this.localState = store({
      fileIsDragged: false,
      isLoading: false,
      frontImageId: null,
      filesReady: [],
      categoriesLoading: true
    });
  }

  async componentDidMount() {
    await categoryStore.loadAll();
    this.localState.categoriesLoading = false;
  }

  handleFilesAdded = async e => {
    if (e.target.files.length > 8) {
      alert("Please select 8 images or less");
      e.target.files = null;
      return null;
    }
    try {
      this.localState.isLoading = true;
      // Make sure it's only up to 8 images in total
      const currentLength = this.localState.filesReady.length;
      const diff = 8 - currentLength;
      const newFiles = Array.from(e.target.files);
      let filesToProcess = [];
      if (currentLength + newFiles.length > 8) {
        filesToProcess = newFiles.slice(0, diff);
        alert(
          `Only 8 files are allowed. The first ${diff} files were selected`
        );
      } else {
        filesToProcess = newFiles;
      }
      const converted = await FileHelper.convertFiles(filesToProcess, 600);
      await FileHelper.addThumbnails(converted);
      FileHelper.addUniqueIds(converted);
      FileHelper.addOrder(converted);
      // Setting using GET cause of proxies used
      this.localState.filesReady = this.localState.filesReady.concat(converted);
      // Set the first image as Front image
      this.localState.frontImageId = this.localState.filesReady[0].uniqueId;
      this.localState.isLoading = false;
    } catch (e) {
      this.localState.isLoading = false;
      alert(
        "Error processing images. Please make sure only images if format JPEG or PNG were selected."
      );
      e.target.files = null;
    }
  };

  handleFileDelete = fileId => {
    this.localState.filesReady = this.localState.filesReady.filter(file => {
      return file.uniqueId !== fileId;
    });
  };

  handleFileUpdate = (fileId, newTitle) => {
    // Return new array with the right file updated
    this.localState.filesReady = this.localState.filesReady.map(file => {
      if (file.uniqueId === fileId) {
        file.name = newTitle;
        return file;
      } else {
        return file;
      }
    });
  };

  handleFrontImageSelect = fileId => {
    this.localState.frontImageId = fileId;
  };

  handleFormSubmit = async e => {
    e.preventDefault();
    const submittedData = new FormData(e.target);
    // Create a form like this: product Object.stringify, files [File], filesMeta [Object]

    const productData = {
      title: submittedData.get("title"),
      category: submittedData.get("category"),
      description: submittedData.get("description"),
      weight: submittedData.get("weight"),
      price: submittedData.get("price"),
      frontImageId: this.localState.frontImageId
    };
    const filesMeta = await FileHelper.getImageMetadataArray(
      this.localState.filesReady
    );
    const formToSend = new FormData();
    formToSend.append("product", JSON.stringify(productData));
    formToSend.append("filesMetadata", JSON.stringify(filesMeta));
    this.localState.filesReady.forEach((value, index) => {
      formToSend.append("files", this.localState.filesReady[index]);
    });

    try {
      await productStore.addProduct(formToSend);
      this.props.history.push("/admin/products");
    } catch (e) {
      console.log(e);
    }
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  render() {
    return (
      <FormWrapper
        onSubmit={this.handleFormSubmit}
        onKeyPress={this.handleKeyPress}
      >
        <VerticalContainer flexAlign="space-between">
          <Title>Добавить новый продукт</Title>
          <Link to="/products" className="waves-effect waves-light btn red">
            <i className="material-icons">close</i>
          </Link>
        </VerticalContainer>

        <InnerFormContainer>
          <FormRow>
            <FormLabel htmlFor="new_product_title">Название</FormLabel>
            <FormInput
              type="text"
              id="new_product_title"
              name="title"
              required
            />
          </FormRow>
          <FormRow>
            <FormLabel htmlFor="new_product_description">Описание</FormLabel>
            <FormTextArea
              id="new_product_description"
              rows="4"
              name="description"
              required
            />
          </FormRow>
          <FormRow>
            <FormLabel htmlFor="new_product_weight">Вес</FormLabel>
            <FormInput
              type="text"
              id="new_product_weight"
              name="weight"
              required
            />
          </FormRow>
          <FormRow>
            <FormLabel htmlFor="new_product_price">Цена</FormLabel>
            <FormInput
              type="text"
              id="new_product_price"
              name="price"
              required
            />
          </FormRow>
          <FormRow>
            <FormLabel>Категория</FormLabel>
            <SmallLoadingSpinner
              isLoading={this.localState.categoriesLoading}
            />
            <FormSelect name="category" className="browser-default">
              {categoryStore.all.map(cat => (
                <option key={cat._id} value={cat._id}>
                  {cat.title}
                </option>
              ))}
            </FormSelect>
          </FormRow>
          <h4>Изображения</h4>
          <UploadWrapper>
            <FileInput
              type="file"
              accept="image/*"
              multiple
              onChange={this.handleFilesAdded}
              onDragEnter={() => {
                this.localState.fileIsDragged = true;
              }}
              onDragLeave={() => {
                this.localState.fileIsDragged = false;
              }}
            />
            <InputOverlay fileIsDragged={this.localState.fileIsDragged} />
            <LoadingOverlay isLoading={this.localState.isLoading} />
          </UploadWrapper>
          <FileList
            files={this.localState.filesReady}
            deleteFile={this.handleFileDelete}
            updateFile={this.handleFileUpdate}
            handleFrontImageSelect={this.handleFrontImageSelect}
            frontFileId={this.localState.frontImageId}
          />
        </InnerFormContainer>
        <VerticalContainer flexAlign="space-between">
          <button className="waves-effect waves-light btn" type="submit">
            Сохранить
          </button>
          <Link
            to="/admin/products"
            className="waves-effect waves-light btn red"
          >
            <i className="material-icons">close</i>
          </Link>
        </VerticalContainer>
      </FormWrapper>
    );
  }
}

export default view(NewProductForm);
