// import { courses } from '@/portal/components/feature-card/featureCard.type';
import { CourseCardProps } from '@/portal/components/course-card/courseCard.type';

export interface PopularCoursesSectionViewProps {
  className?: string;
  courses: CourseCardProps[];
  isLoading?: boolean
}