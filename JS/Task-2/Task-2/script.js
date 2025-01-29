class Observable {
    constructor() {
      this.observers = []; // List of observers
      this.state = null; // Initial state
    }
  
    // Subscribe method to register an observer
    subscribe(observer) {
      if (typeof observer === 'function') {
        this.observers.push(observer);
      }
    }
  
    // Unsubscribe method to remove a specific observer
    unsubscribe(observer) {
      this.observers = this.observers.filter(obs => obs !== observer);
    }
  
    // Notify all observers of a state change
    notify() {
      this.observers.forEach(observer => observer(this.state));
    }
  
    // Set a new state and notify observers
    setState(state) {
      this.state = state;
      this.notify(); // Notify all observers of the state change
    }
  }
  
  // Example Usage
  const observable = new Observable();
  
  // Observer function
  const observer1 = (state) => console.log('Observer 1 notified with state:', state);
  const observer2 = (state) => console.log('Observer 2 notified with state:', state);
  
  // Subscribe observers
  observable.subscribe(observer1);
  observable.subscribe(observer2);
  
  // Change state and notify
  observable.setState('New State');
  
  // Unsubscribe an observer
  observable.unsubscribe(observer1);
  
  // Change state again and notify
  observable.setState('Updated State');
  