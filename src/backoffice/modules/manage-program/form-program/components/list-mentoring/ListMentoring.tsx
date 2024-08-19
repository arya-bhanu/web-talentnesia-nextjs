import React from 'react';
import ListMentoringView from './ListMentoring.view';
import { IListMentoring } from './listMentoring.type';

const ListMentoring: React.FC<IListMentoring> = (props) => {
  return <ListMentoringView {...props} />;
};

export default ListMentoring;
