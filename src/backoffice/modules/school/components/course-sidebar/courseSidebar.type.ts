// courseSidebar.type.ts
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
  handleSectionToggle: (id: string) => void;
  sections: SectionItem[];
  selectedTab: string | null;
  handleTabClick: (id: string) => void;
}
