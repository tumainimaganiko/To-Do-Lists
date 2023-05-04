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

function updateList(todos) {
  return todos.map((value, index) => {
    value.id = index;
    return value;
  });
}

function renderList() {
  const form = document.getElementById("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const storeData = retrieve()
    const input = form.text.value;
    const completed = false;
    let id = storeData.length;

    add(input, completed, id);
    display();
  });
}
renderList();


function display() {
  let storeData = retrieve();

  const list = document.getElementById("list");
  list.innerHTML = "";
  storeData.forEach((value, index) => {
    // Creating list of to-do
    const li = document.createElement("li");
    li.innerHTML = `
    <div>
        <input type="checkbox">
        <span>${value.description}</span> 
    </div>
    `;
    const removeButton = document.createElement("div");
    removeButton.innerHTML = `<i class="fa-solid fa-ellipsis-vertical"></i>`;
    removeButton.addEventListener("click", () => {
      remove(value.id);
    });
    li.appendChild(removeButton);
    list.appendChild(li);
  });
}