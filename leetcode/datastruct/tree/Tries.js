function binarySearchGE(list, v){
  let low = 0, high = list.length - 1

  while(low <= high){
    const middle = low + ((high - low) >> 1)
      const m = list[middle]

      if(m >= v){
         high = middle - 1 
      }else {
         low = middle + 1
      }
  }

  return low < list.length ? low : -1
}

function binarySearchLE(list, v){
    let low = 0, high = list.length - 1
  
    while(low <= high){
        const middle = low + ((high - low) >> 1)
        const m = list[middle]
  
        if(m < v){
            low = middle + 1
        }else {
            high = middle - 1 
        }
    }

    return high
}

const ll = [1, 3, 5, 7, 7, 7, 9, 10, 11]
console.log(binarySearchLE(ll,7))