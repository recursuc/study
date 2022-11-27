/*
 * @lc app=leetcode.cn id=879 lang=javascript
 *
 * [879] 盈利计划 10\n5\n[2,3,5]\n[6,7,8]
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number} minProfit
 * @param {number[]} group
 * @param {number[]} profit
 * @return {number}
 */
var profitableSchemes = function(n, minProfit, group, profit) {
    const dp = Array.from({
        length: n + 1
    }, () => [0, 0])

    for(let i = 0; i < group.length; i++){
        const w = group[i]
        for(let j = n; j >= w; j--){
            const [lastV, lastAns] = dp[j]
            const val = Math.max(lastV, dp[j - w][0] + profit[i])
            dp[j] = [val, val > lastV && val >= minProfit ? lastAns + 1 : lastAns]
        }
    }


    return dp[n][1] % (10 ** 9 + 7)
};
// @lc code=end


// @after-stub-for-debug-begin
module.exports = profitableSchemes;
// @after-stub-for-debug-end