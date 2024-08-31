// courseSidebar.type.ts
import { Chapter } from '../course-detail/courseDetail.type';
import { IListDraggable } from '../list-draggable/listDraggable.type';

export interface TabItem {
  id: string;
  label: string;
  iconId: number;
  icon?: string;
  contentType: 'pdf' | 'exam' | 'meeting';
  content: string;  // URL atau data lain yang sesuai untuk konten
}

export interface SectionItem {
  id: string;
  title: string;
  isOpen: boolean;
  tabs: TabItem[];
}

export interface CourseSidebarProps {
  isSidebarVisible: boolean;
  setIsSidebarVisible: (visible: boolean) => void;
  content: IListDraggable | null;
  accordionData: Chapter[];
}
