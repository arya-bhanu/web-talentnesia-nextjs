import { Partners } from '@/portal/components/partners-carousel/partnersCarousel.type';

export interface PartnersProps {
  className?: string;
  partners: Partners[];
  isLoading?: boolean;
}
