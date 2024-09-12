import React from 'react';
import AssignmentChartView from './AssignmentChart.view';
import { AssignmentData } from './assignmentChart.type';

interface AssignmentChartProps {
  data: AssignmentData;
}

const AssignmentChart: React.FC<AssignmentChartProps> = ({ data }) => {
  return <AssignmentChartView {...data} />;
};

export default AssignmentChart;
