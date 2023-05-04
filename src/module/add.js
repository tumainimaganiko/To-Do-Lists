import  { retrieve, save, display } from '../index.js';

function updateList(todos) {
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
  display();
}

export  {add, remove};