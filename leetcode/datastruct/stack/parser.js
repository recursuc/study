// Here is an implementation of a Skip List data structure in JavaScript
// which is also known as a 跳跃表 in Chinese.

class SkipList {
  constructor() {
    this.head = {
      value: -Infinity,
      next: null,
      down: null
    };
    this.tail = {
      value: Infinity,
      next: null,
      down: null
    };
    this.head.next = this.tail;
  }

  add(value) {
    let current = this.head;
    const nodes = [];

    while (current) {
      if (current.next.value <= value) {
        current = current.next;
      } else {
        nodes.push(current);
        current = current.down;
      }
    }

    nodes.reverse().forEach(node => {
      const newNode = {
        value,
        next: node.next,
        down: null
      };
      node.next = newNode;
      newNode.down = current || null;
      current = newNode;
    });
  }

  find(value) {
    let current = this.head;

    while (current) {
      if (current.next.value === value) {
        return true;
      } else if (current.next.value < value) {
        current = current.next;
      } else {
        current = current.down;
      }
    }

    return false;
  }

  remove(value) {
    let current = this.head;

    while (current) {
      if (current.next.value === value) {
        current.next = current.next.next;
      }
      if (current.next.value <= value) {
        current = current.next;
      } else {
        current = current.down;
      }
    }
  }
}

// Usage:
const list = new SkipList();
list.add(1);
list.add(2);
list.add(3);
console.log(list.find(2)); // true
list.remove(2);
console.log(list.find(2)); // false