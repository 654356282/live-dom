const { port1, port2 } = new MessageChannel();

let isSchedulering = false;

let taskId = 0;
let taskQueue: Task[] = [];

port1.onmessage = performUnitOfWorkUntilDeadline;

function performUnitOfWorkUntilDeadline() {
  isSchedulering = false;
  while (taskQueue.length) {
    const task = taskQueue.pop();
    try {
      task?.callback();
    } catch {}
  }
}

function pushTask(task: Task) {
  taskQueue.push(task);
}

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
  pushTask(task);
  requestCallback();
}
