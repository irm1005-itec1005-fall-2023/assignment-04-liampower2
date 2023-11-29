// Variables
let todoItems = [];
let currentTodoID = 1;


// DOM Elements
let listElement = document.getElementById("TodoList");
let inputElement = document.getElementById("NewItemInput");
let addButton = document.getElementById("AddButton");
let clearButton = document.getElementById("ClearButton");


// Functions
function displayItems() {
  listElement.innerHTML = "";


  for (const item of todoItems) {
    const listItem = document.createElement("li");
    listItem.innerHTML =
      `<h2>${item.task}</h2>
      <span>${item.id}</span>
      <button data-id="${item.id}" class="remove-btn">Remove</button>
      <button data-id="${item.id}" class="complete-btn">Complete</button>`;


    if (item.completed) {
      const checkMark = document.createElement("span");
      checkMark.innerHTML = "✅";
      checkMark.classList.add("status-icon");
      listItem.appendChild(checkMark);
      listItem.classList.add("done");
    }


    listElement.appendChild(listItem);
  }
}


function handleAddItem() {
  const taskDescription = inputElement.value.trim();


  if (taskDescription !== "") {
    createItem(taskDescription);
    inputElement.value = "";
    displayItems();
  }
}


function handleItemClick(event) {
  const itemID = parseInt(event.target.getAttribute("data-id"));


  if (event.target.classList.contains("remove-btn")) {
    removeItem(itemID);
  } else if (event.target.classList.contains("complete-btn")) {
    markItemAsCompleted(itemID);
  }


  displayItems();
}


function createItem(taskDescription) {
  let item = {
    id: currentTodoID,
    task: taskDescription,
    completed: false,
  };


  todoItems.push(item);
  currentTodoID++;
}


function markItemAsCompleted(itemID) {
  const itemIndex = todoItems.findIndex((item) => item.id === itemID);


  if (itemIndex !== -1) {
    todoItems[itemIndex].completed = true;
  }
}


function removeItem(itemID) {
  todoItems = todoItems.filter((item) => item.id !== itemID);
}


function clearAllItems() {
  todoItems = [];
  displayItems();
}


// Event Listeners
addButton.addEventListener("click", handleAddItem);
listElement.addEventListener("click", handleItemClick);
clearButton.addEventListener("click", clearAllItems);


// Initial rendering
displayItems();