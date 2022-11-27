/*
 * @lc app=leetcode.cn id=72 lang=javascript
 *
 * [72] 编辑距离
 */

// @lc code=start
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function(word1, word2) {
  /**
        minDistance(i, j) = min( 
            minDistance(i - 1, j) + 1, // Del
            minDistance(i - 1, j - 1) + 0, // 相等 | update
            minDistance(i, j - 1) + 1, // Insert
        )
     */

        const r = word1.length + 1, c = word2.length
        const dp = Array.from({
            length: r
        }, () => new Array(c).fill(1))
    
        for(let i=1; i< r; i++){
            for(let j=1; j< c; j++){
                if(word1[i] == word2[j]){
                    dp[i][j] = dp[i - 1][j - 1]
                }else{
                    dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])  + 1
                }
            }
        }

        function printPath(dp, i, j){
            if(i == 0 && j === 0){
              return
            } 
          
            if(word1[i] == word2[j]){
                printPath(dp, i - 1, j - 1)
            }else if(dp[i - 1][j] === dp[i][j]) {
                printPath(dp, i - 1, j)
                console.log('Del: ', word1[i - 1])
            }
           
          }

        return dp[r][c]
};
// @lc code=end


// @after-stub-for-debug-begin
module.exports = minDistance;
// @after-stub-for-debug-end