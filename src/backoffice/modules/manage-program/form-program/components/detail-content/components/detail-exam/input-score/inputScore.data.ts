import { questionDataProps, studentDataProps } from "./inputScore.type";

export const studentData: studentDataProps[] = [
  {
    id: 1,
    nama: 'Meysa Aprillia',
    batasAkhir: '17 Januari 2024 11:30 WIB',
    tglDikerjakan: '17 Januari 2024 11:30 WIB',
    tipe: 'Essay',
  },
  {
    id: 2,
    nama: 'Wahyu April',
    batasAkhir: '17 Januari 2024 11:30 WIB',
    tglDikerjakan: '17 Januari 2024 11:30 WIB',
    tipe: 'Essay',
  },
  {
    id: 3,
    nama: 'Mas ayu',
    batasAkhir: '17 Januari 2024 11:30 WIB',
    tglDikerjakan: '17 Januari 2024 11:30 WIB',
    tipe: 'Essay',
  },
];

export const questionData: questionDataProps[] = [
    {
      id: 1,
      pertanyaan:
        'Apa saja langkah-langkah yang perlu dilakukan untuk melakukan penelitian pengguna (user research) dalam konteks UI/UX?',
      jawaban: 'Jawaban no.1.pdf',
      nilai: 20,
      totalNilai: 20,
    },
    {
      id: 2,
      pertanyaan:
        'Apa perbedaan antara UI (User Interface) dan UX (User Experience)? Bagaimana cara menerapkan prinsip - prinsip UI/UX dalam desain sebuah aplikasi mobile?',
      jawaban:
        'Lorem ipsum dolor sit amet consectetur. Vitae nisl imperdiet ut nibh et lobortis leo.',
      nilai: 20,
      totalNilai: 20,
    },
    {
      id: 3,
      pertanyaan:
        'Mengapa penting untuk memperhatikan UI/UX dalam pengembangan produk digital?',
      jawaban:
        'Lorem ipsum dolor sit amet consectetur. Vitae nisl imperdiet ut nibh et lobortis leo.',
      nilai: 10,
      totalNilai: 20,
    },
    {
      id: 4,
      pertanyaan:
        'Bagaimana cara melakukan pengujian usability testing untuk memastikan desain UI/UX yang efektif dan mudah digunakan oleh pengguna?',
      jawaban:
        'Lorem ipsum dolor sit amet consectetur. Vitae nisl imperdiet ut nibh et lobortis leo.',
      nilai: 20,
      totalNilai: 20,
    },
    {
      id: 5,
      pertanyaan: 'Lorem ipsum dolor sit amet consectetur',
      jawaban:
        'Lorem ipsum dolor sit amet consectetur. Vitae nisl imperdiet ut nibh et lobortis leo.',
      nilai: 20,
      totalNilai: 20,
    },
];
