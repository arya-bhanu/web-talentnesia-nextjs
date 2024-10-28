import { Testimonials } from '@/skripsi/home/components/user-story/user-story-card/userStoryCard.type';

export interface UserStorySectionViewProps {
  className?: string;
  testimonials: Testimonials[];
  isLoading?: boolean
}
