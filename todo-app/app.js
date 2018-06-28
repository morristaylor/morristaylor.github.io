'use strict';
var todoList = {
  todos: [],
  addTodo: function(todoText) {
    // localStorage.setItem('todoText', JSON.stringify(todoText)); another failed attempt to work inside the object
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    this.todos.forEach(function(todo) {
      if (todo.completed === true) {
        completedTodos++;
      }
    });
    this.todos.forEach(function(todo) {
      if (completedTodos === totalTodos) {
        todo.completed = false;
      } else {
        todo.completed = true;
      }
    });
  }
};

var handlers = {
  addTodo: function() {
    addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    // maybe this is where I should try localStorage?
    // localStorage.setItem('recentTodos', JSON.stringify(addTodoTextInput.value));
    addTodoTextInput.value = ""; // this clears the input
    view.displayTodos();
  },
  deleteTodo: function(position){
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function(position) {
    todoList.toggleCompleted(position);
    view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  },
  deleteAll: function() {
    todoList.todos = [];
    view.displayTodos();
  }
};

var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = "";
    for (var i = 0; i < todoList.todos.length; i++) {
      var todoLi = document.createElement('li');
      var todo = todoList.todos[i];
      var todoTextWithCompletion = "";

      if (todo.completed === true) {
        todoTextWithCompletion = todo.todoText;
        todoTextWithCompletion = todoTextWithCompletion.toString().strike();
      } else {
        todoTextWithCompletion = todo.todoText;
      }
      todoLi.id = i; // i from for loop, gives numbered ID
      todoLi.innerHTML = todoTextWithCompletion;
      if (i === 0) {
        todosUl.appendChild(this.createDeleteAllButton());
        todosUl.appendChild(this.createToggleAllButton());
      }
      todoLi.prepend(this.createToggleButton());
      todoLi.prepend(this.createDeleteButton());
      todosUl.appendChild(todoLi);
    }
  },
  createDeleteButton: function() {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  createToggleButton: function() {
    var toggleButton = document.createElement('button');
    toggleButton.textContent = '✓';
    toggleButton.className = 'toggleButton';
    return toggleButton;
  },
  createDeleteAllButton: function () {
    var deleteAllButton = document.createElement('button');
    deleteAllButton.textContent = 'Delete All';
    deleteAllButton.className = 'deleteAllButton';
    return deleteAllButton;
  },
  createToggleAllButton: function(){
    var toggleAllButton = document.createElement('button');
    toggleAllButton.textContent = 'Toggle All';
    toggleAllButton.className = 'toggleAllButton';
    return toggleAllButton;
  },
  setUpEventListeners: function() { // event delegation
    var todosUL = document.querySelector('ul');
    todosUL.addEventListener('click', (e) => {
      var elementClicked = e.target;
      if (elementClicked.className === 'deleteButton') {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      } else if (elementClicked.className === 'toggleButton') {
        handlers.toggleCompleted(parseInt(elementClicked.parentNode.id));
      } else if (elementClicked.className === 'deleteAllButton') {
        handlers.deleteAll();
      } else if (elementClicked.className === "toggleAllButton") {
        handlers.toggleAll();
      }
     });
  }
};

view.setUpEventListeners();

window.onload = function() {
  if (localStorage) {
    document.getElementById('nameForm').addEventListener('submit', function() {
      var name = document.getElementById('name').value;
      localStorage.setItem('name', name);
    });
    var name = localStorage.getItem('name');
    if (name == null) {
      document.getElementById('howdy').innerHTML = "Hello!";
    } else {document.getElementById('howdy').innerHTML = "Hello " + name + "!";}
 }
}

// failed localStorage attempts/notepad for ideas:

// saveTodo: localStorage.setItem("todoList",JSON.stringify(todoList));,

// var getRecentTodos = () => JSON.parse(localStorage.recentTodos || '[]');

// tried to make a username thing here but deleted it
// if (window.localStorage) {
//   var name = document.getElementById('name');
//   name.value = localStorage.getItem('name');
//   name.addEventListener('input', function(){
//     localStorage.setItem('name', name.value);
//   }, false);
// }

// got close here but I'm misssing something
// function getRecentTodos() {
//   todoList.todos = localStorage.getItem('recentTodos');
//   if (todoList.todos) {
//     return JSON.parse(todos);
//   }
//   return [];};
//
//  issues with scope, trying to access todoList.todos in the wrong spot
// function saveTodo(str) {
//   todoList.todos = getRecentTodos();
//   todoList.todos.todoText.push(str);
//   todoList.todos.todoText = localStorage.setItem('recentTodos', JSON.stringify(todos));
//   return true;
// }
