import { ProfileData } from "../profile.type";

const API_URL = 'https://talentnesia-skwn.khil.me/api/v1/user-profile-setting/egj2L7TTxjpPqor4';

export async function getProfileData(): Promise<ProfileData> {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching profile data: ${response.statusText}`);
    }

    const data: ProfileData = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Failed to fetch profile data:', error);
    throw error; 
  }
}
