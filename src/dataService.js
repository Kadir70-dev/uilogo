// dataService.js
import axios from 'axios';

export const fetchDataWithToken = async (token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const response = await axios.get('/api/data', { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
}

