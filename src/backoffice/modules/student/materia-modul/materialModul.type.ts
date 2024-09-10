export interface SectionItem {
  id: string;
  title: string;
  duration: number | null;
  tabs: TabItem[];
  isOpen: boolean;
}

export interface TabItem {
  id: string;
  label: string;
  iconId: number;
  content: string | null;
  isCompleted: number;
}
