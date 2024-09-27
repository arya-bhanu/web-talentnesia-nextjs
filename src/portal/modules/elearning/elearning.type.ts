export interface ElearningData {
  items: any[];
  testimonials: Testimonials[];
}

export interface ElearningViewProps {
  data: ElearningData;
  courses: any[];
  isLoading?: boolean;
}

export interface Testimonials {
  photo?: string;
  fullName?: string;
  statusUser?: string;
  description?: string;
}
