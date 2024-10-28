import { ISocialLogo } from './components/social-logo/socialLogo.type';

export interface SocialMediaViewProps {
  className?: string;
  dataSocialMedia: ISocialLogo[];
  isLoading?: boolean;
}
