type Listener = (action: any) => void;

class AppDispatcher {
  private listeners: Listener[] = [];

  register(listener: Listener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  dispatch(action: { type: string; payload?: any }) {
    this.listeners.forEach((l) => l(action));
  }
}

export const dispatcher = new AppDispatcher();
