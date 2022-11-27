/*
 * @lc app=leetcode.cn id=40 lang=javascript
 *
 * [40] 组合总和 II
 */

// @lc code=start
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
    candidates.sort((a, b) => a - b)
    const sizes = [1]
    let j = 0
    for(let i = 1; i < candidates.length; i++){
        if(candidates[i] === candidates[i - 1]){
            sizes[j] += 1
        }else {
            candidates[++j] = candidates[i]
            sizes[j] = 1
        }
    }
    candidates.length = j + 1

    const ans = []
    function combinationSum(i, target, curAns){
        if(target === 0){
            ans.push(curAns)
            return
        }

        if(i >= candidates.length || target < candidates[i]){
            return
        }

        for(let k = sizes[i], v = candidates[i]; k >= 0; k--){
            if(k * v <= target){
                const kv = new Array(k).fill(v) 
                combinationSum(i + 1, target - k * v, curAns.concat(kv))
            }
        }
    }

    combinationSum(0, target, [])
    return ans
    // const dp = new Array(target + 1).fill([])
    // dp[0] = [[]]

    // for(let i = 0; i < candidates.length; i++){
    //     const v = candidates[i], size = sizes[i]
    //     for(let j = target; j >= v; j--){
    //         let res =  dp[j]
    //         for(let k = size; k > 0; k--){
    //             if(k * v <= j){
    //                 const kv = new Array(k).fill(v)
    //                 res = res.concat(dp[j - k * v].map(x => x.concat(kv)))
    //             }
    //         }

    //         dp[j] = res
    //     }
    // }

    // return dp[target]
};
// @lc code=end


// @after-stub-for-debug-begin
module.exports = combinationSum2;
// @after-stub-for-debug-end