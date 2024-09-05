import axios from 'axios';

const API_URL = 'https://api-talentnesia.skwn.dev/api/v1';

export const partnerAPI = {
  fetch: async () => {
    try {
      const response = await axios.get(`${API_URL}/partner`);
      return response.data.data.items;
    } catch (error) {
      console.error('Failed to fetch partner');
      return [];
    }
  },

  getById: async (id: string) => {
    try {
      const response = await axios.get(`${API_URL}/partner/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch partner details');
      return;
    }
  },

  add: async (data: { name: string, address: string, logo: string, description: string }) => {
    const partners = await partnerAPI.fetch();
    const lastPartner = partners[partners.length - 1];
    const lastCodeID = lastPartner?.code || 'P000';
    const lastNumber = parseInt(lastCodeID.replace('P', '')) + 1;
    const newCodeID = `P${lastNumber.toString().padStart(Math.max(3, lastNumber.toString().length), '0')}`;
    try {
      const requestData = {
        ...data,
        active: 1,
        createdBy: "",
        code: newCodeID,
        
      };

      const response = await axios.post(`${API_URL}/partner`, requestData);
      return response.data;
    } catch (error) {
      console.error('Failed to add partner');
      console.log(error)
      return;
    }
  },

  update: async (id: string, data: { name: string, address: string, logo: string, description: string }) => {
    const response = await partnerAPI.getById(id);
    const codeID = response.data.code;
    try {
        const requestData = {
        ...data,
        active: 1,
        code: codeID
      };

      const response = await axios.put(`${API_URL}/partner/${id}`, requestData);
      return response.data;
    } catch (error) {
      console.error('Failed to update partner');
      console.log(error)
      return;
    }
  },

  delete: async (id: string) => {
    try {
      if (typeof id !== 'string' || !id) {
        throw new Error('Invalid ID format');
      }

      const response = await axios.delete(`${API_URL}/partner/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to delete partner');
      return;
    }
  }
};

const codeID = async () => {
  const partners = await partnerAPI.fetch();
  const lastPartner = partners[partners.length - 1];
  const lastCodeID = lastPartner?.code || 'P000';
  const lastNumber = parseInt(lastCodeID.replace('P', '')) + 1;


}
