function findMaxSubArraySum(arr) {
  if (arr.length === 0) return 0;
  let subArraySum = arr[0]; // 初始子数列最大和为第一个元素
  let maxSum = arr[0]; // 相连子数列最大和
  for (let i = 0; i < arr.length; i++) {
    subArraySum = Math.max(arr[i], arr[i] + subArraySum);
    maxSum = Math.max(subArraySum, maxSum);
  }
  return maxSum;
}
const arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
console.log(findMaxSubArraySum(arr));
