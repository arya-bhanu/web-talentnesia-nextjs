import { fetchAxios, UseFetchProps } from '@/lib/fetchAxios';

export const fileHelper = {
  uploadFile: async (file: File, path: string): Promise<string | null> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('path', path);

    const config: UseFetchProps = {
      url: '/v1/file',
      method: 'POST',
      formData: formData,
    };

    try {
      const response = await fetchAxios<{ success: boolean; path: { origins: string } }>(config);
      return response.success ? response.path.origins : null;
    } catch (error) {
      console.error('Failed to upload file');
      return null;
    }
  },

  getFile: async (filePath: string): Promise<Blob | null> => {
    const config: UseFetchProps = {
      url: `/v1/file/${filePath}`,
      method: 'GET',
    };

    try {
      const response = await fetchAxios<Blob>(config);
      return new Blob([response], { type: 'application/octet-stream' });
    } catch (error) {
      console.error('Error fetching file:', error);
      return null;
    }
  },
};
