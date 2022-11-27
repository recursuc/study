/*
 * @lc app=leetcode.cn id=10 lang=javascript
 *
 * [10] 正则表达式匹配
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
	const sLen = s.length, pLen = p.length;

	function matchChar(i, j) {
		if(i === sLen && j === pLen){
			return true
		}

		if (j < pLen) {
			if (j + 1 < pLen && p[j + 1] == "*") {
				return matchStar(p[j], i, j + 2);
			}

			if (i < sLen) {
				if (p[j] == "." || s[i] == p[j]) {
					return matchChar(i + 1, j + 1);
				}
			}	
		}

		return false;
	}

	function matchStar(c, i, j) {
		while (i < sLen) {
			let match = matchChar(i, j);
			if (match) {
				return true;
			}

			if (c == '.' || s[i] == c) {
				i++;
			} else {
				return false;
			}
		}

		return matchChar(i, j);
	}

	const ret = matchChar(0, 0);
	return ret;
};
// @lc code=end

// @after-stub-for-debug-begin
module.exports = isMatch;
// @after-stub-for-debug-end
