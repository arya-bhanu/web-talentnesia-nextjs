export interface Education {
  universityName: string;
  academicTitle: string;
  major: string;
  gpa: string;
  yearGraduated: string;
  certificateNumber: string;
}

export interface AdminFormData {
  profilePicture: string | null;
  name: string;
  nik: string;
  npwp: string;
  fotoKtp: string | null;
  fotoNpwp: string | null;
  placeOfBirth: string;
  dateOfBirth: string;
  religion: string;
  gender: string;
  maritalStatus: string;
  numberOfChildren: string;
  phoneNumber: string;
  linkedin: string;
  emergencyContact: string;
  email: string;
  province: string;
  city: string;
  subDistrict: string;
  zipCode: string;
  addressKtp: string;
  addressDomicile: string;
  education: Education[];
}
