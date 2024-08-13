export interface AccordionProps {
  question: string;
  answer: string;
}

export interface AccordionViewProps {
  accordionData: { question: string; answer: string }[];
  activeIndex: number | null;
  toggleAccordion: (index: number) => void;
}
