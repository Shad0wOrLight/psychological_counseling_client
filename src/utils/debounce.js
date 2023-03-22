// 防抖函数
export const debounce = function (fn, delay, ...args) {
  // 记录上次定时器的
  let timer = null;
  return () => {
    //清除上一次定时器
    if (timer) {
      clearTimeout(timer);
    }

    //重新设置定时器
    timer = setTimeout(() => {
      //修正this指向
      fn.apply(this, [...args]);
    }, delay);
  };
};
