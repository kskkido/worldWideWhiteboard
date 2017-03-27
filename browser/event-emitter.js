// Here is our constructor function, available globally (set to the window object!)

class EventEmitter {

  constructor () {
    this.subscribers = {}
  }

  on (eventName, eventListener) {

    if (!this.subscribers[eventName]) {
        this.subscribers[eventName] = [];
    }

    // Push the given listener function into the array
    // located on the instance's subscribers object.
    this.subscribers[eventName].push(eventListener);

  }

  emit (eventName) {

      // If there are no subscribers to this event name, why even?
      if (!this.subscribers[eventName]) {
          return;
      }

      // Grab the remaining arguments to our emit function.
      const remainingArgs = [].slice.call(arguments, 1);

      // For each subscriber, call it with our arguments.
      this.subscribers[eventName].forEach(function (listener) {
          listener.apply(null, remainingArgs);
      });

  }
}

const EE = new EventEmitter()
console.log(EE)
