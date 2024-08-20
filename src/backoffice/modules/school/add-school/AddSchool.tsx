'use client';
import React, { FormEvent, useState } from 'react';
import AddSchoolView from './AddSchool.view';

const columns = [
  {
    key: 'no',
    val: 'No',
  },
  {
    key: 'name',
    val: 'Name',
  },
  {
    key: 'periode',
    val: 'Periode',
  },
];

const rows = [
  {
    name: () => (
      <div className="flex items-center gap-1.5">
        <span>Kelas A Tefa SMK</span>
      </div>
    ),
    periode: 'Januari 2024 - Juni 2024',
    id: 1,
  },
  {
    name: () => (
      <div className="flex items-center gap-1.5">
        <span>Kelas A Tefa SMK</span>
      </div>
    ),
    periode: 'Januari 2024 - Juni 2024',
    id: 2,
  },
];

const mappedNumberRows = rows.map((el, index) => {
  return { ...el, no: index + 1 };
});

const AddNewSchool = () => {
  const [status, setStatus] = useState('On Going');
  const [selectedStudents, setSelectedStudents] = useState(['']);
  const [activeAccordion, setActiveAccordion] = useState(-1);
  const [openModal, setOpenModal] = useState(false);
  const [openModalModul, setOpenModalModul] = useState(false);

  const handleSubmitSelectedModul = (e: FormEvent<HTMLFormElement>) => {};
  return (
    <AddSchoolView
      handleSubmitSelectedModul={handleSubmitSelectedModul}
      setStatus={setStatus}
      status={status}  
      selected={selectedStudents}
      setSelected={setSelectedStudents}
      open={openModal}
      setOpen={setOpenModal}
      columns={columns}
      rows={mappedNumberRows}
      activeAccordion={activeAccordion}
      setActiveAccordion={setActiveAccordion}
      openModalModul={openModalModul}
      setOpenModalModul={setOpenModalModul}
    />
  );
};

export default AddNewSchool;
