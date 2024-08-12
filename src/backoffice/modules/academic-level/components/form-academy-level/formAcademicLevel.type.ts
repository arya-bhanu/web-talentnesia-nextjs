import { ChangeEvent, FormEvent } from 'react';

export interface IAcademicLevelForm {
  handleSubmitForm: (e: FormEvent<HTMLFormElement>) => void;
  populatedDatas?: AcademicLevelObject & { id: number };
}

export interface AcademicLevelObject {
  code: number;
  name: string;
}
