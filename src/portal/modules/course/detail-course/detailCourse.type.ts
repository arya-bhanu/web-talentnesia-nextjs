export interface CourseItem {
  id: string;
  title: string;
  description: string;
  level: string;
  currentPrice: string;
  originPrice: string;
  originalPrice: number;
  url: string;
  rating: string;
  logo:string;
}

export interface DetailCourseData {
  items: any[];
}
  
  export interface DetailCourseViewProps {
    data: DetailCourseData;
    isLoading?: boolean;
  }
  