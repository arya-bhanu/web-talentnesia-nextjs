export interface UserStoryCardViewProps {
  className?: string;
  activeNumber?: number;
  setActiveNumber?: React.Dispatch<React.SetStateAction<number>>;
  story?: Testimonials[];
  isLoading?: boolean;
  heading: string;
}

export interface Testimonials {
  story: string;
  img_url: string;
  student_name: string;
  student_status: string;
}
