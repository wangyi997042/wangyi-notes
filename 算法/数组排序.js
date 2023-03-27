
/*
  冒泡排序(Bubble Sort)：通过比较相邻元素的大小，逐步把最大的元素交换到数组的最后面，实现从小到大排序。

  选择排序(Selection Sort)：每次找出未排序部分中的最小元素，将其放到已排序部分的末尾，实现从小到大排序。

  插入排序(Insertion Sort)：从未排序部分依次取出元素，将其插入到已排序部分的合适位置，实现从小到大排序。

  快速排序(Quick Sort)：选择一个基准元素，把数组中比基准元素小的放在它左边，比它大的放在右边，然后对左右两个子数组递归地进行快速排序，最终得到有序的数组。

  归并排序(Merge Sort)：将数组分成两个子数组，对每个子数组进行归并排序，然后将排好序的子数组合并成一个有序的数组，实现从小到大排序。
*/



/*
1.冒泡排序
    var arr = [9,3,10,6,2,8];
    sortArr(arr);
    console.log(arr)// ;[2,3,6,8,9,10]
*/

// 方法一
// 冒泡排序(从小到大)
function bubbleSort1(arr) {
  // 控制循环多少次
  for (let i = 0; i < arr.length - 1; i++) {
    // 控制比较
    for (let j = 0; j < arr.length; j++) {
      // 一次循环中，如果前者大于后者就交换位置，所以第一次循环最大的就在最后
      if (arr[j] > arr[j + 1]) {
        // 交换位置
        const element = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = element;
      }
    }
  }
}
// 方法二
function bubbleSort(arr) {
  // 外层循环，控制循环次数，从第一个元素开始到倒数第二个元素结束
  for (let i = 0; i < arr.length - 1; i++) {
    // 内层循环，控制比较的次数，从第一个元素开始到倒数第二个未排好序的元素结束
    for (let j = 0; j < arr.length - 1 - i; j++) {
      // 如果当前元素大于下一个元素，就交换它们的位置
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  // 返回排好序的数组
  return arr;
}


/*
2. 使用sort方法
  var arr = [9,3,10,6,2,8];
  arr.sort(sortArray);// [2,3,6,8,9,10]

*/
function sortArray(m, n) {
  if (m > n) {
    return 1
  } else if (m < n) {
    return -1
  } else {
    return 0
  }
}

/*
3、插入排序
  var arr = [9,3,10,6,8,10]
  console.log(insertSort(arr))
*/

// 插入排序
function insertSort(arr) {
  let arr_new = [arr[0]];
  for (let i = 1; i < arr.length; i++) {
    // 插入多少次
    arr_new.push(arr[i]);
    // 排序只需要循环length-1次
    for (let j = 0; j < arr_new.length - 1; j++) {
      // 每次插入要做的事情
      if (arr_new[arr_new.length - j - 1] < arr_new[arr_new.length - j - 2]) {
        // 交换位置
        var arrTem = arr_new[arr_new.length - j - 2];
        arr_new[arr_new.length - j - 2] = arr_new[arr_new.length - j - 1];
        arr_new[arr_new.length - j - 1] = arrTem;
      }
    }
  }
  return arr_new
}

/*
4.快速排序
const arr = [3, 5, 2, 1, 4, 6, 6, 7, 8, 9]
const result = quickSort(arr);
console.log(result)
*/
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

/*
  5、选择排序
*/
function selectionSort(arr) {
  // 外层循环，从数组的第一个元素开始遍历，循环到数组的倒数第二个元素
  for (let i = 0; i < arr.length - 1; i++) {
    // 假设当前循环到的元素是最小的
    let minIndex = i;
    // 内层循环，从当前元素的下一个元素开始遍历，直到数组的最后一个元素
    for (let j = i + 1; j < arr.length; j++) {
      // 如果遍历到的元素比当前假设的最小元素还小，就把最小元素的下标设为当前遍历到的元素的下标
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    // 如果当前假设的最小元素不是真正的最小元素，则把它和真正的最小元素交换位置
    if (minIndex !== i) {
      [arr[minIndex], arr[i]] = [arr[i], arr[minIndex]];
    }
  }
  // 返回排好序的数组
  return arr;
}

/*
  6、归并排序
*/

/**

归并排序函数
@param {Array} arr - 待排序的数组
@returns {Array} - 排序后的数组
*/
function mergeSort(arr) {
  // 递归结束条件：数组长度为1时
  if (arr.length <= 1) {
    return arr;
  }
  // 将数组分为两个部分
  const mid = Math.floor(arr.length / 2); // 取得数组的中间索引
  const left = arr.slice(0, mid); // 左半部分
  const right = arr.slice(mid); // 右半部分

  // 递归对两个部分进行排序和合并
  return merge(mergeSort(left), mergeSort(right));
}

/**  
合并两个有序数组
@param {Array} left - 左侧有序数组
@param {Array} right - 右侧有序数组
@returns {Array} - 合并后的有序数组
*/
function merge(left, right) {
  const result = []; // 存放合并后的有序数组
  let leftIndex = 0; // 左半部分的索引
  let rightIndex = 0; // 右半部分的索引
  // 合并两个有序数组
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]); // 将左侧数组的元素添加到结果数组中
      leftIndex++; // 左侧索引+1
    } else {
      result.push(right[rightIndex]); // 将右侧数组的元素添加到结果数组中
      rightIndex++; // 右侧索引+1
    }
  }

  // 将剩余的元素添加到结果数组中
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}
