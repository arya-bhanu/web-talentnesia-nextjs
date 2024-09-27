export interface BootcampData {
  items: any[];
  testimonials: Testimonials[];
}

export interface BootcampViewProps {
  data: BootcampData;
  courses: any[];
  isLoading?: boolean;
}

export interface Testimonials {
  photo?: string;
  fullName?: string;
  statusUser?: string;
  description?: string;
}