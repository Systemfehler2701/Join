const taskLists = {
  toDo: [],
  inProgress: [],
  feedback: [],
  done: [],
};

let assignees = [];
let subtasks = [];
let subtasksDone = [];
let Prio = [];
let priorities = [
  {
    priority: "Urgent",
    symbol: "/assets/img/Prio_alta.png",
    color: "rgb(255, 61, 0)",
  },
  {
    priority: "Medium",
    symbol: "/assets/img/Prio_media.png",
    color: "rgb(255, 168, 0)",
  },
  {
    priority: "Low",
    symbol: "/assets/img/Prio_baja.png",
    color: "rgb(122,226,41)",
  },
];

const categories = [
  {
    name: "CSS",
    color: "rgb(40,98,233)",
  },
  {
    name: "HTML",
    color: "rgb(233,98,40)",
  },
  {
    name: "Javascript",
    color: "rgb(247,214,36)",
  },
];

/**
 * This function is called when a new task is created, it compiles the data, validates it, saves it to the server and reloads the tasks
 * All inputs are reset, a notification is displayed and the Task-creator rerendered
 * If the task creator is opened in the board overlay, the overlay is closed
 *
 * @param {string} list  This is the name of the array inside "tasksLists" to which the task is supposed to be added
 */

async function task_addTask(list) {
  task_resetError();
  let data = task_compileTaskData();
  if (data != "error") {
    taskLists[list].push(data);
    task_resetForm();
    task_resetArrays();
    task_renderAssigneeList();
    await setItem(list, JSON.stringify(taskLists[list]));
    if (overlayBody != undefined) {
      board_loadTasks();
      board_closeOverlay();
    } else {
      renderAddTask()
      displayTaskNotification()
    }
  }
}

/**
 * This function is called whenever a task is edited, it compiles the data, validates it, saves it to the server and reloads the tasks
 *
 * @param {string} list This is the name of the array inside "tasksLists" to which the task is supposed to be added
 * @param {number} i This is the position of the edited task inside the array specified above
 */
async function task_addEditedTask(list, i) {
  task_resetError();
  let data = task_compileTaskData();
  if (data != "error") {
    taskLists[list][i] = data;
    task_CheckFinishedSubtasks(list, i);
    task_resetForm();
    task_resetArrays();
    await setItem(list, JSON.stringify(taskLists[list]));

    board_closeOverlay();
    board_loadTasks();
  }
}

/**
 * Resets the task-form before rerendering. if else to check if the task creator is in the add task submenu or the board overlay
 * 
 * @param {string} arrayAsString 
 */
function clearTaskCreator(arrayAsString) {
  task_resetForm()
  if (overlayBody != undefined) {
    board_addTask(arrayAsString)
  } else {
    renderAddTask()
  }

}

/**
 * Resets all values in input fields on the task-creation section
 *
 */
function task_resetForm() {
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("assign_select").value = null;
  document.getElementById("due").value = "";
  document.getElementById("category_selector").value = null;

}

/**
 * resets arrays after tasks have been edited, closed or created.
 *
 */
function task_resetArrays() {
  Prio = [];
  subtasks = [];
  subtasksDone = [];
  assignees = [];
}

/**
 * This function is called when a task is edited and it takes the priority, here shown as a number between 0 and 2. This way the priority can be displayed when the editor is opened
 *
 * @param {string} arrayAsString This is the name of the array inside "tasksLists" from which information is supossed to be taken
 * @param {number} i This is the position of the edited task inside the array specified above
 * @returns returns the 'value' of the priority
 */
function task_getPrioforEditor(arrayAsString, i) {
  let x = null;
  let task = taskLists[arrayAsString][i];
  if (task["priority"]["priority"] == "Urgent") {
    x = 0;
  }
  if (task["priority"]["priority"] == "Medium") {
    x = 1;
  }
  if (task["priority"]["priority"] == "Low") {
    x = 2;
  }

  return x;
}

/**
 * Sets the priority of an opened or currently created task for later storage. Colors the respective button as well
 *
 * @param {number} x A number between 0 and 2 that signals the respecive priority
 */
function task_setPrio(x) {
  Prio = [];
  Prio.push(priorities[x]);
  task_colorPriorityButtons(x);
}

/**
 * adds a new subtask in the subtask array, resets the input and renders all current subtasks
 *
 */
function task_addSubtask() {
  let subtask = document.getElementById("subtasks");
  let newSubtask = {
    task: subtask.value,
    done: 0,
  };
  subtasks.push(newSubtask);
  subtask.value = "";
  task_renderSubtasks();
}

/**
 * enables the fucntion task_addSubtask() to be called on the enter key, if a value is present
 *
 */
