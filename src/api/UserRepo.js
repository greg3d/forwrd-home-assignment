// UserService.js

export class UserRepo {
  constructor(dbName = 'UserDatabase', storeName = 'Users', initialData = []) {
    this.dbName = dbName;
    this.storeName = storeName;
    this.initialData = initialData; // Массив с данными пользователей
    this.db = null;
  }

  openDB() {
    return new Promise((resolve, reject) => {
      if (this.db) {
        resolve(this.db);
        return;
      }

      const request = indexedDB.open(this.dbName, 1);

      request.onerror = (event) => {
        console.error('Ошибка IndexedDB:', event.target.errorCode);
        reject(event.target.error);
      };

      request.onupgradeneeded = (event) => {
        this.db = event.target.result;
        if (!this.db.objectStoreNames.contains(this.storeName)) {
          const objectStore = this.db.createObjectStore(this.storeName, {
            keyPath: 'id', // unique key
            autoIncrement: false, // false, i have id's
          });

          // fill with mock data
          objectStore.transaction.oncomplete = () => {
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            for (const user of this.initialData) {
              console.log(user);
              store.add(user);
            }
          };
        }
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve(this.db);
      };
    });
  }

  async getAllUsers() {
    try {
      const db = await this.openDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([this.storeName], 'readonly');
        const store = transaction.objectStore(this.storeName);
        const request = store.getAll();

        request.onsuccess = () => {
          resolve(request.result);
        };

        request.onerror = (event) => {
          console.error('Error getting users:', event.target.error);
          reject(event.target.error);
        };
      });
    } catch (error) {
      console.error('getAllUsers Error:', error);
      throw error;
    }
  }

  async addUsers(usersArray) {
    try {
      const db = await this.openDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([this.storeName], 'readwrite');
        const store = transaction.objectStore(this.storeName);

        for (const user of usersArray) {
          store.add(user);
        }

        transaction.oncomplete = () => {
          resolve(true);
        };

        transaction.onerror = (event) => {
          console.error('Create users error:', event.target.error);
          reject(event.target.error);
        };
      });
    } catch (error) {
      console.error('Error addUsers:', error);
      throw error;
    }
  }

  async updateUsers(usersArray) {
    try {
      const db = await this.openDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([this.storeName], 'readwrite');
        const store = transaction.objectStore(this.storeName);

        for (const user of usersArray) {
          store.put(user);
        }

        transaction.oncomplete = () => {
          resolve(true);
        };

        transaction.onerror = (event) => {
          console.error('Update error:', event.target.error);
          reject(event.target.error);
        };
      });
    } catch (error) {
      console.error('updateUsers:', error);
      throw error;
    }
  }

  async deleteUsers(idsArray) {
    try {
      const db = await this.openDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([this.storeName], 'readwrite');
        const store = transaction.objectStore(this.storeName);

        for (const id of idsArray) {
          store.delete(id);
        }

        transaction.oncomplete = () => {
          resolve(true);
        };

        transaction.onerror = (event) => {
          console.error('Bulk delete error:', event.target.error);
          reject(event.target.error);
        };
      });
    } catch (error) {
      console.error('Delete error:', error);
      throw error;
    }
  }

  // search
  async searchUsers(query) {
    try {
      const db = await this.openDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([this.storeName], 'readonly');
        const store = transaction.objectStore(this.storeName);
        const request = store.getAll();

        request.onsuccess = () => {
          const users = request.result;
          const lowerCaseQuery = query.toLowerCase();

          const filteredUsers = users.filter(user => {
            return Object.values(user).some(value => {
              if (typeof value === 'string') {
                return value.toLowerCase().includes(lowerCaseQuery);
              }
              return false;
            });
          });
          resolve(filteredUsers);
        };

        request.onerror = (event) => {
          console.error('Search Error:', event.target.error);
          reject(event.target.error);
        };
      });
    } catch (error) {
      console.error('Error searchUsers:', error);
      throw error;
    }
  }

}