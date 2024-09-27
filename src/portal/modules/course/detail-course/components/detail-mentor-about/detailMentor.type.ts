import { AllCourseProps } from '@/portal/components/all-course/allCourse.type';

export interface DetailMentorProps {
  courses: AllCourseProps[];
  isLoading?: boolean;
  className?: string;
}
export interface Mentor {
    name: string;
    role: string;
    image: string;
}

export interface CoursesData {
  items: any[] ;
}
export interface CoursesViewProps {
  data: CoursesData;
  isLoading?: boolean;
}
