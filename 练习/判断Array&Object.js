// 判断array 等同于Array.isArray()方法
function checkArray(value) {
  return Object.prototype.toString.call(value) === "[object Array]";
}
console.log(checkArray([1]));

console.log(Object.prototype.toString.call(function () {}));
console.log(Object.prototype.toString.call({ a: 1 }));
console.log(Object.prototype.toString.call([1]));

function A() {
  console.log(Object.prototype.toString.call({ arguments }));
}
A();

function checkObject(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}
console.log(checkObject({ a: 1 }));
