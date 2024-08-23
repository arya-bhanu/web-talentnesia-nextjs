'use client';
import React, { useState } from 'react';
import { School } from './tableStudent.type';
import { schoolsData } from './tableStudent.data';
import TableStudentView from './TableStudent.view';

interface TableStudentProps {
  className?: string;
}

const TableStudent: React.FC<TableStudentProps> = ({ className }) => {
  const [schools] = useState<School[]>(schoolsData);

  return (
    <TableStudentView
      schools={schools}
      className={className} 
    />
  );
};

export default TableStudent;
