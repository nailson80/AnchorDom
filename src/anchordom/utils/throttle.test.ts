import { throttle } from './throttle';

describe('throttle', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should throttle calls', () => {
        const func = vi.fn();
        const throttled = throttle(func, 16);

        throttled();
        throttled();
        throttled();

        expect(func).toHaveBeenCalledTimes(1);

        vi.advanceTimersByTime(16);

        throttled();
        expect(func).toHaveBeenCalledTimes(2);
    });

    it('should execute the trailing edge if called during the throttle period', () => {
        const func = vi.fn();
        const throttled = throttle(func, 16);

        throttled(); // call 1 (executes immediately)
        throttled(); // call 2 (ignored but queued for trailing)

        expect(func).toHaveBeenCalledTimes(1);

        vi.advanceTimersByTime(16);

        expect(func).toHaveBeenCalledTimes(2); // trailing edge should execute
    });

    it('should pass the latest arguments to the trailing edge call', () => {
        const func = vi.fn();
        const throttled = throttle(func, 16);

        throttled(1);
        throttled(2);
        throttled(3); // This should be the one that executes on the trailing edge

        expect(func).toHaveBeenCalledWith(1);
        expect(func).toHaveBeenCalledTimes(1);

        vi.advanceTimersByTime(16);

        expect(func).toHaveBeenCalledWith(3);
        expect(func).toHaveBeenCalledTimes(2);
    });
});
