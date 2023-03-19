
/*
1.冒泡排序

    // 冒泡排序(从小到大)
    function sortArr (arr) {
        // 控制循环多少次
        for (let i = 0; i < arr.length-1; i++) {
            // 控制比较
            for (let j = 0; j < arr.length; j++) {
                // 一次循环中，如果前者大于后者就交换位置，所以第一次循环最大的就在最后
                if (arr[j] > arr[j+1]) {
                    // 交换位置
                    const element = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = element
                }
            }
        }
    }
    
    var arr = [9,3,10,6,2,8];
    sortArr(arr);
    console.log(arr)// ;[2,3,6,8,9,10]

*/


/*
2. 使用sort方法


  function sortArray(m,n) {
      if (m > n) {
          return 1
      } else if (m < n) {
          return -1
      } else {
          return 0
      }
  }
  var arr = [9,3,10,6,2,8];
  arr.sort(sortArray);// [2,3,6,8,9,10]

*/


/*
3、插入排序

  // 插入排序
  function insertSort(arr) {
      let arr_new = [arr[0]];
      for (let i = 1; i < arr.length; i++) {
          // 插入多少次
          arr_new.push(arr[i]);
          // 排序只需要循环length-1次
          for (let j = 0;j < arr_new.length - 1;j++){
              // 每次插入要做的事情
              if (arr_new[arr_new.length-j-1] < arr_new[arr_new.length-j-2]){
                  // 交换位置
                  var arrTem = arr_new[arr_new.length-j-2];
                  arr_new[arr_new.length-j-2] = arr_new[arr_new.length-j-1];
                  arr_new[arr_new.length-j-1] = arrTem;
              }
          }
      }
      return arr_new
  }
  var arr = [9,3,10,6,8,10]
  console.log(insertSort(arr))

*/

/*
4.快速排序

// ! 方法1
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  var pivot = arr[0];
  var left = [];
  var right = [];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
};
const arr = [3, 5, 2, 1, 4, 6, 6, 7, 8, 9]
const result = quickSort(arr);
console.log(result)

*/



