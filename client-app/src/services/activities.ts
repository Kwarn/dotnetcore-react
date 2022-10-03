import axios from 'axios';

const ax = axios.create({ baseURL: 'http://localhost:5000/' });

const fetchActivities = async () => {
  try {
    const response = await ax.get('api/activities', {
      headers: { 'Access-Control-Allow-Origin': '*' },
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (err: unknown) {
    throw new Error('Error fetching data');
  }
};

export default fetchActivities;
