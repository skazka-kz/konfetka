import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ListItem from "./FileListItem";

const List = styled.ul`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`;

const FileList = props => (
  <List className="collection">
    {props.files.map((file, index) => (
      <ListItem
        file={file}
        key={file.uniqueId}
        deleteFile={props.deleteFile}
        updateFile={props.updateFile}
        index={index}
        handleFrontImageSelect={props.handleFrontImageSelect}
        isFrontImage={file.uniqueId === props.frontFileId}
      />
    ))}
  </List>
);

FileList.propTypes = {
  files: PropTypes.array,
  deleteFile: PropTypes.func,
  updateFile: PropTypes.func,
  onDrop: PropTypes.func,
  handleFrontImageSelect: PropTypes.func,
  frontFileId: PropTypes.number
};

export default FileList;
