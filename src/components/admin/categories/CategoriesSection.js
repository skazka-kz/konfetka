import React from "react";
import { store, view } from "react-easy-state";
import categoryStore from "../../../stores/categoryStore";
import EditableCategoryListItem from "./EditableCategoryListItem";
import { VerticalContainer } from "../products/ProductRelatedStyled";

class CategoriesSection extends React.Component {
  constructor(props) {
    super(props);
    this.localState = store({
      isLoading: true,
      tempTitle: ""
    });
  }

  async componentDidMount() {
    await categoryStore.loadAll();
    this.localState.isLoading = false;
  }

  handleNewCatAdd = async e => {
    this.localState.isLoading = true;
    e.preventDefault();

    const submittedData = new FormData(e.target);
    const title = submittedData.get("title");
    await categoryStore.add(title);
    this.localState.isLoading = false;
    this.localState.tempTitle = "";
  };

  handleCatEdit = async (id, newTitle) => {
    this.localState.isLoading = true;
    await categoryStore.edit(id, newTitle);
    this.localState.isLoading = false;
  };

  handleCatDelete = async id => {
    this.localState.isLoading = true;
    await categoryStore.delete(id);
    this.localState.isLoading = false;
  };

  handleNewTitleChange = e => {
    this.localState.tempTitle = e.target.value;
  };

  render() {
    const loading = this.localState.isLoading ? (
      <div className="progress">
        <div className="indeterminate" />
      </div>
    ) : null;
    return (
      <div className="container">
        <h2>Категории</h2>
        <form onSubmit={this.handleNewCatAdd}>
          <VerticalContainer>
            <input
              name="title"
              type="text"
              placeholder="Новая категория"
              onChange={this.handleNewTitleChange}
              value={this.localState.tempTitle}
            />
            <button className="btn btn-flat" type="submit">
              <i className="material-icons">add</i>
            </button>
          </VerticalContainer>
        </form>

        <div>
          {categoryStore.all.map(cat => (
            <EditableCategoryListItem
              key={cat._id}
              category={cat}
              handleDelete={this.handleCatDelete}
              handleEdit={this.handleCatEdit}
            />
          ))}
        </div>
        {loading}
      </div>
    );
  }
}

export default view(CategoriesSection);
