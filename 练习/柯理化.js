// 实现 add(1)(2)(3)  =>  6
function add(x) {
  return function (y) {
    if (typeof y === "undefined") {
      return x;
    } else {
      return add(x + y);
    }
  };
}
function add(x) {
  // let args = [].slice.call(arguments)
  // console.log(args)
  return function (y) {
    if (typeof y === "undefined") {
      return x;
    } else {
      return add(x + y);
    }
  };
}
console.log(add(1)(2));

// 柯理化封装
function curry(fn) {
  console.log(fn.length, "fn");
  return function curried() {
    let args = Array.prototype.slice.call(arguments),
      context = this;
    return args.length >= fn.length
      ? fn.apply(context, args)
      : function () {
          let rest = [].slice.call(arguments);
          return curried.apply(context, args.concat(rest));
        };
  };
}
function add(a, b, c) {
  return a + b + c;
}
const curryAdd = curry(add);
console.log(curryAdd(1)(2, 3));

// newAdd(1,2,3)(10) //16
// newAdd(1)(2)(3,4)(5) //15
function newAdd() {
  console.log(newAdd.length, "length");
  var args = Array.prototype.slice.call(arguments);
  console.log(args, "arg");
  return function () {
    var sub_arg = Array.prototype.slice.call(arguments);
    console.log(sub_arg, "sub_arg");
    if (sub_arg.length) {
      return newAdd.call(null, args.concat(sub_arg));
    } else {
      const sum = args.reduce((a, b) => {
        return a + b;
      });
      console.log(sum, "sum");
      return sum;
    }
  };
  // fn.valueOf = function () {
  //   return args.reduce((a, b) => {
  //     return a + b;
  //   });
  // };
  // return fn;
}
console.log(newAdd(1, 2, 3)(10));
function add() {
  var args = Array.prototype.slice.call(arguments);

  var fn = function () {
    var sub_arg = Array.prototype.slice.call(arguments);
    // 把全部的参数聚集到参数的入口为一个参数： args.concat(sub_arg)
    return add.apply(null, args.concat(sub_arg));
  };

  fn.valueOf = function () {
    return args.reduce(function (a, b) {
      return a + b;
    });
  };

  return fn;
}
console.log(add(1, 2, 3)(10));
