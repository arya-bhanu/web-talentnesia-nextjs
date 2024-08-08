export interface UserStoryCardViewProps {
  className?: string;
  activeNumber?: number;
  setActiveNumber?: React.Dispatch<React.SetStateAction<number>>;
  testimonials?: testimonials[];
}

export interface testimonials {
  photo?: string;
  fullName?: string;
  statusUser?: string;
  description?: string;
}
