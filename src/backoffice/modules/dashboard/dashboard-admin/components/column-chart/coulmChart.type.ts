import { ApexOptions } from 'apexcharts';

export type ChartOptions = ApexOptions;

export interface ColumnChartProps {
  data: BootcampData[];
  title: string;
}

interface BootcampData {
  title: string;
  monthlyData: MonthlyData[];
}

interface MonthlyData {
  month: string;
  studentJoin: number;
}
