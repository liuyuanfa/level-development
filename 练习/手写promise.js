class myPromise {
  constructor(executor) {
    this.status = "pending"; // 状态
    this.value = undefined; // 成功的值
    this.reason = undefined; // 失败的值
    this.onFulfilledCallbacks = []; // 成功后处理函数队列
    this.onRejectedCallbacks = []; // 失败后处理函数队列

    const resolve = (value) => {
      if (this.status === "pending") {
        this.status = "fulfilled";
        this.value = value;
        this.onFulfilledCallbacks.forEach((callback) => callback());
      }
    };

    const reject = (value) => {
      if (this.status === "pending") {
        this.status = "rejected";
        this.reason = value;
        this.onRejectedCallbacks.forEach((callback) => callback());
      }
    };

    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onFulfilled, onRejected) {
    // 判断传入的是否为函数
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (val) => val;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };

    // 创建一个新的promise，用于then方法的返回值
    const promise2 = new myPromise((resolve, reject) => {
      if (this.status === "fulfilled") {
        // 使用settimeout模仿异步调用
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            // 使用返回值x和新的Promise实例promise2来处理resolve和reject
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      } else if (this.status === "rejected") {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      } else if (this.status === "pending") {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
      }
    });

    return promise2;
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError("防止回调地狱"));
  }
  // 标记是否已调用，防止多次调用
  let called = false;
  if (x instanceof myPromise) {
    x.then(
      (y) => resolvePromise(promise2, y, resolve, reject),
      (reason) => reject(reason)
    );
  } else if (x !== null && (typeof x === "object" || typeof x === "function")) {
    try {
      const then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            // 成功回调
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (reason) => {
            // 失败回调
            if (called) return;
            called = true;
            reject(reason);
          }
        );
      } else {
        resolve(x); // then不是函数，直接返回
      }
    } catch (error) {
      if (called) return;
      called = true;
      reject(error);
    }
  } else {
    // x不是对象或函数
    resolve(x);
  }
}
