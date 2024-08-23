'use client';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import DashboardMentorview from './DashboardMentor.view';


interface DashboardMentorProps {
  onDateChange?: (date: string) => void; 
}

const DashboardMentor = ({ onDateChange }: DashboardMentorProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleDateChange = (value: Date) => {
    setSelectedDate(value);
    if (onDateChange) {
      onDateChange(value.toDateString());
    }
  };

  return (
    <div>
      <DashboardMentorview/>
    </div>
  );
};

export default DashboardMentor;
