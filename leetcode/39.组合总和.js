/*
 * @lc app=leetcode.cn id=39 lang=javascript
 *
 * [39] 组合总和
 */

// @lc code=start
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
    const dp = new Array(target + 1).fill([])
    dp[0] = [[]]

    for(let i = 0; i < candidates.length; i++){
        const v = candidates[i]
        for(let j = v; j <= target; j++){
          dp[j] = dp[j].concat(dp[j - v].map(x => x.concat(v)))
        }
    }

    return dp[target]
};
// @lc code=end


// @after-stub-for-debug-begin
module.exports = combinationSum;
// @after-stub-for-debug-end