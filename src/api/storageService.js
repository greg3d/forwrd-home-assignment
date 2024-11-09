class StorageService {

  hasKey(key) {
    return localStorage.getItem(key) !== null;
  }

  setData(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage', error);
    }
  }

  getData(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error getting data from localStorage', error);
      return null;
    }
  }

  removeData(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing data from localStorage', error);
    }
  }

  clearData() {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage', error);
    }
  }

}

export default new StorageService();