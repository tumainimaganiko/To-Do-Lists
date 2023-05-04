import './style.css';

let myTodo = JSON.parse(localStorage.getItem("todo")) || [];

const save = (data) => {
  localStorage.setItem("todo", JSON.stringify(data));
};
const retrieve = () => {
  return JSON.parse(localStorage.getItem("todo"));
};

const localData = retrieve();
if (!localData) localStorage.setItem("todo", "[]");
const list = document.getElementById('list');

function add(description, completed, id) {
  let storeData = retrieve();
  storeData.push({ description, completed, id });
  const sortedData = updateList(storeData);
  save(sortedData);
}

function remove(id) {
  const storeData = retrieve();
  let remaining = storeData.filter((todo) => todo.id !== id);
  const sortedData = updateList(remaining);
  save(sortedData);
  display();
}
// Sorting the array first
myTodo.sort((a, b) => a.index - b.index);

myTodo.forEach((value) => {
  // Creating list of to-do
  const li = document.createElement('li');
  li.innerHTML = `
        ${value.description}<i class="fa-solid fa-ellipsis-vertical"></i>
    `;
  list.appendChild(li);
});