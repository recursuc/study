/*
 * @lc app=leetcode.cn id=698 lang=javascript
 *
 * [698] 划分为k个相等的子集
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var canPartitionKSubsets = function(nums, k) {
    const ret = Array.from({ length: k }).map(() => 0)
    const total = nums.reduce((t, x) => t + x)
    const avg = total / k

    nums.sort()
    if(total % k != 0 || nums[nums.length - 1] > avg){
        return false;
    }

    function distribute(i){
      if(i === nums.length){
         return ret.every(x => x && x === ret[0])   
      } 

      const remain = ret.reduce((r, x) => !x ? r + 1 : r, 0)
      if(remain && nums.length - i < remain){
          return false
      }

      for(let j = 0; j < k; j++){
        ret[j] += nums[i]
        if(ret[j] <= avg && distribute(i + 1)){
            return true
        }
        ret[j] -= nums[i]
      }

      return false
    }

    const r = nums.length > k && k && distribute(0)
    return r
};
// @lc code=end


// @after-stub-for-debug-begin
module.exports = canPartitionKSubsets;
// @after-stub-for-debug-end