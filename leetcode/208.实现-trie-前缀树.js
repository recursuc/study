/*
 * @lc app=leetcode.cn id=208 lang=javascript
 *
 * [208] 实现 Trie (前缀树)
 */

// @lc code=start

var Trie = function() {
    this.dic = {}
};

/** 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
    let root = this.dic
    for(const chr of word){
      if(!root[chr]){
          root[chr] = {}
      }
  
      root = root[chr]
    }
  
    root.val = (root.val || 0 ) + 1
    return null
};

/** 
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word) {
    let root = this.dic
    for(const chr of word){
      if(!root || !root[chr]){
          return false
      }
  
      root = root[chr]
    }
  
    return root && root.val > 0
};

/** 
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
    let root = this.dic
    for(const chr of prefix){
      if(!root || !root[chr]){
          return false
      }
  
      root = root[chr]
    }

    return !!root
};

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
// @lc code=end


// @after-stub-for-debug-begin
module.exports = Trie;
// @after-stub-for-debug-end