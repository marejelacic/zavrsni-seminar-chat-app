export default class IsTyping {
  constructor({time = 1500} = {}) {
    Object.assign(this, {
      lastState: false,
      liveState: false,
      lastUpdate: Date.now(),
      listeners: [],
      time: null,
      interval: null,
    });
    this.time = time;
  }

  startInterval() {
    this.interval = setInterval(() => {
      if (Date.now() > this.lastUpdate + this.time) { //long time since last input
        this.liveState = false;
        clearInterval(this.interval);
        this.interval = null;
      }
      if (this.liveState !== this.lastState) {
        this.trigger();
      }
    }, this.time);
  }

  listen(cb) {
    this.listeners.push(cb);
  }

  trigger() {
    this.lastState = this.liveState;
    this.listeners.forEach(cb => cb(this.liveState));
  }

  onChange(text) {
    if (text === '') {
      this.liveState = false;
    } else {
      this.liveState = true;
      if (!this.interval) { //user started typing after a long pause
        this.startInterval();
        this.trigger();
      }
    }
    this.lastUpdate = Date.now();
  }
}