'use client';
import React, { useState } from 'react';
import ModulView from './Modul.view';

const Modul = () => {
  const [activeAccordion, setActiveAccordion] = useState(-1);

  return (
    <ModulView
      activeAccordion={activeAccordion}
      setActiveAccordion={setActiveAccordion}
    />
  );
};

export default Modul;
