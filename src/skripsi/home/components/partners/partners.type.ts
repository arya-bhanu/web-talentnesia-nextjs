import { Partners } from '@/portal/components/partners-carousel/partnersCarousel.type';

export interface PartnersProps {
  className?: string;
  dataPartner: IDataPartners;
  isLoading?: boolean;
}

export interface IDataPartners {
  partners: Partners[];
  heading: string;
}
