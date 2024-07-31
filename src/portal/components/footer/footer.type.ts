export interface ILink {
  label: string;
  link: string;
}

export interface FooterViewProps {
  className?: string;
  dataNavs: {
    title: string;
    links: ILink[];
  }[];
}
