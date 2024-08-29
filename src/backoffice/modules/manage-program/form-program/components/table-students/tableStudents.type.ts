export interface ITableStudents {
  className?: string;
}

export interface IAPIStudentProgram {
  userId?: string;
  name: string;
  email: string;
  nis: string | null;
  phone: string;
  photo: string;
}
