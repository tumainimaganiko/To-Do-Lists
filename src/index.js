import './style.css';
import utils from './modules/utils.js';
import { completed, unCompleted } from './modules/status.js';

const localData = utils.retrieve();
if (!localData) localStorage.setItem('todo', '[]');

// Function to Display items
const display = () => {
  const storeData = utils.retrieve();
  const list = document.getElementById('list');
  list.innerHTML = '';
  storeData.forEach((value) => {
    const li = document.createElement('li');
    li.innerHTML = `
    <input class="checkbox" type="checkbox" ${value.completed ? 'checked' : ''}>
    <input class="text" type="text" value="${value.description}"/> 
    <i class="fa-solid fa-ellipsis-vertical"></i>
    `;
    const removeButton = document.createElement('div');
    removeButton.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
    removeButton.addEventListener('click', () => {
      utils.remove(value.id);
      display();
    });
    li.appendChild(removeButton);
    list.appendChild(li);
  });

  // Function for Editing Todo tasks
  const span = document.querySelectorAll('.text');
  span.forEach((btn, index) => {
    btn.addEventListener('keyup', () => {
      const test = utils.retrieve();
      test[index].description = btn.value;
      utils.save(test);
    });
  });

  // Making Checkbox to control completed status of tasks
  const checkbox = document.querySelectorAll('.checkbox');
  checkbox.forEach((btn, index) => {
    btn.addEventListener('change', () => {
      const test = utils.retrieve();
      if (btn.checked === true) {
        test[index].completed = completed(test);
      } else {
        test[index].completed = unCompleted(test);
      }
      utils.save(test);
    });
  });
};

// Capturing form input and sending it to local storage on form submission
const renderList = () => {
  const form = document.getElementById('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const storeData = utils.retrieve();
    const input = form.text.value;
    const completed = false;
    const id = storeData.length;
    utils.add(input, completed, id);
    display();
    form.text.value = '';
  });
};

renderList();
display();

// Clearing completed tasks
const clear = () => {
  let store = utils.retrieve();
  store = store.filter((todo) => !todo.completed);
  const remains = utils.updateList(store);
  utils.save(remains);
};

const link = document.querySelector('a');
link.addEventListener('click', (e) => {
  e.preventDefault();
  clear();
  display();
});
