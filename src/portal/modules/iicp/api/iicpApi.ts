import axios from 'axios';

const iicpApi = async () => {
  try {
    const { data } = await axios.get(
      'https://api-talentnesia.skwn.dev/api/iicp',
    );
    return data.data;
  } catch (error) {
    throw error;
  }
};

export default iicpApi;