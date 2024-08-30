import { SidebarProps } from './sidebar.type';

export const sidebarData: SidebarProps[] = [
  {
    icon: '/icons/sidebar/dashboard.svg',
    title: 'Dashboard',
    path: '/mentor/dashboard',
  },
  {
    icon: '/icons/sidebar/program.svg',
    title: 'Program',
    path: '/mentor/program/add-program-iicp',
  },
  {
    icon: '/icons/sidebar/setting.svg',
    title: 'Master Data',
    links: [
      { label: 'Academic Level', link: '/mentor/master-data/academic-level' },
    ],
  },
];
