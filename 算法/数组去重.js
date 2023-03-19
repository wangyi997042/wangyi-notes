
/*
1. 遍历数组
function unique(array){
  let result = []
  for(let i=0;i<array.length;i++){
    if(result.indexOf(array[i])===-1){ // 数值不存在新数组
      result.push(array[i])
    }
  }
  return result
}
unique([1,2,1,2])  // [1,2]

*/

/*
2. 利用对象键值对

function unique(arrays) {
  let obj = {}, result = [], val, type;
  for (let i = 0; i < arrays.length; i++) {
    val = arrays[i]
    // 相同数值的Number类型 和 String类型，作为对象的key，返回值是一样的，最终都转为string类型查找
    type = typeof val
    if (!obj[val]) {
      obj[val] = [type]
      result.push(val)
    } else if (obj[val].indexOf(type) === -1) { // 
      obj[val].push(type)
      result.push(val)
    }
  }
  return result
}

unique(['1', 1, 1, 2, 3, 2, 3]) // ['1',1,2,3]
*/

/*
3. 先排序，再去重
function unique(arrays){
  let result = [arrays[0]]
  arrays.sort((a,b)=>a-b)

  for(let i=0;i<arrays.length;i++){
    if(arrays[i]!==result[result.length-1]){
      result.push(arrays[i])
    }
  }
  return result
}

unique([1,4,5,7,4]) // [1,4,5,7]

*/

/*
4. 优先遍历数组

function unique(arrays){
  let result = []
  for(let i=0,l=arrays.length;i<arrays.length;i++){
    for(let j=i+1;j<l;j++){
      if(arrays[i]===arrays[j]){
        j = ++i
      }
    }
    result.push(arrays[i])
  }
  return result
}

*/

/*
5. 基于reduce()函数
function unique(arrays){
  let obj = {},type;
  return arrays.reduce(function(preVal,curVal){
    type = typeof curVal
    if(!obj[curVal]){
      obj[curVal] = [type]
      preVal.push(curVal)
    }else if(obj[curVal].indexOf(type)<0){
      obj[curVal].push(type)
      preVal.push(curVal)
    }
    return preVal
  },[])
}

unique([1,2,3,1,2,3,'1'])  //  [1, 2, 3, "1"]
*/

/*
6. 借助es6的Set数据结构

function unique(arrays){ 
  return Array.from(new Set(arrays))
}

*/

/*
7. 借助ES6的Map数据结构

function unique(arrays){
  let map = new Map()
  return arrays.filter(item=> !map.has(item) && map.set(item,1) )
}
*/
