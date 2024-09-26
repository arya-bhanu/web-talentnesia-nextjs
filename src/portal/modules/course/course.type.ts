export interface CoursesData {
    items: CourseItem[] ;
  }

  export interface CourseItem {
    id: string;
    title: string;
    description: string;
    level: string;
    currentPrice: string;
    originPrice: string;
    url: string;
    rating: string;
    logo:string;
    originalPrice: number,
  }
  
  export interface CoursesViewProps {
    data: CoursesData;
    isLoading?: boolean;
  }
  