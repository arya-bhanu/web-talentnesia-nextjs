export interface TabItem {
  id: string;
  label: string;
  iconId: number;
  icon?: string;
  content: string;
}

export interface SectionItem {
  id: number;
  title: string;
  duration: number;
  tabs: TabItem[];
  isOpen: boolean;
}
