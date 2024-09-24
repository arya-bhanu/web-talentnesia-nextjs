'use client';
import React, { useState, useEffect } from 'react';
import DashboardOperatorview from './DashboardOperator.view';
import { dashboardOperatorApi } from './api/dashboardOperatorApi';
import { DashboardOperatorResponse } from './dashboardOperator.type';

const DashboardOperator = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [dashboardData, setDashboardData] = useState<DashboardOperatorResponse | null>(null);
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
    const response = await dashboardOperatorApi.getDashboard(formattedDate);
    setDashboardData(response);
    setIsDateChangeTriggered(false);
  };

  const handleDateChange = (date: Date) => {
    setIsDateChangeTriggered(true);
    setSelectedDate(date);
  };

  return (
    <div>
      <DashboardOperatorview 
        selectedDate={selectedDate} 
        onDateChange={handleDateChange}
        dashboardData={dashboardData}
      />
    </div>
  );
};

export default DashboardOperator;
