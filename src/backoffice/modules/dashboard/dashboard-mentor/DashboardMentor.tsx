'use client';
import React, { useState, useEffect } from 'react';
import DashboardMentorview from './DashboardMentor.view';
import { dashboardMentorApi } from './api/dashboardMentorApi';
import { DashboardMentorResponse } from './dashboardMentor.type';

const DashboardMentor = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [dashboardData, setDashboardData] = useState<DashboardMentorResponse | null>(null);
  const [isDateChangeTriggered, setIsDateChangeTriggered] = useState<boolean>(false);

  useEffect(() => {
    fetchDashboardData(selectedDate);
  }, [selectedDate]);

  const fetchDashboardData = async (date: Date) => {
    let requestDate = new Date(date);
    if (isDateChangeTriggered) {
      requestDate.setDate(requestDate.getDate() + 1);
    }
    const formattedDate = requestDate.toISOString().split('T')[0];
    const response = await dashboardMentorApi.getDashboard(formattedDate);
    setDashboardData(response);
    setIsDateChangeTriggered(false);
  };

  const handleDateChange = (date: Date) => {
    setIsDateChangeTriggered(true);
    setSelectedDate(date);
  };

  return (
    <div>
      <DashboardMentorview 
        selectedDate={selectedDate} 
        onDateChange={handleDateChange}
        dashboardData={dashboardData}
      />
    </div>
  );
};

export default DashboardMentor;
