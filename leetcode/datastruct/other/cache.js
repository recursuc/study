 // LRU是Least Recently Used 即最近最少使用，是一种缓存淘汰策略，当缓存满时，会优先淘汰最近最少使用的数据，以腾出空间存储新的数据。上述代码实现了一个LRU缓存。
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return -1;

    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      this.cache.delete(this.cache.keys().next().value);
    }

    this.cache.set(key, value);
  }
}

//  LFU (Least Frequently Used)
class LFUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
    this.freq = new Map();
    this.minFreq = 0;
  }

  get(key) {
    if (!this.cache.has(key)) return -1;

    const value = this.cache.get(key);
    const freq = this.freq.get(key);
    this.freq.set(key, freq + 1);
    this.cache.delete(key);
    if (freq === this.minFreq && this.freq.size !== 0) {
      this.minFreq++;
    }
    this.cache.set(key, value);
    return value;
  }

  put(key, value) {
    if (this.capacity === 0) return;

    if (this.cache.has(key)) {
      const freq = this.freq.get(key);
      this.freq.set(key, freq + 1);
      this.cache.delete(key);
      if (freq === this.minFreq && this.freq.size !== 0) {
        this.minFreq++;
      }
    } else {
      if (this.cache.size >= this.capacity) {
        const leastFreq = this.freq.get(this.cache.keys().next().value);
        this.cache.delete(this.cache.keys().next().value);
        this.freq.delete(this.cache.keys().next().value);
        if (leastFreq === this.minFreq && this.freq.size !== 0) {
          this.minFreq++;
        }
      }
      this.freq.set(key, 1);
    }
    this.cache.set(key, value);
    this.minFreq = 1;
  }
}
