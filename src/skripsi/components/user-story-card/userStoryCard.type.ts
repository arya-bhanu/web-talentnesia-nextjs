export interface UserStoryCardViewProps {
  className?: string;
  activeNumber?: number;
  setActiveNumber?: React.Dispatch<React.SetStateAction<number>>;
  testimonials?: Testimonials[];
  isLoading?: boolean
}

export interface Testimonials {
  photo?: string;
  fullName?: string;
  statusUser?: string;
  description?: string;
}
