import { Testimonials } from '@/skripsi/home/components/user-story/user-story-card/userStoryCard.type';

export interface UserStorySectionViewProps {
  className?: string;
  stories: Testimonials[];
  heading: string;
  isLoading?: boolean;
}

export interface IDataUserStory {
  stories: Testimonials[];
  heading: string;
}
