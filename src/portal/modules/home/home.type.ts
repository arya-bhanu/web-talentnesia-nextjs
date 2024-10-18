import { courses } from '@/skripsi/home/components/feature-card/featureCard.type';
import { Partners } from '@/portal/components/partners-carousel/partnersCarousel.type';
import { Programs } from '@/portal/components/program-dimension-card/programDimensionCard.type';
import { Testimonials } from '@/portal/components/user-story-card/userStoryCard.type';

export interface HomeData {
  programs: Programs[];
  courses: courses[];
  testimonials: Testimonials[];
  partners: Partners[];
}

export interface HomeViewProps {
  data: HomeData;
}

export interface HomeProps {
  data?: HomeData;
  error?: string;
}
