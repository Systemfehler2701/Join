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

async function task_addTask(list) {
  task_resetError();
  let data = task_compileTaskData();
  if (data != "error") {
    taskLists[list].push(data);
    task_resetForm();
    await setItem(list, JSON.stringify(taskLists[list]));
    board_closeOverlay();
    board_loadTasks();
  }
}

async function task_addEditedTask(list, i) {
  task_resetError();
  let data = task_compileTaskData();
  if (data != "error") {
    taskLists[list][i] = data;
    task_CheckFinishedSubtasks(list, i);
    task_resetForm();
    await setItem(list, JSON.stringify(taskLists[list]));

    board_closeOverlay();
    board_loadTasks();
  }
}

function task_resetForm() {
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("assign_select").value = null;
  document.getElementById("due").value = "";
  document.getElementById("category_selector").value = null;
}

function task_resetArrays() {
  Prio = [];
  subtasks = [];
  subtasksDone = [];
  assignees = [];
}

function task_getPrioforEditor(array, i) {
  let x = null;
  let task = taskLists[array][i];
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

function task_setPrio(x) {
  Prio = [];
  Prio.push(priorities[x]);
  task_colorPriorityButtons(x);
}

function task_addSubtask() {
  subtask = document.getElementById("subtasks");
  let newSubtask = {
    task: subtask.value,
    done: 0,
  };
  subtasks.push(newSubtask);
  subtask.value = "";
  task_renderSubtasks();
}

function task_addSubtasksOnEnter(event) {
  subtask = document.getElementById("subtasks");
  if (event.keyCode == 13) {
    event.preventDefault();
    if (subtask != "") {
      task_addSubtask();
    }
  }
}

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

function task_cutSubtask(i) {
  subtasks.splice(i, 1);
  task_renderSubtasks(i);
}

function task_editSubtask(i) {
  let currentValue = subtasks[i]["task"];
  let subTaskDisplay = document.getElementById(`subtask${i}`);
  subTaskDisplay.innerHTML = "";
  subTaskDisplay.innerHTML = `
      <input type="text" id="editedInput${i}" value="${currentValue}"  />
      <div>
        <img onclick="cutSubtask( ${i})" src="/assets/img/delete.svg" alt="">
        <img onclick="saveSubtaskEdit(${i})" src="/assets/img/Vector 17.svg" alt="">
      </div>
    `;
}

function task_saveSubtaskEdit(i) {
  let editedValue = document.getElementById(`editedInput${i}`).value;
  subtasks[i]["task"] = editedValue;
  task_renderSubtasks();
}

function task_clearSubtask() {
  document.getElementById("subtasks").value = "";
}

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

function task_renderCategoryOptions() {
  let selector = document.getElementById("category_selector");
  for (let index = 0; index < categories.length; index++) {
    const category = categories[index];
    selector.innerHTML += `
        <option value="${index}">${category["name"]}</option>
        `;
  }
}

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

function task_toggleAssigneeOptions(clickedElement) {
  let selector = document.getElementById("assigneeOptionContainer");
  let selectorButton = document.getElementById("assignmentSelectButton");
  let optionsOpen = selector.style.display == "flex";

  if (optionsOpen == false) {
    selector.style.display = "flex";
    selectorButton.classList.add("flip");
    task_renderAssigneeOptions();
  } else if (clickedElement == selectorButton) {
    selector.style.display = "none";
    selectorButton.classList.remove("flip");
    task_renderAssigneeOptions();
  }
}

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

function task_resetError() {
  document.getElementById("errorTitle").style.display = "none";
  document.getElementById("errorDate").style.display = "none";
  document.getElementById("errorDate").style.display = "none";
  document.getElementById("errorPriority").style.display = "none";
  document.getElementById("errorCategory").style.display = "none";
}

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

function task_createAssignedContact(user, index) {
  let selector = document.getElementById("assign_select");
  selector.innerHTML += /*html*/ `
  <div id="assignee${index}" class="assigneeOption" value="${index}">
    <div class="initials-logo" style="background-color: ${
      user.color
    }">${getInitials(user.name)}</div>
    <div class="assigneeName">${user.name}</div>
    <img id="assigneeCheckbox${index}" onclick="task_unassign(${index})" class="checkbox" src="/assets/img/Check button.svg" alt="">
</div>
`;
}

function task_createUnassignedContact(user, index) {
  let selector = document.getElementById("assign_select");
  selector.innerHTML += /*html*/ `
  <div id="assignee${index}" class="assigneeOption" value="${index}">
    <div class="initials-logo" style="background-color: ${
      user.color
    }">${getInitials(user.name)}</div>
    <div class="assigneeName">${user.name}</div>
    <img id="assigneeCheckbox${index}" onclick="task_assign(${index})" class="checkbox" src="/assets/img/Rectangle 5.svg" alt="">
</div>
`;
}

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
