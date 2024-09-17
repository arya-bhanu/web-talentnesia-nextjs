export interface IListDraggable {
  title: string;
  type: string;
  completed: boolean;
  date: string | null;
  className?: string;
  courseId: string;
  chapterId: string;
  contentId: string;
}
