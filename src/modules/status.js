function completed(task) {
  task.completed = true;
  const test = task.completed;
  return test;
}

function unCompleted(task) {
  task.completed = false;
  const test = task.completed;
  return test;
}

export { completed, unCompleted };