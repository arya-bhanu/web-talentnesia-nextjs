import React, { useMemo } from 'react';
import ListDraggableView from './ListDraggable.view';
import { IListDraggable } from './listDraggable.type';

const ListDraggable: React.FC<IListDraggable> = (props) => {
  const renderMinuteTime = useMemo(() => {
    if (props.duration) {
      const [hours, minutes] = props.duration.split(':');
      return parseInt(hours) * 60 + parseInt(minutes);
    }
    return 0;
  }, [props.duration]);

  return <ListDraggableView {...props} renderMinuteTime={renderMinuteTime} />;
};

export default ListDraggable;

