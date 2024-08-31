import React from 'react';
import AttendanceChartView from './AttendanceChart.view';
import { chartData } from './attendanceChart.data';

const AttendanceChart: React.FC = () => {
  return <AttendanceChartView {...chartData} />;
};

export default AttendanceChart;
