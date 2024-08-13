'use client';
import React, { useState } from 'react';
import AddNewProgramView from './AddNewProgram.view';
import SintiaPic from '@/../public/icons/sintia-pic.svg';

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
    key: 'email',
    val: 'Email',
  },
  {
    key: 'noHp',
    val: 'No. Hp',
  },
];
const rows = [
  {
    name: () => (
      <div className="flex items-center gap-1.5">
        <SintiaPic />
        <span>Cintia</span>
      </div>
    ),
    email: 'cintia@gmail.com',
    noHp: '081876564328',
  },
];

const mappedNumberRows = rows.map((el, index) => {
  return { ...el, no: index + 1, id: index };
});

const AddNewProgram = () => {
  const [mentors, setMentors] = useState(['Mentor 1', 'Mentor 2']);
  const [status, setStatus] = useState('On Going');
  const [selectedStudents, setSelectedStudents] = useState(['']);
  const [openModal, setOpenModal] = useState(false);
  return (
    <AddNewProgramView
      mentors={mentors}
      setMentors={setMentors}
      setStatus={setStatus}
      status={status}
      selected={selectedStudents}
      setSelected={setSelectedStudents}
      open={openModal}
      setOpen={setOpenModal}
      columns={columns}
      rows={mappedNumberRows}
    />
  );
};

export default AddNewProgram;
