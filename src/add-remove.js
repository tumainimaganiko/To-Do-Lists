const myTodo = JSON.parse(localStorage.getItem('todo')) || [];

function add(description){
    myTodo.push({description})
}

const form = document.getElementById('form');
form.addEventListener('submit', ()=> {
    const input = document.getElementById('text');
    add(input.value);
})

myTodo.forEach((value) => {
    // Creating list of to-do
    const li = document.createElement('li');
    li.innerHTML = `
          ${value.description}<i class="fa-solid fa-ellipsis-vertical"></i>
      `;
    list.appendChild(li);
  });