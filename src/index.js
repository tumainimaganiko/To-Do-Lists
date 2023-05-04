import './style.css';
// import {
//   add, remove, retrieve, save,
// } from './module/utils.js';
import utils from './module/utils.js';
// import   add, remove, save, retrieve, from './module/utils.js'

const localData = utils.retrieve();
if (!localData) localStorage.setItem('todo', '[]');

const display = () => {
  const storeData = utils.retrieve();

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
      utils.remove(value.id);
      display();
    });
    li.appendChild(removeButton);
    list.appendChild(li);
  });

  const span = document.querySelectorAll('.text');
  span.forEach((btn, index) => {
    btn.addEventListener('keyup', () => {
      const test = utils.retrieve();
      test[index].description = btn.value;
      utils.save(test);
    });
  });
};

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
