'use client';

import React, { useState, useCallback } from 'react';
import ListStudentView from './ListStudent.view';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ListStudentData } from './listStudent.data';
// import { ListStudentAPI } from './api/ListStudentApi';
// import { useListStudentActions } from './hooks/useListStudentAction';

const ListStudent = () => {
  const queryClient = useQueryClient();
  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);
  const [Filter, setFilter] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);


  const data = ListStudentData;

  const fetchData = useCallback(async () => {
    console.log("Data fetched");
  }, []);

  const handleActionButtonRow = useCallback(async (id: string, action: "delete" | "edit", rowData?: any) => {
    if (action === "delete") {
      // await handleDeleteListStudent(id);
      fetchData();
    } else if (action === "edit" && rowData) {
      // await handleEditListStudent(id, rowData);
      fetchData();
    }
  }, [fetchData]);

  const handleAdd = useCallback(async (name: string) => {
    // await handleAddListStudent(name);
    fetchData();
    setIsPopupOpen(false);
  }, [fetchData]);


  return (
    <ListStudentView
      data={data}
      openPopoverIndex={openPopoverIndex}
      setOpenPopoverIndex={setOpenPopoverIndex}
      handleActionButtonRow={handleActionButtonRow}
      handleAddListStudent={handleAdd}
      Filter={Filter}
      setFilter={setFilter}
      isPopupOpen={isPopupOpen}
      setIsPopupOpen={setIsPopupOpen}
      isPopoverOpen={isPopoverOpen}
      setIsPopoverOpen={setIsPopoverOpen}
      fetchData={fetchData}
    />
  );
};

export default ListStudent;
