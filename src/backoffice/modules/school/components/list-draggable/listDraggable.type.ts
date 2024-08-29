export interface IListDraggable {
  id: string;
  title: string;
  type: string;
  date?: string;
  className?: string;
  duration: string;
  durationMinute?: number; 
  onContentClick?: () => void;
}
