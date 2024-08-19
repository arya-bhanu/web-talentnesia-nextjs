import { SectionItem } from '@/backoffice/components/course-sidebar/courseSidebar.type';

export const initialSections: SectionItem[] = [
  {
    id: 1,
    title: 'UX Design Principles',
    duration: 45,
    isOpen: false,
    tabs: [
      { id: '1', label: 'UX Introduction', iconId: 1, content: 'Content for UX Introduction' },
      { id: '2', label: 'Jacob\'s Law', iconId: 1, content: 'Content for Jacob\'s Law' },
      { id: '3', label: 'Consistency in your design', iconId: 1, content: 'Content for Consistency in your design' },
      { id: '4', label: 'Hick\'s Law', iconId: 2, content: 'https://www.princexml.com/howcome/2016/samples/magic8/index.html' },
      { id: '5', label: 'Exam Hick\'s Law', iconId: 3, content: 'Content for Exam Hick\'s Law' },
    ],
  },
  {
    id: 2,
    title: 'UI Design Principles',
    duration: 45,
    isOpen: false,
    tabs: [
      { id: '6', label: 'Mentoring 1', iconId: 4, content: 'Content for Mentoring 1' },
      { id: '7', label: 'The magic number is 4', iconId: 2, content: 'Content for The magic number is 4' },
      { id: '8', label: 'Ethical Design', iconId: 2, content: 'Content for Ethical Design' },
    ],
  },
  {
    id: 3,
    title: 'Pixel Perfect',
    duration: 40,
    isOpen: false,
    tabs: [
      { id: '9', label: 'Pixel Perfect Design', iconId: 2, content: 'Content for Pixel Perfect Design' },
    ],
  },
];
