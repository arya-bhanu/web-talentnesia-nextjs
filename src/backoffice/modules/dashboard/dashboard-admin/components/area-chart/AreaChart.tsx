'use client'
import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import type { AreaChartProps } from './areaChart.type'

const AreaChart: React.FC<AreaChartProps> = ({ data }) => {
  const options: ApexOptions = {
    series: [
      {
        name: "Student",
        data: data.count
      },
    ],
    chart: {
      height: 350,
      type: "area"
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: "smooth"
    },
    xaxis: {
      categories: data.years.map(String)
    },
    tooltip: {
      x: {
        format: "yyyy"
      }
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Growth Student</h3> 
      <Chart
        options={options}
        series={options.series}
        type="area"
        height={options.chart?.height}
      />
    </div>
  );
};

export default AreaChart;
