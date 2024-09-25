export interface CoursesData {
    items: any[] ;
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
  }
  
  export interface CoursesViewProps {
    data: CoursesData;
    isLoading?: boolean;
  }
  