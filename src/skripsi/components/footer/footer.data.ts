import { ILink } from './footer.type';

export const dataNavs = [
  {
    title: 'ABOUT US',
    links: [
      {
        label: 'Tentang Kami',
        link: '/',
      },
      {
        label: 'FAQ',
        link: '/',
      },
    ] as ILink[],
  },
  {
    title: 'OUR PROGRAM',
    links: [
      {
        label: 'E-Learning',
        link: '/',
      },
      {
        label: 'Bootcamp',
        link: '/',
      },
      {
        label: 'IICP',
        link: '/',
      },
    ] as ILink[],
  },
  {
    title: 'MORE',
    links: [
      {
        label: 'Privacy Policy',
        link: '/',
      },
      {
        label: 'Term and Condition',
        link: '/',
      },
      {
        label: 'Cookies',
        link: '/',
      },
      {
        label: 'Blog',
        link: '/',
      },
      {
        label: 'Career',
        link: '/',
      },
    ] as ILink[],
  },
];
