//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput = document.getElementById("new-task");//Add a new task.
var addButton = document.querySelector(".button_add");//first button
var incompleteTaskHolder = document.getElementById("todo-list");//ul of #incompleteTasks
var completedTasksHolder = document.getElementById("done-list");//completed-tasks
var taskForm = document.getElementById("add-task");//form

// Prevent form submission
taskForm.addEventListener("submit", function(e) {
  e.preventDefault();
  addTask();
});

//New task list item
var createNewTaskElement = function(taskString) {
  var listItem = document.createElement("li");
  listItem.className = "task__item";

  //input (checkbox)
  var checkBox = document.createElement("input");//checkbx
  checkBox.type = "checkbox";
  checkBox.className = "task__checkbox";
  checkBox.setAttribute("aria-label", "Mark '" + taskString + "' as completed");

  //label
  var label = document.createElement("label");//label
  label.className = "task__label";
  label.innerText = taskString;

  //input (text)
  var editInput = document.createElement("input");//text
  editInput.type = "text";
  editInput.className = "task__input task__input_hidden";

  //button.edit
  var editButton = document.createElement("button");//edit button
  editButton.className = "button button_edit";
  editButton.innerText = "Edit";//innerText encodes special characters, HTML does not.
  editButton.setAttribute("aria-label", "Edit '" + taskString + "' task");

  //button.delete
  var deleteButton = document.createElement("button");//delete button
  deleteButton.className = "button button_delete";
  deleteButton.setAttribute("aria-label", "Delete '" + taskString + "' task");

  var deleteButtonImg = document.createElement("img");
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.alt = "";
  deleteButtonImg.className = "button__icon";
  deleteButtonImg.setAttribute("aria-hidden", "true");
  deleteButton.appendChild(deleteButtonImg);

  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

//Add a new task.
var addTask = function() {
  console.log("Add Task...");
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  var listItem = createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
}

//Edit an existing task.
var editTask = function() {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  var listItem = this.parentNode;
  var editInput = listItem.querySelector(".task__input");
  var label = listItem.querySelector(".task__label");
  var editBtn = listItem.querySelector(".button_edit");
  var containsClass = listItem.classList.contains("task__item_editing");

  //If class of the parent is .edit-mode
  if (containsClass) {
    //switch from .edit-mode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
    editBtn.setAttribute("aria-label", "Edit '" + label.innerText + "' task");
    editInput.classList.add("task__input_hidden");
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
    editBtn.setAttribute("aria-label", "Save '" + label.innerText + "' task");
    editInput.classList.remove("task__input_hidden");
  }

  //toggle .edit-mode on the parent.
  listItem.classList.toggle("task__item_editing");
}

//Delete task.
var deleteTask = function() {
  console.log("Delete Task...");

  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);
}

//Mark task completed
var taskCompleted = function() {
  console.log("Complete Task...");

  //Append the task list item to the #completed-tasks
  var listItem = this.parentNode;
  listItem.className = "task__item task__item_completed";
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete = function() {
  console.log("Incomplete Task...");
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  var listItem = this.parentNode;
  listItem.className = "task__item";
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

var ajaxRequest = function() {
  console.log("AJAX Request");
}

//The glue to hold it all together.

//Set the click handler to the addTask function.
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");
  //select ListItems children
  var checkBox = taskListItem.querySelector(".task__checkbox");
  var editButton = taskListItem.querySelector(".button_edit");
  var deleteButton = taskListItem.querySelector(".button_delete");

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
  //bind events to list items children(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
  //bind events to list items children(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.