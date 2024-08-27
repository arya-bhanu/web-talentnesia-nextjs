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
    url: `https://api-talentnesia.skwn.dev/api/v1/file`,
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
