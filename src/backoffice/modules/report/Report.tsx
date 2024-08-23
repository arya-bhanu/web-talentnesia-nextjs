'use client'

import React, { useState } from 'react';
import ReportView from './Report.view';
import { agendaData } from './report.data';

const Report: React.FC = () => {
  const [agendaCount] = useState<number>(12);
  const [holidayCount] = useState<number>(3);
  const currentDate = new Date();

  return (
    <ReportView
      agendaCount={agendaCount}
      holidayCount={holidayCount}
      currentDate={currentDate}
      agendaData={agendaData}
    />
  );
};

export default Report;
