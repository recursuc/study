/*
 * @lc app=leetcode.cn id=47 lang=javascript
 *
 * [47] 全排列 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function(nums) {
    const ans = []
    const length = nums.length
    const vis = []
    nums.sort((a, b) => a - b)

    function permute(i, cur){
      if(i === length){
          ans.push(cur)
          return
      }
  
      const cvis = []
      for(let j = 0; j < length; j++){
          if(!vis[j] && (
                j === 0 || nums[j - 1] !== nums[j] || cvis[j - 1]
              )
            ){
              vis[j] = 1
              cvis[j] = 1
              permute(i + 1, cur.concat(nums[j]));
              vis[j] = 0
          }
      }
    }
  
    permute(0, [])
    return ans
};
// @lc code=end

permuteUnique([1, 2, 2, 2, 2])
// @after-stub-for-debug-begin
module.exports = permuteUnique;
// @after-stub-for-debug-end