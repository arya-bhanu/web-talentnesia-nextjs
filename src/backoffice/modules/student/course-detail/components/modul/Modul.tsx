'use client';
import React, { useState } from 'react';
import ModulView from './Modul.view';
import { Certificate, CourseData } from '../../courseDetail.type';

interface ModulProps {
  certificates: Certificate[];
  course: CourseData;
}

const Modul: React.FC<ModulProps> = ({ certificates, course }) => {
  const [activeAccordion, setActiveAccordion] = useState(-1);

  return (
    <ModulView
      activeAccordion={activeAccordion}
      setActiveAccordion={setActiveAccordion}
      certificates={certificates}
      course={course}
    />
  );
};

export default Modul;
