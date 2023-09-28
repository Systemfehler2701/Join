const TaskLists = {
  ToDo: [],
  InProgress: [],
  Awaiting: [],
  Done: [],
};
let subtasks = [];
let subtasksDone = []
let Prio = [];
let priorities = [
  {
    priority: "Urgent",
    symbol: "../img/Prio alta.png",
    color: "rgb(255, 61, 0)",
  },
  {
    priority: "Medium",
    symbol: "../img/Prio media.png",
    color: "rgb(255, 168, 0)",
  },
  {
    priority: "Medium",
    symbol: "../img/Prio baja.png",
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
      subtasksDone: subtasksDone
    };
    TaskLists[list].push(data);

    resetForm();
    await setItem(list, JSON.stringify(TaskLists[list]));
    closeOverlay();
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
  }
  subtasks.push(newSubtask);
  subtask.value = "";
  renderSubtasks();
}

function renderSubtasks() {
  let subTaskDisplay = document.getElementById("addedSubtasks");
  subTaskDisplay.innerHTML = "";
  for (let i = 0; i < subtasks.length; i++) {
    let subtaskelement = subtasks[i];
    subTaskDisplay.innerHTML += `
    <div id="subtaskContainer${i}">
      <div onmouseover="displaySubtaskButtons(${i})" class="subtaskElement">${subtaskelement['task']}</div>
    </div>
    `;
  }
}

function displaySubtaskButtons(i) {
  let subtaskelement = subtasks[i];
  let subTaskDisplay = document.getElementById(`subtaskContainer${i}`);
  subTaskDisplay.innerHTML = "";
  subTaskDisplay.innerHTML = `
    <div class="subtaskElement" onmouseout="renderSubtasks()" id="subtask${i}">
    ${subtaskelement['task']}
      <div>
        <img onclick="cutSubtask(${i})" src="../img/delete.svg" alt="">
        <img onclick="editSubtask(${i})" src="../img/edit.svg" alt="">
      </div>
    </div>
    `;
  
}

function cutSubtask(i) {
  subtasks.splice(i, 1);
  renderSubtasks();
}

function editSubtask(i) {
  let currentValue = subtasks[i]['task']
  let subTaskDisplay = document.getElementById("subtaskContainer");
  subTaskDisplay.innerHTML = "";
  subTaskDisplay.innerHTML = `
    <div id="subtask${i}" class="subtaskElement">
      <input type="text" id="editedInput" value="${currentValue}" "saveEdit(${i})" />
      <div>
        <img onclick="cutSubtask(${i})" src="../img/delete.svg" alt="">
        <img onclick="saveEdit(${i})" src="../img/Vector 17.svg" alt="">
      </div>
    </div>
    `;
}

function saveEdit(i) {
  let editedValue = document.getElementById("editedInput").value;
  subtasks[i]['task'] = editedValue
  renderSubtasks();
}

function changeSubtaskAppearance() {
  if (document.getElementById("subtasks").value != "") {
    document.getElementById("subtaskField").innerHTML = `
    <img onclick="clearSubtask()" src="../img/close.svg" alt="">
    <img src="../img/Vector 3.svg" alt="">
    <img onclick="addSubtask()" src="../img/Vector 17.svg" alt="">
    `;
  } else {
    document.getElementById("subtaskField").innerHTML =
      '<img src="../img/Subtasks icons11.svg" alt="">';
  }
}


function clearSubtask() {
  document.getElementById("subtasks").value = "";
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
  if (category == null) {
    document.getElementById("errorCategory").style.display = "block";
    validitiy = false;
  }
  if (Prio == null) {
    document.getElementById("errorPrio").style.display = "block";
    validitiy = false;
  }

  return validitiy;
}
