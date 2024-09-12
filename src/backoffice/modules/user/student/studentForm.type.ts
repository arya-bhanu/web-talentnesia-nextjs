

export interface StudentFormData {
  id: string | null;
  role: number;
  active: number;
  profilePicture: string;
  profilePictureOrigin: string | null;
  name: string;
  nik: string;
  photoKtp: string;
  photoKtpOrigin?: string | null;
  placeOfBirth: string;
  dateOfBirth: string;
  religionId: string | null;
  gender: number;

  phone: string;
  email: string;

  provinceId: string | null;
  districtId: string | null;
  subDistrictId: string | null;
  zipCode: string;
  addressKtp: string;
  addressDomicile: string;

  educationName: string;
  educationLevelId: string | null;
  educationStart: string | null;
  educationEnd: string | null;
}

export interface Region {
  id: string;
  name: string;
}
