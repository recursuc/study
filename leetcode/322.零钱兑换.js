/*
 * @lc app=leetcode.cn id=322 lang=javascript
 *
 * [322] 零钱兑换
 */

// @lc code=start
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
 var coinChange = function(coins, amount) {
    const [m, n] = [coins.length, amount + 1]
    const dp = Array.from({ length: m}, () => Array.from({ length: n }, () => -1))
  //   for(let i=0; i< n;i++){
  //       dp[0][i] = -1
  //   }
  
    for(let i=0; i< m;i++){
        dp[i][0] = 0
    }
  
    for(let i = 0; i< m; i++){
      for(let j = 1; j < n; j++){
          let min = -1
          for(let k = 0; k <= i; k++){
              const remainder = j - coins[k]
              if(remainder >= 0){
                  const v = dp[k][remainder]
                  if(v > -1){
                    min = min == -1 ? v + 1 : Math.min(v + 1, min) 
                  }
              }
          }
          dp[i][j] = min
      }
    }
  
    return dp[m-1][n - 1]
  };
// @lc code=end


// @after-stub-for-debug-begin
module.exports = coinChange;
// @after-stub-for-debug-end