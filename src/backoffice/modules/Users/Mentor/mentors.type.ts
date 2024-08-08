export interface Education {
  universityName: string;
  academicTitle: string;
  major: string;
  gpa: string;
  yearGraduated: string;
  certificateNumber: string;
}

export interface MentorFormData {
  profilePicture: string | null;
  name: string;
  nik: string;
  npwp: string;
  placeOfBirth: string;
  dateOfBirth: string;
  religion: string;
  gender: string;
  maritalStatus: string;
  numberOfChildren: string;
  phoneNumber: string;
  email: string;
  province: string;
  city: string;
  subDistrict: string;
  zipCode: string;
  addressKtp: string;
  addressDomicile: string;
  education: Education[];
}
