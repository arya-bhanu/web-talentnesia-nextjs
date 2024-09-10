import { Dispatch, SetStateAction } from 'react';

export interface IFormContent {
  time: Date;
  setTime: Dispatch<SetStateAction<Date>>;
  fileUrl: string;
  fileName: string;
  fileType: string;
  setFileType: Dispatch<SetStateAction<string>>;
  handleFileChange: (fileUrl: string, fileName: string) => void;
  isEdit?: boolean;
}
