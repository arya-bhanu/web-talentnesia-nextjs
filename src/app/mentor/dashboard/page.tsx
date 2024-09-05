"use client"
import React from 'react';
import DashboardMentor from '@/backoffice/modules/dashboard/dashboard-mentor/DashboardMentor';
import { useAuth } from '@/contexts/AuthContext';

const DashboardMentorIndex = () => {
  const { user } = useAuth();
  console.log(user);
  return <DashboardMentor />;
};

export default DashboardMentorIndex;



