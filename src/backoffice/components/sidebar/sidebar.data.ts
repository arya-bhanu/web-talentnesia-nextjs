import { SidebarProps } from "./sidebar.type";

export const sidebarData: SidebarProps[] = [
  {
    icon: '/icons/sidebar/dashboard.svg',
    title: 'Dashboard',
    path: '#',
  },
  {
    icon: '/icons/sidebar/course.svg',
    title: 'Manage Course',
    path: '#',
  },
  {
    icon: '/icons/sidebar/program.svg',
    title: 'Manage Program',
    path: '#',
  },
  {
    icon: '/icons/sidebar/user.svg',
    title: 'Manage User',
    path: '#',
  },
  {
    icon: '/icons/sidebar/setting.svg',
    title: 'Setting',
    links: [
      { label: 'Academic Level', link: '#' },
      { label: 'Academic Title', link: '#' },
      { label: 'Category', link: '#' },
      { label: 'Certificate', link: '#' },
      { label: 'Discount', link: '#' },
      { label: 'Level', link: '#' },
      { label: 'Region', link: '#' },
      { label: 'Religion', link: '#' },
      { label: 'Role', link: '#' },
      { label: 'Quiz Type', link: '#' },
    ],
  },
  {
    icon: '/icons/sidebar/cms.svg',
    title: 'CMS',
    path: '#',
  },
  {
    icon: '/icons/sidebar/faq.svg',
    title: 'FAQ',
    path: '#',
  },
];
