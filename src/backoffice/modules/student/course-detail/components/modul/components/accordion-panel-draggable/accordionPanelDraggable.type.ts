export interface IAccordionPanelDraggable {
  id: string;
  title: string;
  active: number;
  order: number;
  duration: string | null;
  description: string | null;
  chapterProgramId: string;
  createdBy: string | null;
  contents: Array<{
    id: string;
    chapterId: string;
    title: string;
    type: string;
    duration: string;
    order: number;
    isexam: number;
    isCompleted: number;
    body: string | null;
    date: string | null;
    createdBy: string;
  }>;
  index: number;
  activeAccordion: number;
  setActiveAccordion: (index: number) => void;
  courseId: string; // Add this line
}
