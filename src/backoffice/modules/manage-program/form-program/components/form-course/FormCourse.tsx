import React, { FormEvent, useState } from 'react';
import FormCourseView from './FormCourse.view';

const FormCourse = () => {
  const [openModalModul, setOpenModalModul] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(-1);
  const handleSubmitSelectedModul = (e: FormEvent<HTMLFormElement>) => {};

  return (
    <FormCourseView
      activeAccordion={activeAccordion}
      handleSubmitSelectedModul={handleSubmitSelectedModul}
      setActiveAccordion={setActiveAccordion}
      setOpenModalModul={setOpenModalModul}
      openModalModul={openModalModul}
    />
  );
};

export default FormCourse;
