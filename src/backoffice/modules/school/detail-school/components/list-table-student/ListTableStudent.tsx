'use client';
import React, { useState } from 'react';
import { School } from './listTableStudent.type';
import { schoolsData } from './listTableStudent.data';
import ListTableStudentView from './ListTableStudent.view';

interface TableStudentProps {
  className?: string;
}

const ListTableStudent: React.FC<TableStudentProps> = ({ className }) => {
  const [schools, setSchools] = useState<School[]>(schoolsData);

  const handleActionButtonRow = async (id: string, action: 'delete' | 'edit') => {
    if (action === 'delete') {
      setSchools((prevSchools) => prevSchools.filter((school) => school.id !== id));
    }
  };

  return (
    <ListTableStudentView
      schools={schools}
      handleActionButtonRow={handleActionButtonRow}
      className={className} 
    />
  );
};

export default ListTableStudent;
