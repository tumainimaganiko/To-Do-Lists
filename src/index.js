import "./style.css";

let myTodo = JSON.parse(localStorage.getItem("todo")) || [];
const save = (data) => {
  localStorage.setItem("todo", JSON.stringify(data));
};
const retrieve = () => {
  return JSON.parse(localStorage.getItem("todo"));
};
const saveTask = () => {
  localStorage.setItem("todo", JSON.stringify(myTodo));
};
const localData = retrieve();
if (!localData) localStorage.setItem("todo", "[]");
function add(description, completed, id) {
  // myTodo[myTodo.length] = {description,completed,id};
  // myTodo.push({description,completed,id})
  // localStorage.setItem('todo',JSON.stringify(myTodo))
  // console.log(myTodo)
  // saveTask();
  let storeData = retrieve();
  storeData.push({ description, completed, id });
  const sortedData = updateList(storeData);
  save(sortedData);
  // updateList();
}
function remove(id) {
  // let myTodo = JSON.parse(localStorage.getItem('todo')) || [];
  // myTodo = myTodo.filter((todo) => todo.id !== x);
  //   updateList();
  // saveTask();
  const storeData = retrieve();
  let remaining = storeData.filter((todo) => todo.id !== id);
  const sortedData = updateList(remaining);
  save(sortedData);
  display();
  // saveTask()
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
    // let id = myTodo.length;

    add(input, completed, id);
    // addNewTask(input,id)
    display();
    // Sorting the array first
    // myTodo.sort((a, b) => a.index - b.index);
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

// localStorage.setItem('testing',JSON.stringify([{number:2,value:5}]))
// localStorage.setItem('testing',JSON.stringify([{number:10,value:98},{number:2,value:5}]))
// localStorage.setItem('testing',JSON.stringify([{number:27,value:598},{number:65,value:5},{number:2,value:5}]))
