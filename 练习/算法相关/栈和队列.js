// 栈
// 先入后出, 类比箱子放东西
function Stack() {
  this.arr = [];
  this.push = function (value) {
    this.arr.push(value);
  };
  this.pop = function (value) {
    return this.arr.pop();
  };
}

var stack = new Stack();
stack.push(1);
stack.push(2);
console.log(stack);
stack.pop();
console.log(stack);

// 队列
// 先入先出， 类比管道
function Queue() {
  this.arr = [];
  this.push = function (value) {
    this.arr.push(value);
  };
  this.pop = function () {
    return this.arr.shift();
  };
}
