export interface ElearningData {
  items: any[];
  testimonials: any[];
}

export interface ElearningViewProps {
  data: ElearningData;
  courses: any[];
  isLoading?: boolean;
}
