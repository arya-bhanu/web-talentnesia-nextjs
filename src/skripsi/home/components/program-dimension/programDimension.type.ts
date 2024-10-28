import { Programs } from '@/portal/components/program-dimension-card/programDimensionCard.type';

export interface ProgramDimensionProps {
  className?: string;
  programs: Programs[];
  isLoading?: boolean;
  cardCareer: ICardCareer;
}

export interface ICardCareer {
  heading: string;
  subheading: string;
}
