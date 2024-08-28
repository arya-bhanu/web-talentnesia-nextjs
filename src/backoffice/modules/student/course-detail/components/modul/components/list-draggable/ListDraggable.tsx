import React from 'react';
import ListDraggableView from './ListDraggable.view';
import { IListDraggable } from './listDraggableType.type';

const ListDraggable: React.FC<IListDraggable> = (props) => {
  return (
    <ListDraggableView
      {...props}
    />
  );
};

export default ListDraggable;
