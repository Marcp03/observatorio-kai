   import axios from 'axios';

   const API_URL = 'http://localhost:3000';

   export const uploadData = async (data) => {
    const response = await axios.post(`${API_URL}/data`, data);
    return response.data;
};
   