const completed = (task) => {
    return task.completed = true;
}

const unCompleted = (task) => {
    return task.completed = false;
}

export {completed, unCompleted}