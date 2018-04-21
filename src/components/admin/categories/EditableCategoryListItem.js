import React, { Component } from "react";
import PropTypes from "prop-types";
import { VerticalContainer } from "../products/ProductRelatedStyled";
import ClickableIcon from "../../styled/ClickableIcon";

class EditableCategoryListItem extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: false, isEditMode: false };
  }

  toggleEditMode = () => {
    this.setState(oldState => {
      return { isEditMode: !oldState.isEditMode };
    });
  };

  handleSave = async e => {
    e.preventDefault();
    const title = e.target[0].value;
    await this.props.handleEdit(this.props.category._id, title);
    this.toggleEditMode();
  };
  handleDelete = async () => {
    await this.props.handleDelete(this.props.category._id);
  };

  render() {
    if (this.state.isEditMode) {
      return (
        <li>
          <form onSubmit={this.handleSave}>
            <VerticalContainer flexAlign="space-between">
              <input
                name="new_title"
                type="text"
                defaultValue={this.props.category.title}
              />
              <div>
                <ClickableIcon color="blue" onClick={this.toggleEditMode}>
                  cancel
                </ClickableIcon>
                <ClickableIcon color="red" onClick={this.handleDelete}>
                  delete
                </ClickableIcon>
              </div>
            </VerticalContainer>
          </form>
        </li>
      );
    } else {
      return (
        <li>
          <VerticalContainer flexAlign="space-between">
            <span>{this.props.category.title}</span>
            <div>
              <ClickableIcon onClick={this.toggleEditMode}>edit</ClickableIcon>
              <ClickableIcon color="red" onClick={this.handleDelete}>
                delete
              </ClickableIcon>
            </div>
          </VerticalContainer>
        </li>
      );
    }
  }
}
EditableCategoryListItem.propTypes = {
  category: PropTypes.object,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func
};

export default EditableCategoryListItem;
