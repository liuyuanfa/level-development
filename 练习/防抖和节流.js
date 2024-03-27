// 防抖
// n秒后再执行该事件，如果在这n秒内被触发了，则重新开始计时
// 示例：输入框联想功能、频繁点击的按钮事件、浏览器滚动事件、缩放浏览器resize事件
function debounce(fn, delay = 1000) {
  let time = null;
  return function () {
    if (time !== null) {
      clearTimeout(time);
    }
    time = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  };
}

// 增加入参，判断第一次是否立即执行
function debounce2(fn, delay = 1000, immediate = false) {
  let time = null;
  let isImmediate = false;
  return function () {
    if (time !== null) {
      clearTimeout(time);
    }

    // 第一次触发
    if (!isImmediate && immediate) {
      fn.apply(this, arguments);
      isImmediate = true;
    }

    time = setTimeout(() => {
      fn.apply(this, arguments);
      isImmediate = false;
    }, delay);
  };
}

// 节流
// n秒内只运行一次，若在n秒内被重复触发，只有一次生效。
// 滚动加载，加载更多或滚到底部监听

function throttle(fn, delay) {
  let flag = true;
  return function () {
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      flag = true;
    }, delay);
  };
}

function throttle2(fn, delay) {
  let lastTime = 0;
  return function () {
    const now = new Date().getTime();
    if (now - lastTime >= delay) {
      fn.apply(this, arguments);
      lastTime = now;
    }
  };
}
