'use client';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import DashboardStudentview from './DashboardStudent.view';


interface DashboardStudentProps {
  onDateChange?: (date: string) => void; 
}

const DashboardStudent = ({ onDateChange }: DashboardStudentProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleDateChange = (value: Date) => {
    setSelectedDate(value);
    if (onDateChange) {
      onDateChange(value.toDateString());
    }
  };

  return (
    <div>
      <DashboardStudentview/>
    </div>
  );
};

export default DashboardStudent;
