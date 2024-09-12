export interface Education {
  name: string;
  titleId: string | null;
  major: string;
  gpa: string;
  yearGraduate: string;
  certificateNumber: string;
  certificate: string;
  certificateOrigin: string | null;
}

export interface MentorFormData {
  id: string | null;
  role: number;
  active: number;
  profilePicture: string;
  profilePictureOrigin: string | null;
  name: string;
  nik: string;
  npwp?: string;
  photoKtp?: string;
  photoKtpOrigin?: string | null;
  photoNpwp?: string;
  photoNpwpOrigin?: string | null;
  placeOfBirth: string;
  dateOfBirth: string;
  religionId: string | null;
  gender: number;
  mariageStatus: string;
  numberOfChildren?: number | null;
  contract: string;
  contractOrigin: string | null;
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
