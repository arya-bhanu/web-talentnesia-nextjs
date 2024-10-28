import { courses } from '@/skripsi/home/components/feature-card/featureCard.type';

export interface EliteClassSectionViewProps {
  className?: string;
  isLoading?: boolean;
  dataApi: IDataAPIEliteClass;
}

export interface IDataAPIEliteClass {
  heading: string;
  class: courses[];
  subheading: string;
}
