/*
 * @lc app=leetcode.cn id=46 lang=javascript
 *
 * [46] 全排列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
  const ans = []
  const length = nums.length

  function permute(i){
    if(i === length){
        ans.push(nums.slice())
        return
    }

    for(let j = i; j < length; j++){
        [nums[i],  nums[j]] = [nums[j],  nums[i]];
        permute(i + 1);
        [nums[i],  nums[j]] = [nums[j],  nums[i]];
    }
  }

  permute(0)
  return ans
};
// @lc code=end


// @after-stub-for-debug-begin
module.exports = permute;
// @after-stub-for-debug-end