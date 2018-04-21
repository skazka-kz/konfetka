import React from "react";
import PropTypes from "prop-types";
import { store, view } from "react-easy-state";
import { formatBytes } from "../../../helpers/stringHelpers";
import styled from "styled-components";
import ClickableIcon from "../../styled/ClickableIcon";

const Item = styled.li`
  font-size: 1.25rem;
  border-bottom: 1px solid black;
  margin: 0.5rem 0;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${props =>
    props.isFrontImage ? "#c1fec1" : "none"} !important;
`;

Item.propTypes = { isFrontImage: PropTypes.bool };

const EditInput = styled.input`
  margin: 0 1rem;
`;
const ControlGroup = styled.div`
  display: flex;
`;
const SizeSpan = styled.span``;

class ListItem extends React.Component {
  constructor(props) {
    super(props);

    this.localState = store({
      isEditMode: false,
      newTitle: this.props.file.name
    });
  }

  handleSave() {
    if (this.localState.newTitle === "") {
      this.localState.newTitle = "(no name)";
    }
    this.props.updateFile(this.props.file.uniqueId, this.localState.newTitle);
    this.localState.isEditMode = false;
  }

  handleInputChange = e => {
    this.localState.newTitle = e.target.value;
    if (e.target.value === "") this.localState.newTitle = "";
  };

  handleKeyUp = e => {
    if (e.key === "Enter") {
      this.handleSave();
    }
  };

  adjustFocus = e => {
    const value = e.target.value;
    e.target.value = "";
    e.target.value = value;
    this.localState.newTitle = value;
  };

  render() {
    let inner,
      editButton = null;
    if (this.localState.isEditMode) {
      inner = (
        <div>
          <EditInput
            className="browser-default"
            type="text"
            value={this.localState.newTitle}
            onChange={this.handleInputChange}
            onKeyUp={this.handleKeyUp}
            autoFocus
            onFocus={this.adjustFocus}
          />
          <ClickableIcon color="green" onClick={this.handleSave}>
            save
          </ClickableIcon>
        </div>
      );
    } else {
      inner = (
        <span
          onDoubleClick={() => {
            this.localState.isEditMode = true;
          }}
        >
          {this.props.file.name}
        </span>
      );
      editButton = (
        <ClickableIcon
          color="blue"
          onClick={() => {
            this.localState.isEditMode = true;
          }}
        >
          edit
        </ClickableIcon>
      );
    }

    return (
      <Item className="collection-item" isFrontImage={this.props.isFrontImage}>
        <img src={this.props.file.thumbnail.src} alt={this.props.file.name} />
        {inner}
        <ControlGroup>
          <SizeSpan>{formatBytes(this.props.file.size)}</SizeSpan>
          <ClickableIcon
            color="green"
            onClick={() => {
              this.props.handleFrontImageSelect(this.props.file.uniqueId);
            }}
          >
            check
          </ClickableIcon>
          {editButton}
          <ClickableIcon
            color="red"
            onClick={() => {
              this.props.deleteFile(this.props.file.uniqueId);
            }}
          >
            delete
          </ClickableIcon>
        </ControlGroup>
      </Item>
    );
  }
}

ListItem.propTypes = {
  file: PropTypes.object,
  deleteFile: PropTypes.func,
  updateFile: PropTypes.func,
  index: PropTypes.number,
  handleFrontImageSelect: PropTypes.func,
  isFrontImage: PropTypes.bool
};

export default view(ListItem);
