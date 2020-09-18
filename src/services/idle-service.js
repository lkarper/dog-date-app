let _timeoutId;
let _idleCallback = null;
const _notIdleEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
const _TEN_MINUTES_IN_MS = 10 * 60 * 1000;

// Manages when a user has gone idle and does not interact with the page.
const IdleService = {
    setIdleCallback(idleCallback) {
        // Sets the callback that will be called when a user goes idle for ten min.
        _idleCallback = idleCallback;
    },
    resetIdleTimer(ev) {
        // Resets inactivity timer when a user interacts with the page
        clearTimeout(_timeoutId);
        _timeoutId = setTimeout(_idleCallback, _TEN_MINUTES_IN_MS);
    },
    regiserIdleTimerResets() {
        // Registers the event listeners the are used to determine whether a user is interacting with the page
        _notIdleEvents.forEach(event =>
            document.addEventListener(event, IdleService.resetIdleTimer, true)
        );
    },
    unRegisterIdleResets() {
        // Removes inactivity timer and unregisters event listeners that reset it
        clearTimeout(_timeoutId);
        _notIdleEvents.forEach(event =>
            document.removeEventListener(event, IdleService.resetIdleTimer, true)
        );
    },
};

export default IdleService;
