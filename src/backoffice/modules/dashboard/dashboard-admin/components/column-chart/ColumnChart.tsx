'use client'
import React from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import type { ColumnChartProps } from './coulmChart.type';

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

const ColumnChart: React.FC<ColumnChartProps> = ({ data = [], title }) => {
    const options: ApexOptions = {
        series: data.map(bootcamp => ({
            name: bootcamp.title,
            data: bootcamp.monthlyData.map(month => month.studentJoin)
        })),
        chart: {
            type: 'bar',
            height: 400,
            stacked: true,
            toolbar: {
                show: true
            },
            zoom: {
                enabled: true
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                legend: {
                    position: 'bottom',
                    offsetX: -10,
                    offsetY: 0
                }
            }
        }],
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadius: 10,
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'last',
                dataLabels: {
                    total: {
                        enabled: true,
                        style: {
                            fontSize: '13px',
                            fontWeight: 900
                        }
                    }
                },
                columnWidth: '40%'
            },
        },
        xaxis: {
            type: 'category',
            categories: data[0]?.monthlyData?.map(month => month.month) || [],
        },
        legend: {
            position: 'bottom',
            offsetY: 10,
        },
        fill: {
            opacity: 1
        },
        colors: ['#FEC84B', '#219EBC', '#0B353F']
    };

    return (
        <div className="p-6 rounded-lg w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
            <ApexCharts
                options={options}
                series={options.series}
                type="bar"
                height={options.chart?.height}
            />
        </div>
    );
};

const ColumnChart2: React.FC<ColumnChartProps> = ({ data = [], title }) => {
    const options: ApexOptions = {
        series: data.map(bootcamp => ({
            name: bootcamp.title,
            data: bootcamp.monthlyData.map(month => month.studentJoin)
        })),
        chart: {
            type: 'bar',
            height: 400,
            stacked: true,
            toolbar: {
                show: true
            },
            zoom: {
                enabled: true
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                legend: {
                    position: 'bottom',
                    offsetY: 10
                }
            }
        }],
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadius: 10,
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'last',
                dataLabels: {
                    position: 'bottom',
                    total: {
                        enabled: true,
                        style: {
                            fontSize: '13px',
                            fontWeight: 900
                        }
                    }
                },
                columnWidth: '40%'
            },
        },
        xaxis: {
            type: 'category',
            categories: data[0]?.monthlyData?.map(month => month.month) || [],
        },
        legend: {
            position: 'bottom',
            offsetY: 10,
        },
        fill: {
            opacity: 1
        },
        colors: ['#957BF9', '#133C69', '#F5827A']
    };

    return (
        <div className="p-6 rounded-lg w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
            <ApexCharts
                options={options}
                series={options.series}
                type="bar"
                height={options.chart?.height}
            />
        </div>
    );
};

export { ColumnChart, ColumnChart2 };
