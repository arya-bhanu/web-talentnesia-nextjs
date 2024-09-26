import { FilterCategory } from '@/portal/components/filter/filter.type';
import { AllCourseProps } from '@/portal/components/all-course/allCourse.type';

export interface AllClassProps {
  courses: AllCourseProps[];
  filterOptions: FilterCategory[]; 
  isLoading?: boolean,
  title?: string
}

