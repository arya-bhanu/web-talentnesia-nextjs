import { courses } from '@/skripsi/home/components/feature-card/featureCard.type';

export interface PopularCoursesSectionViewProps {
  className?: string;
  courses: courses[];
  isLoading?: boolean
}