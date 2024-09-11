import { SidebarProps } from './sidebar.type';

export const sidebarData: SidebarProps[] = [
  {
    icon: '/icons/sidebar/dashboard.svg',
    title: 'Dashboard',
    path: '/backoffice/dashboard',
  },
  {
    icon: '/icons/sidebar/course.svg',
    title: 'Manage Module',
    path: '/backoffice/manage-modul',
  },
  {
    icon: '/icons/sidebar/program.svg',
    title: 'Manage Program',
    path: '/backoffice/manage-program',
  },
  {
    icon: '/icons/sidebar/user.svg',
    title: 'Manage User',
    path: '/backoffice/manage-user',
  },
  {
    icon: '/icons/sidebar/setting.svg',
    title: 'Master Data',
    links: [
      { label: 'Academic Level', link: '/backoffice/master-data/academic-level' },
      { label: 'Academic Title', link: '/backoffice/master-data/academic-title' },
      { label: 'Category', link: '/backoffice/master-data/category' },
      { label: 'Certificate', link: '/backoffice/master-data/certificate' },
      { label: 'Discount', link: '/backoffice/master-data/discount' },
      { label: 'Level', link: '/backoffice/master-data/level' },
      { label: 'Partner', link: '/backoffice/master-data/partner'},
      { label: 'Region', link: '/backoffice/master-data/region' },
      { label: 'Religion', link: '/backoffice/master-data/religion' },
      { label: 'Testimonial', link: '/backoffice/master-data/testimonial' },
      // { label: 'Role', link: '/backoffice/master-data/role' },
      // { label: 'Quiz Type', link: '/backoffice/master-data/quiz-type' },
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
  {
    icon: '/icons/sidebar/report.svg',
    title: 'Report',
    path: '/backoffice/report',
  },
  {
    icon: '/icons/sidebar/school.svg',
    title: 'School',
    path: '/backoffice/school',
  },
];
