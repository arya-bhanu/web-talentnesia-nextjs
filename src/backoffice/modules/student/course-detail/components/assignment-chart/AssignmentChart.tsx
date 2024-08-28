import React from 'react';
import AssignmentChartView from './AssignmentChart.view';
import { chartData } from './assignmentChart.data';

const AssignmentChart: React.FC = () => {
  return <AssignmentChartView {...chartData} />;
};

export default AssignmentChart;
