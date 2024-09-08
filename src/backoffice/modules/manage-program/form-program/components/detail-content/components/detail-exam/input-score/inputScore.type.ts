import { questionData } from './inputScore.data';
export interface studentDataProps {
  id: number;
  nama: string;
  batasAkhir: string;
  tglDikerjakan: string;
  tipe: string;
}

export interface questionDataProps {
  id: number;
  pertanyaan: string;
  jawaban: string;
  nilai: number;
  totalNilai: number;
}