'use client';
import React, { useState } from 'react';
import { School } from './tableStudent.type';
import { schoolsData } from './tableStudent.data';
import TableStudentView from './TableStudent.view';

interface TableStudentProps {
  className?: string;
}

const TableStudent: React.FC<TableStudentProps> = ({ className }) => {
  const [schools, setSchools] = useState<School[]>(schoolsData);

  const handleActionButtonRow = async (id: string, action: 'delete' | 'edit') => {
    if (action === 'delete') {
      setSchools((prevSchools) => prevSchools.filter((school) => school.id !== id));
    }
  };

  return (
    <TableStudentView
      schools={schools}
      handleActionButtonRow={handleActionButtonRow}
      className={className} 
    />
  );
};

export default TableStudent;
