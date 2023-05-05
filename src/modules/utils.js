const save = (data) => {
  localStorage.setItem('todo', JSON.stringify(data));
};

const retrieve = () => JSON.parse(localStorage.getItem('todo'));

 export function updateList(todos) {
  return todos.map((value, index) => {
    value.id = index;
    return value;
  });
}

function add(description, completed, id) {
  const storeData = retrieve();
  storeData.push({ description, completed, id });
  const sortedData = updateList(storeData);
  save(sortedData);
}
function remove(id) {
  const storeData = retrieve();
  const remaining = storeData.filter((todo) => todo.id !== id);
  const sortedData = updateList(remaining);
  save(sortedData);
}

export default {
  add, remove, save, retrieve,updateList
};