import { ApexOptions } from 'apexcharts';

export type ChartOptions = ApexOptions;

interface MonthlyData {
  month: string;
  studentJoin: number;
}

interface BootcampData {
  title: string;
  monthlyData: MonthlyData[];
}

export interface DashboardData {
  totalIntruction: number;
  totalStudent: number;
  growStudent: {
    count: number[];
    years: number[];
  };
  totalCourse: number;
  totalElearning: number;
  totalBootcamp: number;
  totalIicp: number;
  bestSellerBootcamp: BootcampData[];
  lowSellerBootcamp: BootcampData[];
}

export interface ApiResponse {
  success: boolean;
  code: number;
  status: string;
  errors: null;
  messages: string;
  data: DashboardData;
}
