'use client';
import React, { useState } from 'react';
import ModulView from './Modul.view';
import { Certificate } from '../../courseDetail.type';

interface ModulProps {
  certificates: Certificate[];
}

const Modul: React.FC<ModulProps> = ({ certificates }) => {
  const [activeAccordion, setActiveAccordion] = useState(-1);

  return (
    <ModulView
      activeAccordion={activeAccordion}
      setActiveAccordion={setActiveAccordion}
      certificates={certificates}
    />
  );
};

export default Modul;
