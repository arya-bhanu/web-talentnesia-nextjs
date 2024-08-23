'use client';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import DashboardOperatorview from './DashboardOperator.view';


interface DashboardOperatorProps {
  onDateChange?: (date: string) => void; 
}

const DashboardOperator = ({ onDateChange }: DashboardOperatorProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleDateChange = (value: Date) => {
    setSelectedDate(value);
    if (onDateChange) {
      onDateChange(value.toDateString());
    }
  };

  return (
    <div>
      <DashboardOperatorview/>
    </div>
  );
};

export default DashboardOperator;
