import React, { FormEvent, useState } from 'react';
import ListDraggableView from './ListDraggable.view';
import { IListDraggable } from './listDraggableType.type';

const ListDraggable: React.FC<IListDraggable> = (props) => {
  const [modalSchedule, setModalSchedule] = useState(false);
  const handleSubmitSchedule = (e: FormEvent<HTMLFormElement>) => {};
  return (
    <ListDraggableView
      modalSchedule={modalSchedule}
      setModalSchedule={setModalSchedule}
      handleSubmitSchedule={handleSubmitSchedule}
      {...props}
    />
  );
};

export default ListDraggable;
