export interface IAccordionPanelDraggable {
  title: string;
  index: number;
  totalCurriculum: number;
  totalMinuteDuration: number;
  activeAccordion: number;
  setActiveAccordion: (index: number) => void;
  contents: Array<{
    id: number;
    title: string;
    duration: string;
    type: string;
    date: Date;
    durationMinute: number;
    status?: string;
    completed?: boolean; 
  }>;
}
