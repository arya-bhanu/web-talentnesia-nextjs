export interface IListDraggable {
  title: string;
  type: string;
  date: Date;
  className?: string;
  durationMinute: number;
  onContentClick?: () => void;  // Properti opsional
}
