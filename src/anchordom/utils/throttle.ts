// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ThrottledFunction<T extends (...args: any[]) => void> {
  (...args: Parameters<T>): void;
  cancel: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): ThrottledFunction<T> {
  let inThrottle = false;
  let lastArgs: Parameters<T> | null = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let lastThis: any = null;
  let timeout: ReturnType<typeof setTimeout> | null = null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const wrapper = function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      timeout = setTimeout(() => {
        inThrottle = false;
        if (lastArgs) {
          const argsToPass = lastArgs;
          const thisToPass = lastThis;
          lastArgs = null;
          lastThis = null;
          wrapper.apply(thisToPass, argsToPass);
        }
      }, limit);
    } else {
      lastArgs = args;
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      lastThis = this;
    }
  };

  (wrapper as ThrottledFunction<T>).cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    inThrottle = false;
    lastArgs = null;
    lastThis = null;
  };

  return wrapper as ThrottledFunction<T>;
}
