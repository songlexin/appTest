export function throttle(func: Function, delay = 200) {
  let timer: NodeJS.Timeout | null = null;
  return function (...args: any[]) {
    if (!timer) {
      timer = setTimeout(() => {
        func(...args);
        timer = null;
      }, delay);
    }
  };
}
export function debounce(func: Function, delay: number) {
  let timer: NodeJS.Timeout;
  return function (...args: any[]) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
