/*
 * @lc app=leetcode.cn id=22 lang=javascript
 *
 * [22] 括号生成
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    const ret = []
    function _generateParenthesis(str, open, close) {
        if(open === n && close === n){
            ret.push(str)
            return
        }

        if(open < n){
            _generateParenthesis(str + '(', open + 1, close) 
        }
        
        if(close < open){
            _generateParenthesis(str + ')', open, close + 1) 
        }
    }

     _generateParenthesis('', 0, 0)
     return ret
};
// @lc code=end


// @after-stub-for-debug-begin
module.exports = generateParenthesis;
// @after-stub-for-debug-end