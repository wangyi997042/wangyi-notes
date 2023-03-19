function insertSort(arr) {
  let newArr = [arr[0]]

  for (let i = 1; i < arr.length; i++) {
    newArr.push(arr[i]);
    for (let j = 0; j < arr.length; j++) {
      if (newArr[newArr.length - j - 1] < newArr[newArr.length - j - 2]) {
        const ele = newArr[newArr.length - j - 1];
        newArr[newArr.length - j - 1] = newArr[newArr.length - j - 2];
        newArr[newArr.length - j - 2] = newArr[ele]

      }
    }
  }
  return newArr;
}