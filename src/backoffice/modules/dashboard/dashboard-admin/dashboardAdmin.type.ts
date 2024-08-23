import { ApexOptions } from 'apexcharts';

export type ChartOptions = ApexOptions;

export interface DashboardData {
    data: any;
    instructorData: any;
    totalIntruction: number;
    totalStudent: number;
    totalCourse: number;
    totalElearning: number;
    totalBootcamp: number;
    totalIicp: number;
    growStudent: {
      data: number[]; 
      categories: string[]; 
    };
  }
  
  export interface ApiResponse {
    success: boolean;
    code: number;
    status: string;
    errors: any;
    messages: string;
    data: DashboardData;
  }