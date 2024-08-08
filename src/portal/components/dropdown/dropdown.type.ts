export interface DropdownLink {
  href: string;
  label: string;
}

export interface IDropdown {
  children: React.ReactNode;
  links: DropdownLink[];
}

export interface DropdownViewProps extends IDropdown {
  isOpen: boolean;
  toggleDropdown: () => void;
}
