// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  let lastArgs: Parameters<T> | null = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let lastThis: any = null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function wrapper(this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
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
}
