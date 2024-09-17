import { fetchAxios } from '@/lib/fetchAxios';
import { APIResponsePartner } from '../partner.type';

export const partnerAPI = {
  fetch: async () => {
    return fetchAxios<{ data: { items: APIResponsePartner[] } }>({
      url: `/v1/partner`,
      method: 'GET',
    }).then((response) => response.data.items);
  },

  getById: async (id: string) => {
    return fetchAxios<{ data: APIResponsePartner }>({
      url: `/v1/partner/${id}`,
      method: 'GET',
    }).then((response) => response.data);
  },

  add: async (data: { name: string; address: string; logo: string; description: string }) => {
    const partners = await partnerAPI.fetch();
    const lastPartner = partners[partners.length - 1];
    const lastCodeID = lastPartner?.code || 'P000';
    const lastNumber = parseInt(lastCodeID.replace('P', '')) + 1;
    const newCodeID = `P${lastNumber.toString().padStart(Math.max(3, lastNumber.toString().length), '0')}`;

    const requestData = {
      ...data,
      active: 1,
      createdBy: "",
      code: newCodeID,
    };

    return fetchAxios<{ data: APIResponsePartner }>({
      url: `/v1/partner`,
      method: 'POST',
      formData: requestData,
    }).then((response) => response.data);
  },

  update: async (id: string, data: { name: string; address: string; logo: string; description: string }) => {
    const response = await partnerAPI.getById(id);
    const codeID = response.code;

    const requestData = {
      ...data,
      active: 1,
      code: codeID,
    };

    return fetchAxios<{ data: APIResponsePartner }>({
      url: `/v1/partner/${id}`,
      method: 'PUT',
      formData: requestData,
    }).then((response) => response.data);
  },

  delete: async (id: string) => {
    return fetchAxios<{ success: boolean }>({
      url: `/v1/partner/${id}`,
      method: 'DELETE',
    }).then((response) => response.success);
  }
};
