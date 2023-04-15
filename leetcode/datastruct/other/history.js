// Here is an example implementation of a history class in JavaScript
class History {
  constructor() {
    this.history = [];
    this.currentIndex = -1;
  }

  // Add a new item to the history
  add(item) {
    // If we are not at the end of the history, remove all items after the current index
    if (this.currentIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.currentIndex + 1);
    }
    // Add the new item to the end of the history
    this.history.push(item);
    // Update the current index to point to the new item
    this.currentIndex = this.history.length - 1;
  }

  // Move the current index back one and return the item at that index
  back() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      return this.history[this.currentIndex];
    }
    return null;
  }

  // Move the current index forward one and return the item at that index
  forward() {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      return this.history[this.currentIndex];
    }
    return null;
  }

  // Get the current item in the history
  current() {
    if (this.currentIndex >= 0 && this.currentIndex < this.history.length) {
      return this.history[this.currentIndex];
    }
    return null;
  }

  // Get the entire history
  getHistory() {
    return this.history;
  }
}

// Usage:
const myHistory = new History();
myHistory.add('google.com');
myHistory.add('facebook.com');
myHistory.add('twitter.com');
console.log(myHistory.getHistory()); // ['google.com', 'facebook.com', 'twitter.com']
console.log(myHistory.back()); // 'facebook.com'
console.log(myHistory.back()); // 'google.com'
console.log(myHistory.forward()); // 'facebook.com'
console.log(myHistory.current()); // 'facebook.com'

