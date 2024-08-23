import { ApexOptions } from "apexcharts";

export const columnChartOptions: ApexOptions = {
    series: [
        {
            name: "Design Graphic",
            data: [44, 55, 41]
        },
        {
            name: "UI/UX Design",
            data: [13, 23, 20]
        },
        {
            name: "Product Management",
            data: [11, 17, 15]
        },
    ],
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
            borderRadiusApplication: 'end', // 'around', 'end'
            borderRadiusWhenStacked: 'last', // 'all', 'last'
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
        categories: [
            'Jan', 'Feb', 'Mar',
        ],
    },
    legend: {
        position: 'bottom',
        offsetY: 10,
    },
    fill: {
        opacity: 1
    },
    colors: ['#FEC84B', '#219EBC','#0B353F' ] 
};

export const columnChartOptions2: ApexOptions = {
    series: [
        {
            name: "Design Graphic",
            data: [60, 90, 80]
        },
        {
            name: "UI/UX Design",
            data: [89, 40, 20]
        },
        {
            name: "Product Management",
            data: [79, 67, 80]
        },
    ],
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
            borderRadiusApplication: 'end', // 'around', 'end'
            borderRadiusWhenStacked: 'last', // 'all', 'last'
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
        categories: [
            'Jan', 'Feb', 'Mar',
        ],
    },
    legend: {
        position: 'bottom',
        offsetY: 10,
    },
    fill: {
        opacity: 1
    },
    colors: ['#957BF9', '#133C69', '#F5827A',]
};