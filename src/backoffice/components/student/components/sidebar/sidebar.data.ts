import { SidebarProps } from './sidebar.type';

export const sidebarData: SidebarProps[] = [
  {
    icon: '/icons/sidebar/dashboard.svg',
    title: 'Dashboard',
    path: '/student/dashboard',
  },
  {
    icon: '/icons/sidebar/book.svg',
    title: 'Course',
    path: '/student/course',
  },
  {
    icon: '/icons/sidebar/empty-wallet.svg',
    title: 'Payment',
    path: '/student/payment',
  },
  {
    icon: '/icons/sidebar/monitor.svg',
    title: 'Forum Discussion',
    path: '/student/forum-discussion',
  },
  {
    icon: '/icons/sidebar/note.svg',
    title: 'Personal Notes',
    path: '/student/personal-notes',
  },
  // {
  //   icon: '/icons/sidebar/setting.svg',
  //   title: 'Master Data',
  //   links: [
  //     { label: 'Academic Level', link: '/mentor/master-data/academic-level' },
  //   ],
  // },
];
