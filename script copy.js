// get elements and the form | with event listener
document.querySelector("form").addEventListener("submit", addingNewTasks);
document.querySelector("ul").addEventListener("click", checkOrDeleteTasks)

// functions for event listeners
function addingNewTasks (event) {
    event.preventDefault();
    let input = document.querySelector("input"); //receive input value
    if (input.value != "") {
    addTodo(input.value);
        input.value = "";
    }
}

function checkOrDeleteTasks (event) {
    if(event.target.id === "checkBtn") {
        checkTodo(event);

    } else if (event.target.id === "deleteBtn") {
        deleteTodo(event);
    }
}

// adding items to my list
function addTodo(task) {
    let ul = document.querySelector("ul");
    let li = document.createElement("li");
    li.innerHTML = `
        <span class="todo-item"><p id="text-item">${task}</p></span>
        <button id="checkBtn" class="btn-span"> <i class="fas fa-check-square"></i></button>
        <button id="deleteBtn" class="btn-span"> <i class="fas fa-trash "></i></button>
    `;
        li.classList.add("todo-item");
        ul.appendChild(li);
}

// checking items in my list
function checkTodo(event) {
    let listItem = event.target.parentNode.querySelector("p");
    if (listItem.style.textDecoration == 'line-through') {
        listItem.style = "text-decoration: none";
    } else {
        listItem.style = "text-decoration: line-through";
    } 
}

// deleting items from my list
function deleteTodo(event) {
    let listItem = event.target.parentNode;
    listItem.remove();
}


function saveItemsLocalStorage() {
    localStorage.setItem('items', JSON.stringify(item))
}

