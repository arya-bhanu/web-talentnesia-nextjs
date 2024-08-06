import { ChangeEvent, FormEvent } from 'react';

export interface IManageModulForm {
  handleSubmitForm: (e: FormEvent<HTMLFormElement>) => void;
  populatedDatas?: ModuleObject & { id: number };
}

export interface ModuleObject {
  modulName: string;
  status: string;
}
