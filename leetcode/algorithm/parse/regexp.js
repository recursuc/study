
function parse(reg, i){
  let left = null

  while(i < reg.length){
    const chr = reg[i]
    
    if(/[a-zA-Z1-9_.]/.test(chr)){
        const right = { type:'C', value: chr }
        if(left){
            left = { type:'And', left, right };
        }else {
            left = right
        }
    }else if(chr === '|'){
        const res = parse(reg, i + 1)
        const right = res[0]
        i = res[1]
        
        left = {
            type: 'OR',
            left,
            right,
        }

        if(reg[i] === ')'){
            i--
        }
    }else if(chr === '*'){
        left = { type:'Star', left }
    }else if(chr === '('){
        const res = parse(reg, i + 1)
        const right = res[0]
        i = res[1]
        if(left){
            left = { type:'And', left, right };  
        }else {
            left = right
        }
    }else if(chr === ')'){
        return [left, i]
    }

    i++
  }

  return [left, i]
}

// parse('(at|ga|efo)(ag|AAA)*', 0)
const [tree] = parse('(at|ga|efo)a', 0)
console.log(JSON.stringify(tree, null, 4))