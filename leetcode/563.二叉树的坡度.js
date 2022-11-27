/*
 * @lc app=leetcode.cn id=563 lang=javascript
 *
 * [563] 二叉树的坡度
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var findTilt = function(root) {
    function _findTilt(node) {
        if(!node){
            return [0, 0]
        }

        const l = _findTilt(node.left)
        const r = _findTilt(node.right)
        return [
            Math.abs(l[1] - r[1]) + l[0] + r[0], 
            l[1] + node.val + r[1]
        ]
    }

    const ret = _findTilt(root)
    return ret[0]
};
// @lc code=end


// @after-stub-for-debug-begin
module.exports = findTilt;
// @after-stub-for-debug-end