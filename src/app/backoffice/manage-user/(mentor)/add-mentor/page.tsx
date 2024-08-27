'use client';

import React from 'react';
import { Mentor } from '@/backoffice/modules/user/mentor/AddMentor';

const MentorPage = () => {
  const handleSave = (data: any) => {
    // Implement save logic here
    console.log('Saving mentor data:', data);
  };

  const handleClose = () => {
    // Implement close logic here
    console.log('Closing mentor form');
  };

  return (
    <>
      <Mentor />
    </>
  );
};

export default MentorPage;
