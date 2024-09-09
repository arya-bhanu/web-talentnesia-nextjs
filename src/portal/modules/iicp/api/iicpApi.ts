import axios from 'axios';

const iicpApi = async () => {
  try {
    const { data } = await axios.get(
      'https://api-talentnesia.skwn.dev/api/iicp',
    );
    return data.data;
  } catch (error) {
    console.error('Error fetching iicp data:', error);
    throw error;
  }
};

export default iicpApi;