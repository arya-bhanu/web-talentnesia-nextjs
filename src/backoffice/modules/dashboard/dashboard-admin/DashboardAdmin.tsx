'use client'
import React, { useEffect, useState } from 'react';
import DashboardAdminView from './DashboardAdmin.view';
import { dashboardAdminAPI } from './api/dashboardAdminApi';
import { ApiResponse, DashboardData } from './dashboardAdmin.type';

const DashboardAdmin = () => {
  const [data, setData] = useState<DashboardData>({} as DashboardData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const getCurrentQuarter = () => {
    const currentMonth = new Date().getMonth() + 1; // getMonth() returns 0-11
    if (currentMonth <= 3) return 1;
    if (currentMonth <= 6) return 2;
    if (currentMonth <= 9) return 3;
    return 4;
  };


  const imageData = {
    instructorData: {
      image: '/icons/briefcase.svg',
    },
    studentData: {
      image: '/icons/teacher.svg',
    },
    courseData: {
      image: '/icons/book2.svg',
    },
    eLearningData: {
      image: '/icons/camera.svg',
    },
    bootcampData: {
      image: '/icons/buku.svg',
    },
    iicpData: {
      image: '/icons/dokumen.svg',
    },
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const currentQuarter = getCurrentQuarter();
        const response = await dashboardAdminAPI.get(currentQuarter); // Assuming we're using the first quarter
        if (response && response.data) {
          setData(response.data);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div>
      <DashboardAdminView data={data} loading={loading} error={error} imageData={imageData} />
    </div>
  );
};

export default DashboardAdmin;
