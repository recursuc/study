// Here is an implementation of a Segment Tree data structure in JavaScript
// It supports range queries and updates on an array of numbers

class SegmentTree {
  constructor(nums) {
    this.nums = nums;
    this.tree = new Array(nums.length * 4);
    this.build(0, 0, nums.length - 1);
  }

  build(node, start, end) {
    if (start === end) {
      this.tree[node] = this.nums[start];
    } else {
      const mid = Math.floor((start + end) / 2);
      this.build(node * 2 + 1, start, mid);
      this.build(node * 2 + 2, mid + 1, end);
      this.tree[node] = this.tree[node * 2 + 1] + this.tree[node * 2 + 2];
    }
  }

  update(node, start, end, idx, val) {
    if (start === end) {
      this.nums[idx] = val;
      this.tree[node] = val;
    } else {
      const mid = Math.floor((start + end) / 2);
      if (idx >= start && idx <= mid) {
        this.update(node * 2 + 1, start, mid, idx, val);
      } else {
        this.update(node * 2 + 2, mid + 1, end, idx, val);
      }
      this.tree[node] = this.tree[node * 2 + 1] + this.tree[node * 2 + 2];
    }
  }

  query(node, start, end, left, right) {
    if (right < start || left > end) {
      return 0;
    } else if (left <= start && right >= end) {
      return this.tree[node];
    } else {
      const mid = Math.floor((start + end) / 2);
      const sumLeft = this.query(node * 2 + 1, start, mid, left, right);
      const sumRight = this.query(node * 2 + 2, mid + 1, end, left, right);
      return sumLeft + sumRight;
    }
  }
}

// Usage:
// const nums = [1, 3, 5, 7, 9, 11];
// const segTree = new SegmentTree(nums);
// console.log(segTree.query(0, 0, nums.length - 1, 1, 3)); // 15
// segTree.update(0, 0, nums.length - 1, 2, 6);
// console.log(segTree.query(0, 0, nums.length - 1, 1, 3)); // 16