function task_addSubtasksOnEnter(event) {
  let subtask = document.getElementById("subtasks");
  if (event.keyCode == 13) {
    event.preventDefault();
    if (subtask != "") {
      task_addSubtask();
    }
  }
}

/**
 * loops through all subtasks in the subtasks array and displays them
 *
 */
function task_renderSubtasks() {
  let subTaskDisplay = document.getElementById("addedSubtasks");
  subTaskDisplay.innerHTML = "";
  for (let i = 0; i < subtasks.length; i++) {
    let subtaskelement = subtasks[i];
    subTaskDisplay.innerHTML += /*html*/ `

    <div class="subtaskElement" id="subtask${i}">
      <div class="subtaskElementBody">
        <img class="dot" src="/assets/img/dot.svg" alt="">
        <p>${subtaskelement["task"]}</p>
      </div>
      <div class="subtaskTools">
        <img onclick="task_cutSubtask(${i})" src="/assets/img/delete.svg" alt="">
        <img onclick="task_editSubtask(${i})" src="/assets/img/edit.svg" alt="">
      </div>
    </div>
    `;
  }
}

/**
 * deletes the pressed subtask and rerenders the list of subtasks
 *
 * @param {number} i index of the respective subtask in the subtasks array
 */
function task_cutSubtask(i) {
  subtasks.splice(i, 1);
  task_renderSubtasks(i);
}

/**
 * renders an input and two new buttons in the place of a displayed subtask. Gives the input the value of the subtask previously displayed.
 * The buttons have the options to save the edited subtask or delete it
 *
 * @param {number} i index of the respective subtask in the subtasks array
 */
function task_editSubtask(i) {
  let currentValue = subtasks[i]["task"];
  let subTaskDisplay = document.getElementById(`subtask${i}`);
  subTaskDisplay.innerHTML = "";
  subTaskDisplay.innerHTML = `
      <input type="text" id="editedInput${i}" value="${currentValue}"  />
      <div>
        <img onclick="task_cutSubtask( ${i})" src="/assets/img/delete.svg" alt="">
        <img onclick="task_saveSubtaskEdit(${i})" src="/assets/img/Vector 17.svg" alt="">
      </div>
    `;
}

/**
 * saves an edited subtasks and rerenders the list of subtasks
 *
 * @param {*number} i index of the respective subtask in the subtasks array
 */
function task_saveSubtaskEdit(i) {
  let editedValue = document.getElementById(`editedInput${i}`).value;
  subtasks[i]["task"] = editedValue;
  task_renderSubtasks();
}

/**
 * clears the subtask input
 */
function task_clearSubtask() {
  document.getElementById("subtasks").value = "";
}

/**
 * renders in the clear or save buttons into the subtask input div when something is written in the input
 *
 */
function task_changeSubtaskAppearance() {
  if (document.getElementById("subtasks").value != "") {
    document.getElementById("subtaskField").innerHTML = /*html*/ `

    <div class="buttonwrapper"><img onclick="task_clearSubtask()" src="/assets/img/close.svg" alt=""></div> 
    <img src="/assets/img/Vector 3.svg" alt="">
    <div class="buttonwrapper"><img onclick="task_addSubtask()" src="/assets/img/Vector 17.svg" alt=""></div>  
    `;
  } else {
    document.getElementById("subtaskField").innerHTML =
      '<img src="/assets/img/Subtasks icons11.svg" alt="">';
  }
}

/**
 * opens the contact page and the overlay to add a new contact
 *
 */
function goToContacts() {
  let element = document.getElementById("navContactButton");
  renderContacts(element);
  openOverlay();
}

/**
 * This is called by the task_addTask(list) and task_addEditedTask(list) function.
 * reads out the values from all necesarry inputs.
 * Then checks if the value has the right format and returns either correctly input data or an error
 *
 * @returns correct data or a string saying "error"
 *
 */
function task_compileTaskData() {
  title = document.getElementById("title");
  description = document.getElementById("description");
  dueDate = document.getElementById("due");
  category = document.getElementById("category_selector");

  const validity = task_CheckInputValidity(
    title.value,
    dueDate.value,
    category.value
  );

  if (validity == true) {
    let date = new Date(dueDate.value);
    let data = {
      title: title.value,
      description: description.value,
      assignees: assignees,
      dueDate: date.getTime(),
      category: category.value,
      priority: Prio[0],
      subtasks: subtasks,
      subtasksDone: subtasksDone,
    };
    return data;
  } else {
    return "error";
  }
}

/**
 * styles the button of te chosen priority
 *
 * @param {number} x This is the number of the respecive priority 0 for urgent, 1 for medium, 2 for low
 */
