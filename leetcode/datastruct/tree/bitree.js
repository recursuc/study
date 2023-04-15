// This is a binary indexed tree implementation in JavaScript
// It is also known as a Fenwick tree
// In Chinese, it is called 二进制索引树

class BinaryIndexedTree {
  constructor(nums) {
    this.nums = nums;
    this.tree = new Array(nums.length + 1).fill(0);
    for (let i = 0; i < nums.length; i++) {
      this.update(i, nums[i]);
    }
  }

  update(i, val) {
    i++;
    while (i <= this.nums.length) {
      this.tree[i] += val;
      i += i & -i;
    }
  }

  sumRange(i, j) {
    return this.getPrefixSum(j) - this.getPrefixSum(i - 1);
  }

  getPrefixSum(i) {
    let sum = 0;
    i++;
    while (i > 0) {
      sum += this.tree[i];
      i -= i & -i;
    }
    return sum;
  }
}

// Example usage:
// const nums = [1, 3, 5];
// const bit = new BinaryIndexedTree(nums);
// console.log(bit.sumRange(0, 2)); // Output: 9