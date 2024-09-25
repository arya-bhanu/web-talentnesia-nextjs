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
  level: string;
  currentPrice: string;
  originPrice: string;
  url: string;
  rating: string;
  isLoading?: boolean
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
