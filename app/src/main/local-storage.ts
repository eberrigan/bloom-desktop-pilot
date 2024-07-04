class LocalStorage {

  store: { [key: string]: string } = {};

  getItem(key: string) {
    if (typeof key !== 'string') {
      console.warn('LocalStorage: Key should be of type String');
      return null;
    }
    return this.store[key] || null;
  }

  setItem(key: string, value: string) {
    if (typeof key !== 'string') {
      console.warn('LocalStorage: Key should be of type String');
      return;
    }
    this.store[key] = String(value);
  }

  removeItem(key: string) {
    if (typeof key !== 'string') {
      console.warn('LocalStorage: Key should be of type String');
    return;
    }
    delete this.store[key];
  }

  clear() {
    this.store = {};
  }

  key(i: number) {
    const keys = Object.keys(this.store);
    return keys[i] || null;
  }

  get length() {
    return Object.keys(this.store).length;
  }
}

export { LocalStorage }
