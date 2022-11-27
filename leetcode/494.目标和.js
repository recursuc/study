/*
 * @lc app=leetcode.cn id=494 lang=javascript
 *
 * [494] 目标和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
 var findTargetSumWays = function(nums, target) {
    function _findTargetSumWays(target, i){
        if(i >= nums.length){
            if(target === 0){
                return 1
            }

            return 0
        }

        return _findTargetSumWays(target + nums[i], i+1) + _findTargetSumWays(target - nums[i], i+1)
    }
  
    return  _findTargetSumWays(target, 0)
};
// @lc code=end


// @after-stub-for-debug-begin
module.exports = findTargetSumWays;
// @after-stub-for-debug-end