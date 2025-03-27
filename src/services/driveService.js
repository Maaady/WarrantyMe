const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const DriveService = {
  async saveWarranty(content, title, expiryDate, productDetails) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/drive/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ content, title, expiryDate, productDetails })
      });
      return await response.json();
    } catch (error) {
      console.error('Error saving warranty:', error);
      throw error;
    }
  },

  async getWarranties() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/drive/warranties`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching warranties:', error);
      throw error;
    }
  }
};