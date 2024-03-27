// 斐波那契数列 f(n) = f(n-1) + f(n-2)
function fibo(n) {
  if (n <= 0) return -1;
  if (n === 1) return 0;
  if (n === 2) return 1;
  return fibo(n - 1) + fibo(n - 2);
}
console.log(fibo(7));

// 青蛙跳台阶问题
// 青蛙每次能跳一级或两级台阶，返回跳上n级台阶有多少种方法
// 青蛙在n级台阶前，一定在n-1级或n-2级，即两种方法加起来的和为答案，类似于斐波那契数列
// f(n) = f(n-1) + f(n-2)
function jump(n) {
  if (n <= 0) return -1;
  if (n === 1) return 0;
  if (n === 2) return 1;
  return fibo(n - 1) + fibo(n - 2);
}

// 跳台阶进阶
// 青蛙每次能跳一级或两级台阶或n级
// f(n) = f(n-1) + f(n-2) + ... + f(2) + f(1) + f(0)
function jump2(n) {
  if (n <= 0) return -1;
  if (n === 1) return 0;
  if (n === 2) return 1;
  let result = 0;
  for (let i = 1; i < n; i++) {
    result += jump(n - 1);
  }
  return result + 1; // +1表示直接跳n级的情况
}
