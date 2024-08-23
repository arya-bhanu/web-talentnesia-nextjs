import { FilterCategory } from '@/portal/components/filter/filter.type';
import { CourseCardProps } from '@/portal/components/course-card/courseCard.type';

export interface AllClassProps {
  courses: CourseCardProps[];
  filterOptions: FilterCategory[]; 
}
