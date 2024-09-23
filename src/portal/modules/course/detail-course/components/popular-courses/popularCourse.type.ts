import { FeatureCardProps as courses } from '@/portal/components/feature-card/featureCard.type';

export interface PopularCoursesSectionViewProps {
  className?: string;
  courses: courses[];
  isLoading?: boolean
}