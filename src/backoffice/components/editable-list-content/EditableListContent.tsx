import React from 'react';
import EditableListContentView from './EditableListContent.view';
import { IEditableListContent } from './editableListContent.type';

const EditableListContent: React.FC<IEditableListContent> = (props) => {
  return <EditableListContentView {...props} />;
};

export default EditableListContent;
