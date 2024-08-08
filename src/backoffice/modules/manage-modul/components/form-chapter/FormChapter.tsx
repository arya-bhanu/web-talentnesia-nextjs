'use client';
import React, { useState } from 'react';
import FormChapterView from './FormChapter.view';

const FormChapter = () => {
  const handleSubmitAddContent = () => {};
  const [openModalAddContent, setOpenModalAddContent] = useState(false);
  return (
    <FormChapterView
      handleSubmitAddContent={handleSubmitAddContent}
      stateFormAddContent={{
        openModal: openModalAddContent,
        setOpenModal: setOpenModalAddContent,
      }}
    />
  );
};

export default FormChapter;
