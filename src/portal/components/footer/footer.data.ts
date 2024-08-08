import { ILink } from './footer.type';

export const dataNavs = [
  {
    title: 'ABOUT US',
    links: [
      {
        label: 'Tentang Kami',
        link: 'tentang-kami',
      },
      {
        label: 'FAQ',
        link: 'faq',
      },
    ] as ILink[],
  },
  {
    title: 'OUR PROGRAM',
    links: [
      {
        label: 'E-Learning',
        link: 'e-learning',
      },
      {
        label: 'Bootcamp',
        link: 'bootcamp',
      },
      {
        label: 'IICP',
        link: 'iicp',
      },
    ] as ILink[],
  },
  {
    title: 'MORE',
    links: [
      {
        label: 'Privacy Policy',
        link: 'privacy-policy',
      },
      {
        label: 'Term and Condition',
        link: 'terms',
      },
      {
        label: 'Cookies',
        link: 'cookies',
      },
      {
        label: 'Blog',
        link: 'blog',
      },
      {
        label: 'Career',
        link: 'career',
      },
    ] as ILink[],
  },
];
