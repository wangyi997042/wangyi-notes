function sortArr(arr) {
  for (let i = 0; i < arr.length - 1; i++) {

    for (let j = 0; j < arr.length; i++) {
      if (arr[j] > arr[j + 1]) {
        const ele = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = arr[j]
      }
    }
  }
}

let arr = [3, 4, 5, 6, 7, 3, 2, 2, 2, 344, 233]
sortArr(arr)
console.log(arr);