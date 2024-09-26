export interface ElearningData {
  items: ElearningItems[];
  testimonials: Testimonials[];
}

export interface ElearningViewProps {
  data: ElearningData;
  courses: CourseCardProps[];
  isLoading?: boolean;
}

export interface Testimonials {
  photo?: string;
  fullName?: string;
  statusUser?: string;
  description?: string;
}

export interface ElearningItems {
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

export interface CourseCardProps {
  logo: string;
  title: string;
  description: string;
  duration?: string;
  level: string;
  totalModul?: number;
  currentPrice: number;
  originalPrice: number;
  url: string;
  rating: number;
  reviews?: number;
  isLoading?: boolean
}

export interface AllCourseProps {
  title: string;
  logo: string;
  description: string;
  duration: string;
  level: string;
  modules: number;
  rating: number;
  currentPrice: number;
  originalPrice: number;
  isLoading?: boolean;
}