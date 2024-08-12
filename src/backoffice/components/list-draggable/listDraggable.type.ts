import { APIContentChapter } from '@/backoffice/modules/manage-modul/manageModul.type';

export type IListDraggable = APIContentChapter & {
  title: string;
  iconSrc?: string;
  durationMinute?: number;
  className?: string;
};
