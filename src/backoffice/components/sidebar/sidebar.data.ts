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
    path: '/backoffice/manage-modul',
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
      { label: 'Academic Level', link: '/backoffice/setting/academic-level' },
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
