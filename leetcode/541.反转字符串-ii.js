/*
 * @lc app=leetcode.cn id=541 lang=javascript
 *
 * [541] 反转字符串 II
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var reverseStr = function(s, k) {
  const len = s.length  
  const group = Math.ceil(len / k)
  let i = 0
  let ns = ''

  while(i < group){
    const sub = s.substring(i * k, Math.min(i * k + k, len))
    if(i & 1){
        ns += sub
    }else {
        ns += sub.split('').reverse().join('')
    }

    i++
  }

  return ns
};
// @lc code=end


// @after-stub-for-debug-begin
module.exports = reverseStr;
// @after-stub-for-debug-end