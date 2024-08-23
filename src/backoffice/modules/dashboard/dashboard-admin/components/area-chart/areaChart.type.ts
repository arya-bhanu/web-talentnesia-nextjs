import { ApexOptions } from 'apexcharts';

export type ChartOptions = ApexOptions;

export interface AreaChartProps {
    data?: {
      count: number[];
      years: number[];
    };
  }