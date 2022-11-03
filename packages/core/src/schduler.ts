const { port1, port2 } = new MessageChannel();

let isSchedulering = false;

let taskId = 0;
let taskQueue: Task[] = [];

port1.onmessage = function () {};

function getCurrentTime() {
  return performance.now();
}

class Task {
  id = taskId++;
  callback: () => void;
  startTime = getCurrentTime();
  constructor(cb: () => void) {
    this.callback = cb;
  }
}

function requestCallback() {
  if (isSchedulering) return;
  isSchedulering = true;
  port2.postMessage(null);
}

export function scheduleCallback(cb: () => void) {
  const task = new Task(cb);
  taskQueue.push(task);
}
