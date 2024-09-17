import React from 'react';
import AttendanceChartView from './AttendanceChart.view';
import { AttendanceData } from './attendanceChart.type';

interface AttendanceChartProps {
  data: AttendanceData;
}

const AttendanceChart: React.FC<AttendanceChartProps> = ({ data }) => {
  const chartData = {
    present: data.presencePercentage,
    absent: data.absencePercentage,
  };

  return <AttendanceChartView {...chartData} />;
};

export default AttendanceChart;
