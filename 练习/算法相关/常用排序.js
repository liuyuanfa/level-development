var arr = [4, 1, 6, 9, 3, 2, 8, 7, 5];

// 冒泡排序
// 每次循环比较左右两个数的大小，把小的放左边，最终一次循环结束，把最大的数放到了最右边
function bubbleSort(arr) {
  // if (Object.prototype.toString.call(arr) !== "[object Array]") return;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
}
// bubbleSort(arr);
// console.log(arr);

// 选择排序
// 内层循环，每一次循环找出一个最大的，放在最右边
function chooseSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let maxIndex = 0;
    for (let j = 0; j < arr.length - i; j++) {
      if (arr[j] > arr[maxIndex]) {
        maxIndex = j;
      }
    }
    [arr[maxIndex], arr[arr.length - 1 - i]] = [
      arr[arr.length - 1 - i],
      arr[maxIndex],
    ];
  }
}
// chooseSort(arr);
// console.log(arr);

// 快速排序
// 找出基准点，比基准点小的放左边，比基准点大的放右边
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  let midIndex = Math.floor(arr.length / 2);
  let mid = arr[midIndex];
  let left = [];
  let right = [];
  for (let i = 0; i < arr.length; i++) {
    if (i === midIndex) {
      continue;
    }
    if (arr[i] < mid) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return [...quickSort(left), mid, ...quickSort(right)];
}
console.log(quickSort([5, 8, 2, 4, 9, 3, 1, 6, 7]));
