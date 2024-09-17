export interface CoursesData {
    
    testimonials: any[];
  }
  
  export interface ElearningViewProps {
    data: CoursesData;
    courses: {items: any[]};
    isLoading?: boolean
  }
  