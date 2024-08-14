import { FilterCategory } from "./filter.type";

export const filterCategories: FilterCategory[] = [
  {
    title: 'Kategori',
    options: [
      { label: 'Programming', value: 'programming' },
      { label: 'Design', value: 'design' },
      { label: 'Marketing', value: 'marketing' },
      { label: 'Business', value: 'business' },
    ],
  },
  {
    title: 'Tipe Kelas',
    options: [
      { label: 'Online', value: 'online' },
      { label: 'Offline', value: 'offline' },
      { label: 'Self-paced', value: 'self-paced' },
    ],
  },
  {
    title: 'Level',
    options: [
      { label: 'Beginner', value: 'beginner' },
      { label: 'Intermediate', value: 'intermediate' },
      { label: 'Advanced', value: 'advanced' },
    ],
  },
  {
    title: 'Harga',
    options: [
      { label: 'Rp 1.000.000', value: '1000000' },
      { label: 'Rp 2.000.000', value: '2000000' },
      { label: 'Rp 4.000.000', value: '4000000' },
      { label: 'More than Rp 4.000.000', value: 'more-than-4000000' },
    ],
  },
];
