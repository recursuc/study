/*
 * @lc app=leetcode.cn id=377 lang=javascript
 *
 * [377] 组合总和 Ⅳ
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var combinationSum4 = function(nums, target) {
    const dp = new Array(target + 1).fill(0)
    dp[0] = 1

    for(let j = 1; j <= target; j++){
        let v = dp[j]
        for(const num of nums){
            if(num <= j){
                v += dp[j -num]
            }
        }

        dp[j] = v
    }

    return dp[target]
};
// @lc code=end


// @after-stub-for-debug-begin
module.exports = combinationSum4;
// @after-stub-for-debug-end