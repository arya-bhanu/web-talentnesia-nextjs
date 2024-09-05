import { fetchAxios } from '@/lib/fetchAxios';

export const fileHelper = {
  uploadFile: async (file: File, path: string): Promise<string | null> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('path', path);

    try {
      const response = await fetchAxios<{ success: boolean; path: { origins: string } }>({
        url: '/v1/file',
        method: 'POST',
        formData: formData,
      });

      return response.success ? response.path.origins : null;
    } catch (error) {
      console.error('Failed to upload file:', error);
      return null;
    }
  },

  getFile: async (filePath: string): Promise<Blob | null> => {
    try {
      const response = await fetchAxios<Blob>({
        url: `/v1/file/${filePath}`,
        method: 'GET',
      });

      return new Blob([response], { type: 'application/octet-stream' });
    } catch (error) {
      console.error('Error fetching file:', error);
      return null;
    }
  },
};
