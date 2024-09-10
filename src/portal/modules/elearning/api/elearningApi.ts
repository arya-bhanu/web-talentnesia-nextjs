import axios from 'axios';

const elearningApi = async () => {
  try {
    const { data } = await axios.get(
      'https://api-talentnesia.skwn.dev/api/elearning/table',
    );
    return data.data;
  } catch (error) {
    throw error;
  }
};

export default elearningApi;
