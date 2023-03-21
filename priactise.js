

function quickSort(arr) {

  if (arr.length <= 1) {
    return arr
  }

  let pivot = arr[0],
    left = [],
    right = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return [...quickSort(left), pivot, ...quickSort(right)]
}

var arr = [9, 3, 10, 6, 2, 8];
console.log(quickSort(arr));
