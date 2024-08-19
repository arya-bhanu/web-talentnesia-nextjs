import { registerCustomizations } from '@/backoffice/components/global-customization/globalCustomizations';

export const programsData = [
    {
      id: "XfEzCNkwE0blm5L8",
      imgSrc: "/img/program-card/card-sample-1.svg",
      status: "Finished" as const,
      title: "Kelas A Tefa SMK",
      periode: "Periode Januari 2024 - Juni 2024",
      totalParticipants: 40,
      description: "Deskripsi lengkap mengenai program Kelas A Tefa SMK."
    },
    {
      id: "hh75psQyGuuhCUll",
      imgSrc: "/img/program-card/card-sample-2.svg",
      status: "On Going" as const,
      title: "Kelas B Tefa SMK",
      periode: "Periode Januari 2024 - Juni 2024",
      totalParticipants: 40,
      description: "Deskripsi lengkap mengenai program Kelas B Tefa SMK."
    },
    {
      id: "jpsnv9vyQcs3Ydp6",
      imgSrc: "/img/program-card/card-sample-3.svg",
      status: "Not Started" as const,
      title: "Kelas C Tefa SMK",
      periode: "Periode Januari 2024 - Juni 2024",
      totalParticipants: 40,
      description: "Deskripsi lengkap mengenai program Kelas C Tefa SMK."
    }
  ];


 

  const programCustomTitles = {
    'XfEzCNkwE0blm5L8': 'Kelas A Tefa SMK',
    'hh75psQyGuuhCUll': 'Kelas B Tefa SMK',
    'jpsnv9vyQcs3Ydp6': 'Kelas C Tefa SMK'
  };
  
  const programCustomBreadcrumbs = {
    'XfEzCNkwE0blm5L8': 'Kelas A Tefa SMK',
    'hh75psQyGuuhCUll': 'Kelas B Tefa SMK',
    'jpsnv9vyQcs3Ydp6': 'Kelas C Tefa SMK'
  };
  
  registerCustomizations('program', programCustomTitles, programCustomBreadcrumbs);