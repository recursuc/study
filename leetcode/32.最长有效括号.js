/*
 * @lc app=leetcode.cn id=32 lang=javascript
 *
 * [32] 最长有效括号
 */

// @lc code=start
/**
 * @param {string} s "()(())"
 * @return {number}
 */
var longestValidParentheses = function(s) {
    const stack = [0]
    let max = 0

    for(let i = 0; i< s.length; i++){
        const chr = s[i]
        let top = stack[stack.length - 1]

        if(chr === ')'){
            if(top + 1 === 0){
                stack.pop()
                top = stack[stack.length - 1]
                if(top > 0){
                    stack.pop()
                    top = top + 2
                }
            
                stack.push(top)
                max = Math.max(max, top)
            }
        }else {
            stack.push(-1)
        }
    }

    return max
/* 
    const dp = Array.from({ length: s.length + 1 }, () => 0)
    let prevChar = '', max = 0, current = 0
    
    for(let i = 0; i< s.length; i++){
        const chr = s[i]
        
        if(chr === ')'){
           if(prevChar === ')'){
                const prevDp = dp[i - 1]
                if(prevDp){
                    const j = i - prevDp - 1
                    const parens = s[j]
                    if(parens === '('){
                        dp[i] = 2 + prevDp + (j > 0 ? dp[j - 1] : 0)
                    }
                }
           }else if(prevChar === '('){
               dp[i] = 2 + (i - 2 >= 0 ? dp[i - 2] : 0 )
           }
           
           max = Math.max(max, dp[i])
        }

        prevChar = chr
    }

    return max 
*/
};
// @lc code=end


// @after-stub-for-debug-begin
module.exports = longestValidParentheses;
// @after-stub-for-debug-end