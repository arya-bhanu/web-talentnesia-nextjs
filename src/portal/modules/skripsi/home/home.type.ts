import { courses } from '../components/feature-card/featureCard.type';
import { Partners } from '../components/partners-carousel/partnersCarousel.type';
import { Programs } from '../components/program-dimension-card/programDimensionCard.type';
import { Testimonials } from '../components/user-story-card/userStoryCard.type';

export interface IHomeData {
  programs: Programs[];
  courses: courses[];
  testimonials: Testimonials[];
  partners: Partners[];
}

export interface IHomeProps {
  dataHome: IHomeData;
}
