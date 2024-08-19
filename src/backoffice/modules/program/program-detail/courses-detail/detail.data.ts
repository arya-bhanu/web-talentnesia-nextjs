import { SectionItem } from '@/backoffice/components/course-sidebar/courseSidebar.type';

export const initialSections: SectionItem[] = [
  {
    id: 1,
    title: 'UX Design Principles',
    duration: 45,
    isOpen: false,
    tabs: [
      { id: '1', label: 'UX Introduction', iconId: 1, content: 'https://youtu.be/ziQEqGZB8GE?si=g7rzNof8XKyyG8J1' },
      { id: '2', label: 'Jacob\'s Law', iconId: 1, content: 'https://youtu.be/VMnDRg55SDo?si=TfCEKCqELEXkZDsv' },
      { id: '3', label: 'Consistency in your design', iconId: 1, content: 'https://youtu.be/sZgffn4OYiA?si=5Yl-Gy2CAVil76fv' },
      { id: '4', label: 'Hick\'s Law', iconId: 2, content: 'https://www.princexml.com/samples/invoice/invoicesample.pdf' },
      { id: '5', label: 'Exam Hick\'s Law', iconId: 3, content: 'Content for Exam Hick\'s Law' },
    ],
  },
  {
    id: 2,
    title: 'UI Design Principles',
    duration: 45,
    isOpen: false,
    tabs: [
      { id: '6', label: 'Mentoring 1', iconId: 4, content: 'https://meet.google.com/evf-cifh-bcs' },
      { id: '7', label: 'The magic number is 4', iconId: 2, content: 'https://css4.pub/2015/textbook/somatosensory.pdf' },
      { id: '8', label: 'Ethical Design', iconId: 2, content: 'https://css4.pub/2015/usenix/example.pdf' },
    ],
  },
  {
    id: 3,
    title: 'Pixel Perfect',
    duration: 40,
    isOpen: false,
    tabs: [
      { id: '9', label: 'Pixel Perfect Design', iconId: 2, content: 'https://www.princexml.com/howcome/2016/samples/magic6/magic.pdf' },
    ],
  },
];
