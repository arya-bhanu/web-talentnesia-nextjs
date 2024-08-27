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
    url: `https://api-talentnesia.skwn.dev/api/v1/file`,
    data,
    maxBodyLength: Infinity,
  };

  // Debugging: Log the headers to check what's being sent
  console.log('FormData headers:', data.getHeaders ? data.getHeaders() : 'No headers');
  console.log('FormData:', data);

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error('Failed to upload image:', error);
    throw error;
  }
};
