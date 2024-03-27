// 嵌套对象拍平
/**
 {
  "key1": "zsq",
    "key2": "zsq2",
    "key3[0]": 1,
    "key3[1]": 2,
    "key3[2]": 3,
    "key3[3]": 4,
    "key3[4]": 5,
    "key3[5].name": "test",
    "key4.child1": "1",
    "key4.child2": "2"
}
 */
let obj = {
  key1: "zsq",
  key2: "zsq2",
  key3: [
    1,
    2,
    3,
    4,
    5,
    {
      name: "test",
    },
  ],
  key4: {
    child1: "1",
    child2: "2",
  },
};
function flatObj(obj) {
  let newObj = {};
  // 递归调用，拍平子项，用新对象记录返回值
  if (typeof obj !== "object") {
    return obj;
  }
  const flat = (obj, path = "") => {
    Object.entries(obj).forEach(([key, value]) => {
      let curPath = Array.isArray(obj)
        ? `${path}[${key}]`
        : `${path ? path + "." : path}${key}`;
      if (typeof value === "object" && value !== null) {
        flat(value, curPath);
      } else {
        newObj[curPath] = value;
      }
    });
  };
  flat(obj);
  return newObj;
}
// const newobj = flatObj(obj);
// console.log(newobj);

// 判断字符串是否闭合
function strIsClose(str) {
  const arr = str.split("");
  const map = {
    "}": "{",
    "]": "[",
    ")": "(",
  };
  const left = ["(", "[", "{"];
  let stack = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (left.includes(item)) {
      stack.push(item);
    } else {
      const match = stack.pop();
      if (map[item] !== match) {
        return false;
      }
    }
  }
  return stack.length === 0;
}
// console.log(strIsClose("([}}])"));

// 根据回调函数合并数组
const mergeArr = (arr, callback) => {
  let res = [];
  let temp = [];
  const length = arr.length;
  arr.forEach((item, index) => {
    const has = callback(item);
    if (has) {
      temp.push(item);
      index === length - 1 && res.push(temp); // 最后一项
    } else {
      temp.length && res.push(temp);
      res.push(item);
      temp = [];
    }
  });
  return res;
};
console.log(mergeArr([1, 2, 3, 4, 5], (item) => item !== 3));
