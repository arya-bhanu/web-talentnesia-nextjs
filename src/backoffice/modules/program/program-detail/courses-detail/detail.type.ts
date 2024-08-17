export interface TabItem {
  id: number;
  label: string;
  icon: string;
  content: string;
}

export interface SectionItem {
  id: number;
  title: string;
  duration: number;
  tabs: TabItem[];
  isOpen: boolean;
}
