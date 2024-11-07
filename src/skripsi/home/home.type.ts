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
