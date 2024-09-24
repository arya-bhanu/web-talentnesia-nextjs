'use client'
import React, { useState, useEffect } from 'react';
import { holidays } from './calendar.data';
import CalendarsView from './Calendar.view';

const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

interface CalendarsProps {
  onDateChange: (date: Date) => void;
  selectedDate: Date;
}

const Calendars: React.FC<CalendarsProps> = ({ onDateChange, selectedDate }) => {
  const [currentDate, setCurrentDate] = useState<Date>(selectedDate);

  useEffect(() => {
    setCurrentDate(selectedDate);
  }, [selectedDate]);

  const changeMonth = (offset: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + offset);
    setCurrentDate(newDate);
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    onDateChange(newDate);
  };

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const firstDay = getFirstDayOfMonth(month, year);
  const daysInMonth = getDaysInMonth(month, year);

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => null);

  const calendarGrid = [...emptyDays, ...days];

  const isHoliday = (day: number) => holidays.some(h => h.day === day && h.month === (month + 1));
  const isSunday = (day: number) => {
    if (day > 0) {
      const date = new Date(year, month, day);
      return date.getDay() === 0; 
    }
    return false;
  };

  return (
    <CalendarsView
      currentDate={currentDate}
      changeMonth={changeMonth}
      handleDateClick={handleDateClick}
      calendarGrid={calendarGrid}
      isHoliday={isHoliday}
      isSunday={isSunday}
      selectedDate={selectedDate}
    />
  );
};

export default Calendars;
