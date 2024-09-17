export interface SidebarProps {
  icon?: string;
  title?: string;
  path?: string;
  links?: {
    label: string;
    link: string;
  }[];
}

export interface SidebarViewProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}
