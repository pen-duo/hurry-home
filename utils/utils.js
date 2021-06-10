function throttle(callback, duration = 500) {
  // 最后执行函数时的时间戳

  let lastTime = 0
  return function () {
    // 获取当前时间戳
    const now = new Date().getTime()
    // 判断当前时间距离上一次执行函数的时间是否超过了duration设定的毫秒数
    if (now - lastTime >= duration) { // 超过了
      // 因为我们需要在 page 中做 this.setData()，所以需要借助 call()
      // 利用 call()方法，实现保留原函数的 this 指向，利用JavaScript的arguments对象实现动态接收参数
      callback.call(this, ...arguments);
      // callback(...arguments)
      // 更新最后执行函数时的时间戳
      lastTime = now;
    }
    // 没超过，啥也不干
  }
}
export {
  throttle
}