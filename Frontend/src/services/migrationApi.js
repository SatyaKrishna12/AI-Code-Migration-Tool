import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/migrate';

const migrationApi = {

  migrateCode: async (code, target) => {
    const response = await axios.post(API_BASE_URL, {
      code,
      target,
    });
    return response.data;
  },

  getHistory: async () => {
    const response = await axios.get(`${API_BASE_URL}/history`);
    return response.data;
  },
};

export default migrationApi;
