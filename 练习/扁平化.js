function myFlat(arr) {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] instanceof Array) {
      res = res.concat(myFlat(arr[i]));
    } else {
      res.push(arr[i]);
    }
  }
  return res;
}
const arr = [1, [2, [3, [4]]]];
console.log(myFlat(arr));
const arr2 = arr.flat(Infinity);
console.log(arr2);
