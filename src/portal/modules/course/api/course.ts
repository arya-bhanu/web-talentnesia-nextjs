import axios from 'axios';

const courseApi = async () => {
  try {
    const { data } = await axios.get(
      'https://api-talentnesia.skwn.dev/api/course/table',
    );
    return data.data;
  } catch (error) {
    throw error;
  }
};

export default courseApi;