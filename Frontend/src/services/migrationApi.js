import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/migrate';

const migrationApi = {
  /**
   * Migrate code to target language
   * @param {string} code - The source code to migrate
   * @param {string} target - Target language ("ES6" or "TypeScript")
   * @returns {Promise} - API response with migrated code
   */
  migrateCode: async (code, target) => {
    const response = await axios.post(API_BASE_URL, {
      code,
      target,
    });
    return response.data;
  },

  /**
   * Get migration history
   * @returns {Promise} - API response with history array
   */
  getHistory: async () => {
    const response = await axios.get(`${API_BASE_URL}/history`);
    return response.data;
  },
};

export default migrationApi;
