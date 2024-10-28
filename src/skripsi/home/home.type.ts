import { courses } from '../components/feature-card/featureCard.type';
import { Partners } from '../components/partners-carousel/partnersCarousel.type';
import { Programs } from '../components/program-dimension-card/programDimensionCard.type';
import { Testimonials } from '../components/user-story-card/userStoryCard.type';

export interface IHomeData {
  id: string;
  section:
    | 'hero'
    | 'benefits'
    | 'program-dimension/program'
    | 'program-dimension/card-carrier'
    | 'super-class'
    | 'user-story'
    | 'partners'
    | 'news-letter-subscription'
    | 'footer/social-media';
  body: {};
}

export interface IHomeProps {
  dataHome: IHomeData[];
  skeletonAnimation: boolean;
}
