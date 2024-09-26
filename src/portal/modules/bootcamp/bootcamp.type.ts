export interface BootcampData {
  items: BootcampItems[];
  testimonials: Testimonials[];
}

export interface BootcampViewProps {
  data: BootcampData;
  courses: BootcampItems[];
  isLoading?: boolean;
}

export interface Testimonials {
  photo?: string;
  fullName?: string;
  statusUser?: string;
  description?: string;
}
export interface BootcampItems {
  logo: string; 
  title: string; 
  description: string; 
  duration: number | null; 
  level: string;
  totalModul: number; 
  currentPrice: number; 
  originalPrice: number; 
  url: string; 
  rating: string; 
}
