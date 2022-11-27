/*
 * @lc app=leetcode.cn id=300 lang=javascript
 *
 * [300] 最长递增子序列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
    const dp = new Array(nums.length + 1).fill(0)
    const last = dp.slice()
    let max = 1
    dp[1] = 0

    for(let i = 1; i< nums.length; i++){
        const val = nums[i]
        if(val > dp[max]){
            last[i] = dp[max]
            max++
            dp[max] = i
        }else {
            let low = 1, high = max
            while(low <= high){
                const middle = low + (low + high) >> 1
                const x = nums[middle]

                if(x === val){
                    break
                }else if(x < val){
                    high = middle - 1
                }else {
                    low = middle + 1
                }
            }

            if(val < nums[high]){
                dp[high] = i
                last[i] = high > 0 ? dp[high - 1] : -1
            }
        }
    }
    /*
    let res = []
    for(let i = dp[max]; i > 0; i--){
        res.push(i)
        i = last[i]
    }
    */

    return max
};
// @lc code=end


// @after-stub-for-debug-begin
module.exports = lengthOfLIS;
// @after-stub-for-debug-end