import { courses } from '@/skripsi/home/components/feature-card/featureCard.type';

export interface BestCourseSectionViewProps {
  className?: string;
  courses: courses[];
  isLoading?: boolean;
}