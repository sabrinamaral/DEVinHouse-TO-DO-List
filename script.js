// target elements of HTML form
const form = document.querySelector("form");
const todoInput = document.querySelector("input");
const todoList = document.querySelector("ul");

let itemsArr = []; // create an empty array to put the to-do items later.

// ---------------EVENT LISTENERS-----------------

// form event listener
form.addEventListener("submit", function (event) {
  event.preventDefault();
  addTodo(todoInput.value); // calling the function addTodo with the input value as an argument
});

// ul event listener | click
todoList.addEventListener("click", function (event) {
  if (event.target.type === "checkbox") {
    // if the event target is a checkbox input
    toggle(event.target.parentElement.getAttribute("data-key")); // call toggle function with the data-key as argument
  }
  if (event.target.classList.contains("btn-delete")) {
    // if the event target is the delete button
    deleteTodo(event.target.parentElement.getAttribute("data-key")); // call the deleteTodo function with the data-key as argument
  }
});

// ---------------FUNCTIONS ADD ITEM | CREATE LINES | TOGGLE LINE-THROUGH | DELETE-----------------

// function to add todoInput (objects) to the itemsArr
function addTodo(item) {
  if (item != "") {
    // if imput is not empty, create an object
    const todoObj = {
      id: Date.now(), // Date.now is used to generate a random id
      name: item,
      completed: false, // this key will be used to toggle the line-through property
    };

    itemsArr.push(todoObj); // adding to itemsArr
    addToLocalStorage(itemsArr); //place them between ul

    todoInput.value = ""; //clearing the input field for the next item
  }
}

// function to create a line and alert if the list is empty
function createLine(itemsArr) {
  todoList.innerHTML = ""; //empty the ul

  const alert = document.querySelector(".alert"); // get the alert element from HTML
  alert.innerHTML = "Your list is empty"; // show alert message in the screem
  alert.style = "color: #c60f7d; font-weight: bold"; // change style of the message

  itemsArr.forEach(function (item) {
    const checked = item.completed ? "checked" : false; // use ternary operator to check if the item is completed
    const li = document.createElement("li"); // create a <li>
    li.setAttribute("class", "item"); // set a class "item" to this line
    li.setAttribute("data-key", item.id); // set the data-key attribute to this line with the todoObj.id as a value

    if (item.completed === true) {
      li.classList.add("checked"); //add the class "checked" if the checkbox is ckecked
    }
    // create a line with a check box and a delete button
    li.innerHTML = `
            <input type="checkbox" class="checkbox" ${checked}>${item.name}
            <button class="btn-delete"><i class="fas fa-trash "></i></button>
        `;
    todoList.append(li); // append the line to the parentElement <ul>
    alert.innerHTML = ""; // clear the alert message
  });
}

//function to toggle the line-through property over the items that are being clicked
function toggle(id) {
  itemsArr.forEach(function (item) {
    // it will run the array to check the conditional below
    if (item.id == id) {
      // if the item id that's being clicked is the same in the array
      item.completed = !item.completed; // toggle the boolean (value) from the completed key
    }
  });

  addToLocalStorage(itemsArr); // update the local storage
}

// function to delete items that are being clicked
function deleteTodo(id) {
  itemsArr = itemsArr.filter(function (item) {
    // filter the array
    return item.id != id; // return false
  });

  addToLocalStorage(itemsArr); // update the local storage
}

// ---------------LOCAL STORAGE-----------------

//adding to local storage
function addToLocalStorage(itemsArr) {
  localStorage.setItem("tasks", JSON.stringify(itemsArr)); //transform into string
  createLine(itemsArr); // call the function to create the <li>
}

//getting from local storage
function getFromLocalStorage() {
  const reference = localStorage.getItem("tasks");
  if (reference) {
    // if there is any task
    itemsArr = JSON.parse(reference); //transform back into an array
    createLine(itemsArr); // call the function to create the <li>
  }
}

window.onload = getFromLocalStorage(); // load the function when the browse starts running to get tasks from local storage
