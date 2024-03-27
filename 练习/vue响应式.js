// 将对象变成可观察对象
function observe(obj) {
  for (const key in obj) {
    let internalVal = obj[key];
    let func = new Set();
    Object.defineProperty(obj, key, {
      get: function () {
        // 依赖收集， 记录谁用了该属性
        if (window.__func && !func.has(window.__func)) {
          func.add(window.__func);
        }
        return internalVal;
      },
      set: function (val) {
        internalVal = val;
        // 更新依赖，使用了该属性的方法自动调用
        for (let fn of func) {
          fn();
        }
      },
    });
  }
}

// 需要调用的函数包装一遍，方便依赖收集
function autorun(fn) {
  window.__func = fn;
  fn();
  window.__func = null;
}

const user = {
  name: "张三",
};
observe(user);
function getFirstName(name) {
  return name.subString(0, 1);
}
autorun(getFirstName);
