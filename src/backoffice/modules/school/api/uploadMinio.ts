import axios, { AxiosRequestConfig } from 'axios';
import FormData from 'form-data';

interface UploadFileResponse {
  fileUrl: string;
}

export const uploadFile = async (file: File, path: string): Promise<UploadFileResponse> => {
  const data = new FormData();
  data.append('file', file);
  data.append('path', path);

  const config: AxiosRequestConfig = {
    method: 'post',
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/file`,
    headers: {
      ...data.getHeaders(),
    },
    data,
    maxBodyLength: Infinity,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error('File upload failed:', error);
    throw error;
  }
};
