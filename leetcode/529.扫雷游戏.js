/*
 * @lc app=leetcode.cn id=529 lang=javascript
 *
 * [529] 扫雷游戏
 */

// @lc code=start
/**
 * @param {character[][]} board
 * @param {number[]} click
 * @return {character[][]}
 */
var updateBoard = function(board, click) {
    const dirs = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], [0, 1],
        [1, -1], [1, 0], [1, 1],
    ]
    const n = board.length, m = board[0].length

    function getPoint(x, y) { 
        if(x < 0 || x >= n || y < 0 || y >= m){
            return ''
        }

        return board[x][y]
    }

    function revelMine(x, y){
        if(x < 0 || x >= n || y < 0 || y >= m){
            return ''
        }

        switch(board[x][y]){
            case 'M': {
                board[x][y] = 'X'
                break
            }
            case 'E': {
                board[x][y] = 'B'
                let mine = 0
                for(const dir of dirs){
                    if(getPoint(x + dir[0] , y + dir[1]) === 'M'){
                        mine++
                    }
                }

                if(mine > 0){
                    board[x][y] = mine.toString()
                }else {
                    for(const dir of dirs){
                        revelMine(x + dir[0] , y + dir[1])
                    }
                }
            }
        }
    }
  
    revelMine(click[0], click[1])
    return board
};
// @lc code=end


// @after-stub-for-debug-begin
module.exports = updateBoard;
// @after-stub-for-debug-end