import axios from 'axios';
import { IActivity } from '../types';

const ax = axios.create({ baseURL: 'http://localhost:5000/api/' });

const fetchActivities = async () => {
  try {
    const response = await ax.get<IActivity[]>('activities', {
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