function task_colorPriorityButtons(x) {
  //changes the backgroundcolor based on the selected Priority
  document.getElementById(`Prio0`).style.backgroundColor = "white";
  document.getElementById(`Prio1`).style.backgroundColor = "white";
  document.getElementById(`Prio2`).style.backgroundColor = "white";
  document.getElementById(
    `Prio${x}`
  ).style.backgroundColor = `${priorities[x]["color"]}`;

  //Adds classes that make the image and text white
  document.getElementById(`Prio0`).classList.remove("whiteFilterText");
  document.getElementById(`Prio1`).classList.remove("whiteFilterText");
  document.getElementById(`Prio2`).classList.remove("whiteFilterText");
  document.getElementById(`Prio${x}`).classList.add("whiteFilterText");

  document.getElementById(`Prio0_img`).classList.remove("whiteFilterImg");
  document.getElementById(`Prio1_img`).classList.remove("whiteFilterImg");
  document.getElementById(`Prio2_img`).classList.remove("whiteFilterImg");
  document.getElementById(`Prio${x}_img`).classList.add("whiteFilterImg");
}

/**
 * subtasks have a value corresponding to whether or not they are finished.
 * finished subtasks have the number 1, unfinished ones have the number 0
 * This function loops through all subtasks in a saved task and checks if they are done.
 * If they are done, they get pushed into the finishedSubtasks array
 *
 * @param {string} list This is the name of the array inside "tasksLists" from which information is supossed to be taken
 * @param {number} i This is the position of the edited task inside the array specified above
 */
function task_CheckFinishedSubtasks(list, i) {
  let subtasks = taskLists[list][i]["subtasks"];
  let finishedSubtasks = taskLists[list][i]["subtasksDone"];
  for (let j = 0; j < subtasks.length; j++) {
    let subtask = subtasks[j];
    if (subtask["done"] > 0) {
      finishedSubtasks.push(subtask);
    }
  }
}


/**
 * adds the different categories as option elements from the categories array. The index will lter determine the category
 *
 */
function task_renderCategoryOptions() {
  let selector = document.getElementById("category_selector");
  for (let index = 0; index < categories.length; index++) {
    const category = categories[index];
    selector.innerHTML += `
        <option value="${index}">${category["name"]}</option>
        `;
  }
}


/**
 * Loops through contacts to render all assignee options for the assignee selector and renders them
 * Checks if user is already assigned
 *
 */
function task_renderAssigneeOptions() {
  let selector = document.getElementById("assign_select");
  selector.innerHTML = "";
  for (let index = 0; index < users.length; index++) {
    let user = users[index];
    if (assignees.includes(index)) {
      task_createAssignedContact(user, index);
    } else {
      task_createUnassignedContact(user, index);
    }
  }
}

/**
 * assignees are saved by storing their index in the users array. This function goes through all indexes that are assigned
 * and renders the respective user from the users array
 *
 *
 */
function task_renderAssigneeList() {
  let list = document.getElementById("assigneeList");
  list.innerHTML = "";
  for (let i = 0; i < assignees.length; i++) {
    let assigneeNumber = assignees[i];
    let user = users[assigneeNumber];
    list.innerHTML += /*html*/ `
      <div class="initials-logo" style="background-color: ${
        user.color
      }">${getInitials(user.name)}</div>
    `;
  }
}


/**
 * simple search function to find contacts to assign.
 * Checks if user is already assigned
 *
 */
function task_searchAssignees() {
  let search = document.getElementById("assigner").value;
  let selector = document.getElementById("assign_select");
  if (search == "") {
    task_renderAssigneeOptions();
  } else {
    selector.innerHTML = "";
    for (let i = 0; i < users.length; i++) {
      let user = users[i];
      if (user["name"].toLowerCase().includes(search)) {
        if (assignees.includes(i)) {
          task_createAssignedContact(user, i);
        } else {
          task_createUnassignedContact(user, i);
        }
      }
    }
  }
}

/**
 * assigns a user by pushing its index of the users array into the assignee array
 *
 * @param {number} index index of the user in the users array
 */
function task_assign(index) {
  assignees.push(index);
  let checkbox = document.getElementById(`assigneeCheckbox${index}`);
  checkbox.src = "/assets/img/Check button.svg";
  checkbox.onclick = null;
  checkbox.onclick = function () {
    task_unassign(index);
  };
  task_renderAssigneeList();
}

/**
 * assigns a user by splicing its index of the users array from the assignee array
 *
 * @param {number} index index of the user in the users array
 */
