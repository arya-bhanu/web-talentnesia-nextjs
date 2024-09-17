"use client";

import React, { useState } from 'react';
import CalendarView from './Calendar.view';
import { format, addDays, subDays } from 'date-fns';
import { Calendar as CalendarType } from '../../courseDetail.type';

interface CalendarProps {
  calendarData: CalendarType[];
}

const Calendar: React.FC<CalendarProps> = ({ calendarData }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedHour, setSelectedHour] = useState<string | null>(null);
    const [showAllHours, setShowAllHours] = useState(false);

    const handlePrevDay = () => {
        setCurrentDate(subDays(currentDate, 1));
    };

    const handleNextDay = () => {
        setCurrentDate(addDays(currentDate, 1));
    };

    const hours = Array.from({ length: 24 }, (_, i) => `${i < 10 ? '0' : ''}${i}:00`);
    const visibleHours = showAllHours ? hours : hours.slice(7, 15); 

    return (
        <CalendarView
            date={format(currentDate, 'dd MMMM')}
            hours={visibleHours}
            selectedHour={selectedHour}
            onPrevDay={handlePrevDay}
            onNextDay={handleNextDay}
            onHourClick={(hour) => setSelectedHour(hour)}
            onToggleHours={() => setShowAllHours(!showAllHours)}
            showAllHours={showAllHours}
            calendarData={calendarData}
        />
    );
};

export default Calendar;
