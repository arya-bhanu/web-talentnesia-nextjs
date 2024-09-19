export interface BootcampData {
  items: any[];
  testimonials: any[];
}

export interface BootcampViewProps {
  data: BootcampData;
  courses: any[];
  isLoading?: boolean;
}
