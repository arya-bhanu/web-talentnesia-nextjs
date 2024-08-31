import axios, { AxiosRequestConfig } from 'axios';
import FormData from 'form-data';

interface UploadFileResponse {
  fileUrl: string;
  path: {
    thumbs: string;
    origin: string;
  }
}

export const uploadFile = async (file: File, path: string): Promise<UploadFileResponse> => {
  const data = new FormData();
  data.append('file', file);
  data.append('path', path);

  const config: AxiosRequestConfig = {
    method: 'post',
    url: `${process.env.API_SERVER_URL}/v1/file`,
    data,
    maxBodyLength: Infinity,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error('Failed to upload image:', error);
    throw error;
  }
};

export const getImageUrl = async (imageUrl: string): Promise<string> => {
  try {
    if (imageUrl.startsWith('http')) {
      return imageUrl; // If it's already a full URL, return it as is
    }
    const fullUrl = `${process.env.API_SERVER_URL}/v1/file/${imageUrl}`;
    const response = await axios.get(fullUrl);
    return response.data.url || fullUrl;
  } catch (error) {
    console.error('Failed to fetch image URL:', error);
    throw error;
  }
};

