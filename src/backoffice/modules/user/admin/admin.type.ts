export interface Education {
  name: string;
  title: string;
  major: string;
  gpa: string;
  yearGraduated: string;
  certificateNumber: string;
  certificate: string | null;
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
  isMarried: string;
  numberOfChildren: string;
  contract: string | null;
  phone: string;
  linkedin: string;
  emergencyContact: string;
  email: string;
  province: string;
  district: string;
  subDistrict: string;
  zipCode: string;
  addressKtp: string;
  addressDomicile: string;
  education: Education[];
}
