'use client'
import React, { useState } from 'react';
import { holidays } from './calendar.data';
import CalendarsView from './Calendar.view';

const getDaysInMonth = (month: number, year: number) => new Date(year, month, 0).getDate();
const getFirstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

const Calendars: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [agenda, setAgenda] = useState<Record<number, string>>({});
  const [newAgenda, setNewAgenda] = useState<string>('');

  const changeMonth = (offset: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + offset);
    setCurrentDate(newDate);
  };

  const handleDateClick = (day: number) => {
    if (day) {
      const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      setSelectedDate(newDate);
      setNewAgenda(agenda[day] || '');
    }
  };

  const handleSaveAgenda = () => {
    if (selectedDate && newAgenda) {
      const day = selectedDate.getDate();
      setAgenda(prevAgenda => ({
        ...prevAgenda,
        [day]: newAgenda
      }));
      setNewAgenda('');
      setSelectedDate(null);
    }
  };

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const firstDay = getFirstDayOfMonth(month, year);
  const daysInMonth = getDaysInMonth(month + 1, year);

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
      handleSaveAgenda={handleSaveAgenda}
      agenda={agenda}
      newAgenda={newAgenda}
      setNewAgenda={setNewAgenda}
      selectedDate={selectedDate}
      calendarGrid={calendarGrid}
      isHoliday={isHoliday}
      isSunday={isSunday}
      firstDay={firstDay}
    />
  );
};

export default Calendars;
