


class Node{
    words = new Map();
    count = 0;
    fail = null

    insertWord(word) {
        let node = root;
        
        for(const char of word){
            let childNode = node.words.get(char)

            if(!childNode){
                childNode = new Node()
                node.words.set(char, childNode)
            }
            
            node = childNode
        }
    
        childNode.count++
    }
}

const root = new Node()

function buildFail(words, k) {
   root.fail = root
   const queue = []

   for(const child of root.words.values()){
        child.fail = root

        queue.push(child)
   }  

   while(queue.length){
      const {words, fail} = queue.shift()
      
      for(const key of words.keys()){
          const child = words.get(key)

          let failNode = fail
          while(!failNode.words.get(key) && failNode !== root){
            failNode = failNode.fail
          }

          child.fail = failNode.words.get(key) || root
          
          queue.push(child)
      }
   }
}
  

function searchWords(text, k) {
    let node = root
   
    for(const chr of text){
       while(!node.words.get(chr) && node != root){
          node = node.fail
       }

       if(node.words.get(chr)){
          node = node.words.get(chr)

          if(node.count > 0){
            console.log(next)
          }
       } else {
          node = root
       }
    }  
}
 
const keywords = ["he", "she", "hers", "his"]
const text = "ahishers";
searchWords(keywords, patterns.length, text); 