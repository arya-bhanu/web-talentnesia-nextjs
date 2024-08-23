'use client'
import React from 'react';
import dynamic from 'next/dynamic';
import { columnChartOptions, columnChartOptions2 } from './columnChart.data';


const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });


const ColumnChart: React.FC = () => {
    return (
        <div className="p-6 rounded-lg w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Best of 3 Seller Bootcamp 2024</h3>
            <ApexCharts
                options={columnChartOptions}
                series={columnChartOptions.series}
                type="bar"
                height={columnChartOptions.chart?.height}
            />
        </div>
    );
};

const ColumnChart2: React.FC = () => {
    return (
        <div className="p-6 rounded-lg w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Lowest of 3 Seller Bootcamp 2024</h3>
            <ApexCharts
                options={columnChartOptions2}
                series={columnChartOptions2.series}
                type="bar"
                height={columnChartOptions2.chart?.height}
            />
        </div>
    );
};

export { ColumnChart, ColumnChart2 };
