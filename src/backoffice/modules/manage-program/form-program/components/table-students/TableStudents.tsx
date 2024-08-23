import React from 'react';
import TableStudentsView from './TableStudents.view';
import { ITableStudents } from './tableStudents.type';

const TableStudents: React.FC<ITableStudents> = (props) => {
  return <TableStudentsView {...props} />;
};

export default TableStudents;
