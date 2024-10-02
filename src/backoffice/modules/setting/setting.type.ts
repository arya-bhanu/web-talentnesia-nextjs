import { DecodedToken } from "@/lib/tokenDecoder";

export interface UserData extends DecodedToken {
  firstName?: string;
  lastName?: string;
  linkedIn?: string;
  phoneNumber?: string;
  bio?: string;
  gender?: string;
  password?: string;
  hashedPassword?: string;
}