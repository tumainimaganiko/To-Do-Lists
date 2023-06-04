const save = (data) => {
  localStorage.setItem('todo', JSON.stringify(data));
};

const retrieve = () => JSON.parse(localStorage.getItem('todo'));
// Adding specific task
function updateList(todos) {
  return todos.map((value, index) => {
    value.id = index;
    return value;
  });
}
// Adding the todos
function add(description, completed, id) {
  const storeData = retrieve();
  storeData.push({ description, completed, id });
  const sortedData = updateList(storeData);
  save(sortedData);
}

// Removing Items from the Array
function remove(id) {
  const storeData = retrieve();
  const remaining = storeData.filter((todo) => todo.id !== id);
  const sortedData = updateList(remaining);
  save(sortedData);
}

export default {
  add,
  remove,
  save,
  retrieve,
  updateList,
};
