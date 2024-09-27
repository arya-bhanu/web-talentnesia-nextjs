export interface HomeData {
  programs?: Programs[];
  courses?: courses[];
  testimonials?: Testimonials[];
  partners?: Partners[];
}

export interface Programs {
  logo: string;
  title: string;
  url?: string;
}

export interface courses {
  logo: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  totalModul: number;
  currentPrice: number;
  originalPrice: number;
  url: string;
  rating: number;
  isLoading?: boolean;
}

export interface Testimonials {
  photo?: string;
  fullName?: string;
  statusUser?: string;
  description?: string;
}

export type Partners = {
  logo: string;
  link?: string;
};


export interface HomeViewProps {
  data: HomeData;
  isLoading?: boolean
}

export interface HomeProps {
  data?: HomeData;
  error?: string;
}
