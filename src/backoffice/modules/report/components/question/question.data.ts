import { IQuestion } from './question.type';

export const QuestionData: IQuestion[] = [
  {
    text: 'Apa perbedaan antara UI (User Interface) dan UX (User Experience)?',
  },
  {
    text: 'Bagaimana cara menerapkan prinsip-prinsip UI/UX dalam desain sebuah aplikasi mobile?',
  },
  {
    text: 'Bagaimana cara melakukan pengujian usability (usability testing) untuk memastikan desain UI/UX yang efektif dan mudah digunakan oleh pengguna?',
  },
  {
    text: 'Mengapa penting untuk memperhatikan UI/UX dalam pengembangan produk digital?',
  },
  {
    text: 'Apa saja langkah-langkah yang perlu dilakukan untuk melakukan penelitian pengguna (user research) dalam konteks UI/UX?',
    attachment: '/path/to/attachment.pdf',
    attachmentName: 'Pendukung Soal.pdf',
  },
];
