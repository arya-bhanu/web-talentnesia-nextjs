import { Programs } from '@/portal/components/program-dimension-card/programDimensionCard.type';

export interface ProgramDimensionSectionViewProps {
  className?: string;
  programs: Programs[];
  isLoading?: boolean;
}
