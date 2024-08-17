import PlayCircle from '@/../public/icons/play-circle.svg';
import Book from '@/../public/icons/manage-program/book.svg';
import Edit2 from '@/../public/icons/edit-2.svg';
import VideoCam from '@/../public/icons/videocam.svg';
import { SectionItem } from './detail.type';

export const sections: SectionItem[] = [
  {
    id: 1,
    title: 'UX Design Principles',
    duration: 45,
    isOpen: false,
    tabs: [
      { id: 1, label: 'UX Introduction', icon: '/icons/play-circle.svg', content: 'Content for UX Introduction' },
      { id: 2, label: 'Jacob\'s Law', icon: '/icons/play-circle.svg', content: 'Content for Jacob\'s Law' },
      { id: 3, label: 'Consistency in your design', icon: '/icons/play-circle.svg', content: 'Content for Consistency in your design' },
      { id: 4, label: 'Hick\'s Law', icon: '/icons/manage-program/book.svg', content: 'https://www.princexml.com/howcome/2016/samples/magic8/index.html' },
      { id: 5, label: 'Exam Hick\'s Law', icon: '/icons/edit-2.svg', content: 'Content for Exam Hick\'s Law' },
    ],
  },
  {
    id: 2,
    title: 'UI Design Principles',
    duration: 45,
    isOpen: false,
    tabs: [
      { id: 6, label: 'Mentoring 1', icon: '/icons/videocam.svg', content: 'Content for Mentoring 1' },
      { id: 7, label: 'The magic number is 4', icon: '/icons/manage-program/book.svg', content: 'Content for The magic number is 4' },
      { id: 8, label: 'Ethical Design', icon: '/icons/manage-program/book.svg', content: 'Content for Ethical Design' },
    ],
  },
  {
    id: 3,
    title: 'Pixel Perfect',
    duration: 40,
    isOpen: false,
    tabs: [
      { id: 9, label: 'Pixel Perfect Design', icon: '/icons/manage-program/book.svg', content: 'Content for Pixel Perfect Design' },
    ],
  },
];