let intervalId: number | null = null;

self.onmessage = (event) => {
  const { bpm } = event.data;
  if (intervalId) {
    clearInterval(intervalId);
  }
  const interval = (60 / bpm) * 1000;
  intervalId = setInterval(() => {
    self.postMessage('tick');
  }, interval);
};