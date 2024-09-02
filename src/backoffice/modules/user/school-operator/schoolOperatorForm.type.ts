

export interface SchoolOperatorFormData {
  id: string | null;
  role: number;
  active: number;
  profilePicture: string;
  profilePictureOrigin: string | null;

  name: string;
  nik: string;
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
  addressDomicile: string;

  educationInstitutionId: string | null;
}

export interface Region {
  id: string;
  name: string;
}