function task_unassign(index) {
  let position = assignees.indexOf(index);
  assignees.splice(position, 1);

  let checkbox = document.getElementById(`assigneeCheckbox${index}`);
  checkbox.src = "/assets/img/Rectangle 5.svg";
  checkbox.onclick = null;
  checkbox.onclick = function () {
    task_assign(index);
  };
  task_renderAssigneeList();
}


/**
 * Opens the assignee option overlay, displays the list of assignees and un-flips the selector button.
 * This function also prevents the click event from propagating to any parent elements to avoid triggering task_closeOverlay().
 *
 * @function
 * @param {Event} [event] - The click event object, if available.
 */
function task_openOverlay(event) {
  if (event) event.stopPropagation();

  let selector = document.getElementById("assigneeOptionContainer");
  let selectorButton = document.getElementById("assignmentSelectButton");

  // Displays the assignee options and adds a flip class to the select button
  selector.style.display = "flex";
  selectorButton.classList.add("flip");
  task_renderAssigneeOptions();
}

/**
 * Toggles the visibility of the assignee option overlay.
 * If the overlay is currently hidden or not set, it will display the overlay and flip the selector button.
 * Otherwise, it hides the overlay and un-flips the selector button.
 * This function also prevents the click event from propagating to any parent elements to avoid triggering task_openOverlay(event).
 *
 * @function
 * @param {Event} [event] - The click event object, if available.
 */
function task_closeOverlay(event, clickedElement) {
  if (event) event.stopPropagation();
  let selector = document.getElementById("assigneeOptionContainer");
  let selectorButton = document.getElementById("assignmentSelectButton");

  if (selector.style.display === "none" && clickedElement == selectorButton) {
    // Displays the assignee options and adds a flip class to the select button
    selector.style.display = "flex";
    selectorButton.classList.add("flip");
    task_renderAssigneeOptions();
  } else {
    // Hides the assignee options and removes the flip class from the select button
    selector.style.display = "none";
    selectorButton.classList.remove("flip");
    task_renderAssigneeOptions();
  }
}

/**
 * This function prevents the click event from propagating to any parent elements to avoid triggering task_closeOverlay().
 *
 * @param {event} e
 */
function preventClose(e) {
  e.stopPropagation();
}


/**
 * resets all error messages by making them invisible
 *
 */
function task_resetError() {
  document.getElementById("errorTitle").style.display = "none";
  document.getElementById("errorDate").style.display = "none";
  document.getElementById("errorDate").style.display = "none";
  document.getElementById("errorPriority").style.display = "none";
  document.getElementById("errorCategory").style.display = "none";
}


function displayTaskNotification() {
  document.getElementById('taskNotification').style.display = 'flex'
  setTimeout(() => {
    if(document.getElementById('taskNotification')) {
      document.getElementById('taskNotification').style.display = 'none'
    }
  }, 3000);
}



/**
 * goes through every single obligatory input and checks if thy have a value.
 * If no it will display an error message under the respective input
 *
 * @param {string} title values of the respective inputs
 * @param {date} dueDate values of the respective inputs
 * @param {number} category values of the respective inputs
 * @returns false or true
 */
function task_CheckInputValidity(title, dueDate, category) {
  let validitiy = true;
  if (title == "") {
    document.getElementById("errorTitle").style.display = "block";
    validitiy = false;
  }
  if (dueDate == "") {
    document.getElementById("errorDate").innerText =
      "This field needs to be filled out";
    document.getElementById("errorDate").style.display = "block";
    validitiy = false;
  } else {
    let selectedDate = new Date(dueDate).setHours(0, 0, 0, 0);
    let currentDate = new Date().setHours(0, 0, 0, 0);

    if (selectedDate < currentDate) {
      document.getElementById("errorDate").innerText =
        "Due date cannot be in the past";
      document.getElementById("errorDate").style.display = "block";
      validitiy = false;
    }
  }
  if (Prio.length == 0) {
    document.getElementById("errorPriority").style.display = "block";
    validitiy = false;
  }
  if (category == "null") {
    document.getElementById("errorCategory").style.display = "block";
    validitiy = false;
  }

  return validitiy;
}


///////////////////////////////////////////////////////////////////////////////////Janitorial Function\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

/**
 * immediately deletes all tasks from the server
 *
 */
async function FULLSTOP() {
  taskLists["toDo"] = [];
  taskLists["inProgress"] = [];
  taskLists["feedback"] = [];
  taskLists["done"] = [];

  await setItem("toDo", JSON.stringify(taskLists["toDo"]));
  await setItem("inProgress", JSON.stringify(taskLists["inProgress"]));
  await setItem("feedback", JSON.stringify(taskLists["feedback"]));
  await setItem("done", JSON.stringify(taskLists["done"]));
  board_closeOverlay();
  board_loadTasks();
}
