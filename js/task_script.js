const TaskLists = {
  ToDo: [],
  InProgress: [],
  Awaiting: [],
  Done: [],
};

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

async function addTask(list) {
  resetError()
  let data = compileTaskData();
  if (data != "error") {
    TaskLists[list].push(data);
    resetForm();
    await setItem(list, JSON.stringify(TaskLists[list]));
    Board_closeOverlay();
    Board_loadTasks();
  }
}

async function addEditedTask(list, i) {
  resetError()
  let data = compileTaskData();
  if (data != "error") {
    TaskLists[list][i] = data;
    CheckFinishedSubtasks(list, i)
    resetForm();
    await setItem(list, JSON.stringify(TaskLists[list]));

    Board_closeOverlay();
    Board_loadTasks();
  }
}

function resetForm() {
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("assign_select").value = null;
  document.getElementById("due").value = "";
  document.getElementById("category_selector").value = null;
  Prio = [];
  subtasks = [];
  subtasksDone = [];
}

function getPrioforEditor(array, i) {
  let x = null;
  let task = TaskLists[array][i];
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

function setPrio(x) {
  Prio = [];
  Prio.push(priorities[x]);
  colorPriorityButtons(x);
}

function addSubtask() {
  subtask = document.getElementById("subtasks");
  let newSubtask = {
    task: subtask.value,
    done: 0,
  };
  subtasks.push(newSubtask);
  subtask.value = "";
  renderSubtasks();
}

function renderSubtasks() {
  let subTaskDisplay = document.getElementById("addedSubtasks");
  subTaskDisplay.innerHTML = "";
  for (let i = 0; i < subtasks.length; i++) {
    let subtaskelement = subtasks[i];
    subTaskDisplay.innerHTML += /*html*/`

    <div class="subtaskElement" id="subtask${i}">
      <div class="subtaskElementBody">
        <img class="dot" src="/assets/img/dot.svg" alt="">
        <p>${subtaskelement["task"]}</p>
      </div>
      <div class="subtaskTools">
        <img onclick="cutSubtask(${i})" src="/assets/img/delete.svg" alt="">
        <img onclick="editSubtask(${i})" src="/assets/img/edit.svg" alt="">
      </div>
    </div>
    `;
  }
}

function cutSubtask(i) {
  subtasks.splice(i, 1);
  renderSubtasks(i);
}

function editSubtask(i) {
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

function saveSubtaskEdit(i) {
  let editedValue = document.getElementById(`editedInput${i}`).value;
  subtasks[i]["task"] = editedValue;
  renderSubtasks();
}

function clearSubtask() {
  document.getElementById("subtasks").value = "";
}

function changeSubtaskAppearance() {
  if (document.getElementById("subtasks").value != "") {
    document.getElementById("subtaskField").innerHTML = /*html*/`

    <div class="buttonwrapper"><img onclick="clearSubtask()" src="/assets/img/close.svg" alt=""></div> 
    <img src="/assets/img/Vector 3.svg" alt="">
    <div class="buttonwrapper"><img onclick="addSubtask()" src="/assets/img/Vector 17.svg" alt=""></div>  
    `;
  } else {
    document.getElementById("subtaskField").innerHTML =
      '<img src="/assets/img/Subtasks icons11.svg" alt="">';
  }
}

function compileTaskData() {
  title = document.getElementById("title");
  description = document.getElementById("description");
  assignee = document.getElementById("assign_select");
  dueDate = document.getElementById("due");
  category = document.getElementById("category_selector");

  const validity = CheckInputValidity(
    title.value,
    dueDate.value,
    category.value
  );

  if (validity == true) {
    let date = new Date(dueDate.value);
    let data = {
      title: title.value,
      description: description.value,
      assignee: assignee.value,
      dueDate: date.getTime(),
      category: category.value,
      priority: Prio[0],
      subtasks: subtasks,
      subtasksDone: subtasksDone,
    };
    return data;
  } else {
    return('error');
  }
}

function colorPriorityButtons(x) {
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

function CheckFinishedSubtasks(list, i) {
  let subtasks = TaskLists[list][i]['subtasks']
  let finishedSubtasks = TaskLists[list][i]['subtasksDone']
  for (let j = 0; j < subtasks.length; j++) {
    let subtask = subtasks[j];
    if(subtask['done'] > 0) {
      finishedSubtasks.push(subtask)
    }
    
  }
}

function renderCategoryOptions() {
  let selector = document.getElementById("category_selector");
  for (let index = 0; index < categories.length; index++) {
    const category = categories[index];
    selector.innerHTML += `
        <option value="${index}">${category["name"]}</option>
        `;
  }
}


function resetError() {
  document.getElementById("errorTitle").style.display = "none";
  document.getElementById("errorDate").style.display = "none";
  document.getElementById("errorDate").style.display = "none";
  document.getElementById("errorPriority").style.display = "none";
  document.getElementById("errorCategory").style.display = "none";
}

function CheckInputValidity(title, dueDate, category) {
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
  if (category == 'null') {
    document.getElementById("errorCategory").style.display = "block";
    validitiy = false;
  }

  return validitiy;
}


async function FULLSTOP() {
  TaskLists['ToDo'] = []
  TaskLists['InProgress'] = []
  TaskLists['Awaiting'] = []

  await setItem('ToDo', JSON.stringify(TaskLists['ToDo']));
  await setItem('InProgress', JSON.stringify(TaskLists['InProgress']));
  await setItem('Awaiting', JSON.stringify(TaskLists['Awaiting']));
  Board_closeOverlay();
  Board_loadTasks();

}