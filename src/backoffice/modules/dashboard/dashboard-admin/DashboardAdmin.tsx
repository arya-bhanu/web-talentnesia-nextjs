'use client'
import React, { useEffect, useState } from 'react';
import DashboardAdminView from './DashboardAdmin.view';
import { fetchDashboardData } from './api/dashboardAdmin';
import { imageData } from './dashboardAdmin.data';
import { ApiResponse, DashboardData } from './dashboardAdmin.type';

const DashboardAdmin = () => {
  const [data, setData] = useState<DashboardData>({} as DashboardData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // const apiData: DashboardData = await fetchDashboardData();
        // setData(apiData);
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
      <DashboardAdminView data={data} loading={loading} error={error} />
    </div>
  );
};

export default DashboardAdmin;
