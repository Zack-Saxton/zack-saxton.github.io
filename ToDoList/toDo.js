// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);


// Functions

function addTodo(event) {
  // prevent form from submitting
  event.preventDefault();
  //   todo div
  const toDoDiv = document.createElement("div");
  toDoDiv.classList.add("todo");

  //  create LI

  const newToDo = document.createElement("li");
  newToDo.innerText = todoInput.value;
  newToDo.classList.add("todo-item");
  toDoDiv.appendChild(newToDo);

  // Add todo Local storage(has to be added before change value to nothing )

  saveLocalTodos(todoInput.value);

  // completed button

  const completeButton = document.createElement("button");

  completeButton.innerHTML = '<i class="fas fa-check"></i>';

  completeButton.classList.add("complete-btn");

  toDoDiv.appendChild(completeButton);

  // Trash button
  const trashButton = document.createElement("button");

  trashButton.innerHTML = '<i class="fas fa-trash"></i>';

  trashButton.classList.add("trash-btn");

  toDoDiv.appendChild(trashButton);

  todoList.appendChild(toDoDiv);

  // clear todo input value
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;

  // DELETE TODO

  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    // Animation
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  // Check mark todo
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

// Filter func tion
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}


// Local storage save todo

function saveLocalTodos(todo){
  // check "hey do i laready have things in there"
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];

  }else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem('todos',JSON.stringify(todos));
}


// Clearing todos from local storage
function getTodos(){
  
  // check "hey do i laready have things in there"
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];

  }else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function(todo){
    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add("todo");
  
    //  create LI
  
    const newToDo = document.createElement("li");
    newToDo.innerText = todo;
    newToDo.classList.add("todo-item");
    toDoDiv.appendChild(newToDo);
  
    // completed button
  
    const completeButton = document.createElement("button");
  
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
  
    completeButton.classList.add("complete-btn");
  
    toDoDiv.appendChild(completeButton);
  
    // Trash button
    const trashButton = document.createElement("button");
  
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  
    trashButton.classList.add("trash-btn");
  
    toDoDiv.appendChild(trashButton);
  
    todoList.appendChild(toDoDiv);
  
  });
}

// Removing from Local Storage

function removeLocalTodos(todo){
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];

  }else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }
const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex),1);
  localStorage.setItem("todos",JSON.stringify(todos));

}
