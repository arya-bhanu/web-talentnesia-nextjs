import axios from 'axios';

const homeApi = async () => {
  try {
    const { data } = await axios.get(
      'https://api-talentnesia.skwn.dev/api/home',
    );
    return data.data;
  } catch (error) {
    throw error;
  }
};

export default homeApi;
