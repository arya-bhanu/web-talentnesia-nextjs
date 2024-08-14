import { APIChapterModul } from '@/backoffice/modules/manage-modul/manageModul.type';

export type IAccordionPanelDraggable = APIChapterModul & {
  totalMinuteDuration?: number;
  totalCurriculum?: number;
};
