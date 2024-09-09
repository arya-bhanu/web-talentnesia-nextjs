export interface HomeData {
  programs?: any[];
  courses?: any[];
  testimonials?: any[];
  partners?: any[];
}

export interface HomeViewProps {
  data: HomeData;
  isLoading?: boolean
}

export interface HomeProps {
  data?: HomeData;
  error?: string;
}
