import './style.css';

const save = (data) => {
  localStorage.setItem('todo', JSON.stringify(data));
};
const retrieve = () => JSON.parse(localStorage.getItem('todo'));

let display;
const localData = retrieve();
if (!localData) localStorage.setItem('todo', '[]');

const updateList = (todos) => todos.map((value, index) => {
  value.id = index;
  return value;
});

const add = (description, completed, id) => {
  const storeData = retrieve();
  storeData.push({ description, completed, id });
  const sortedData = updateList(storeData);
  save(sortedData);
};

const remove = (id) => {
  const storeData = retrieve();
  const remaining = storeData.filter((todo) => todo.id !== id);
  const sortedData = updateList(remaining);
  save(sortedData);
  display();
};

display = () => {
  const storeData = retrieve();

  const list = document.getElementById('list');
  list.innerHTML = '';
  storeData.forEach((value) => {
    // Creating list of to-do
    const li = document.createElement('li');
    li.innerHTML = `
    <input type="checkbox">
    <input class="text" type="text" value="${value.description}"/> 
    <i class="fa-solid fa-ellipsis-vertical"></i>
    `;
    const removeButton = document.createElement('div');
    removeButton.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
    removeButton.addEventListener('click', () => {
      remove(value.id);
    });
    li.appendChild(removeButton);
    list.appendChild(li);
  });

  const span = document.querySelectorAll('.text');
  span.forEach((btn, index) => {
    btn.addEventListener('keyup', () => {
      const test = retrieve();
      test[index].description = btn.value;
      save(test);
    });
  });
};

function renderList() {
  const form = document.getElementById('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const storeData = retrieve();
    const input = form.text.value;
    const completed = false;
    const id = storeData.length;

    add(input, completed, id);
    display();
    form.text.value = '';
  });
}
renderList();
