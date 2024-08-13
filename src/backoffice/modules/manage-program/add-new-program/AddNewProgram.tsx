"use client"
import React, { useState } from 'react';
import AddNewProgramView from './AddNewProgram.view';

const AddNewProgram = () => {
  const [mentors, setMentors] = useState(['Mentor 1', 'Mentor 2']);
  const [status, setStatus] = useState('On Going');
  return (
    <AddNewProgramView
      mentors={mentors}
      setMentors={setMentors}
      setStatus={setStatus}
      status={status}
    />
  );
};

export default AddNewProgram;
