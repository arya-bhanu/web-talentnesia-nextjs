export interface Education {
  name: string;
  titleId: string | null;
  major: string;
  gpa: string;
  yearGraduate: string;
  certificateNumber: string;
  certificate: string;
}

export interface MentorFormData {
  role: number;
  active: number;
  profilePicture: string;
  name: string;
  nik: string;
  npwp: string;
  photoKtp: string;
  photoNpwp: string;
  placeOfBirth: string;
  dateOfBirth: string;
  religionId: string | null;
  gender: number;
  mariageStatus: string;
  numberOfChildren: string;
  contract: string;
  phone: string;
  email: string;
  linkedin: string;
  emergencyContact: string;
  provinceId: string | null;
  districtId: string | null;
  subDistrictId: string | null;
  zipCode: string;
  addressKtp: string;
  addressDomicile: string;
  educations: Education[];
}

export interface Region {
  id: string;
  name: string;
}
