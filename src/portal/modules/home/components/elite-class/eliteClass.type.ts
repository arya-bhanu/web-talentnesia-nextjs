import { FeatureCardProps as courses } from '@/portal/components/feature-card/featureCard.type';

export interface EliteClassSectionViewProps {
  className?: string;
  courses: courses[];
  isLoading?: boolean;
}
