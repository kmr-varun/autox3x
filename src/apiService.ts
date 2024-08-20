
import axios from 'axios';

const API_URL = 'https://run.mocky.io/v3/c5a0e4be-1227-4efa-9ca0-0a55f17ce417'; // Replace with your actual API URL

export const fetchPipelineData = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log('api called');
    return response.data;
    
  } catch (error) {
    console.error('Error fetching pipeline data:', error);
    throw error;
  }
};
