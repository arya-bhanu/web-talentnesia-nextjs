"use client"
import React, { useState } from 'react';
import FormChapterView from './FormChapter.view';
import { IFormChapter } from './formChapter.type';

const FormChapter: React.FC<IFormChapter> = (props) => {
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
