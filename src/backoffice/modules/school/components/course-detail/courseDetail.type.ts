import { Dispatch, SetStateAction } from 'react';

export interface CourseDetailProps {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}
