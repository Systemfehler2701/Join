let overlay;
let overlayBody;
let blocker;
let todoList;
let progressList;
let waitingList;
let doneList;

async function board_loadTasks() {
  board_assignDocuments();

  await board_loadFromStorage("toDo");
  await board_loadFromStorage("inProgress");
  await board_loadFromStorage("feedback");
  await board_loadFromStorage("done");

  board_renderToDo();
  board_renderInProgress();
  board_renderFeedback();
  board_renderDone();
  task_resetArrays();
}

function board_assignDocuments() {
  overlay = document.getElementById("BoardOverlay");
  overlayBody = document.getElementById("boardOverlaybody");
  blocker = document.getElementById("blocker");
  todoList = document.getElementById("toDo");
  progressList = document.getElementById("inProgress");
  waitingList = document.getElementById("awaitFeedback");
  doneList = document.getElementById("done");
}

function board_search() {
  board_searchByList(todoList, "toDo");
  board_searchByList(progressList, "inProgress");
  board_searchByList(waitingList, "feedback");
  board_searchByList(doneList, "done");
}

function board_searchByList(list, arrayAsString) {
  let search = document.getElementById("taskSearch").value;
  search = search.toLowerCase();
  list.innerHTML = "";
  tasks = taskLists[arrayAsString];
  for (let j = 0; j < tasks.length; j++) {
    let task = tasks[j];
    if (task["title"].toLowerCase().includes(search)) {
      list.innerHTML += board_createTaskCard(arrayAsString, j);
      board_subTaskProgress(arrayAsString, j);
    }
  }
}

function board_resetSearch() {
  let search = document.getElementById("taskSearch").value;
  if (search == "") {
    board_renderToDo();
    board_renderInProgress();
    board_renderFeedback();
    board_renderDone();
  }
}


function board_search() {
  board_searchByList(todoList, "toDo");
  board_searchByList(progressList, "inProgress");
  board_searchByList(waitingList, "feedback");
  board_searchByList(doneList, "done");
}

function board_searchByList(list, arrayAsString) {
  let search = document.getElementById("taskSearch").value;
  search = search.toLowerCase();
  list.innerHTML = "";
  let tasks = taskLists[arrayAsString];
  for (let j = 0; j < tasks.length; j++) {
    let task = tasks[j];
    if (
      task["title"].toLowerCase().includes(search) ||
      task["description"].toLowerCase().includes(search)
    ) {
      list.innerHTML += board_createTaskCard(arrayAsString, j);
      board_subTaskProgress(arrayAsString, j);
      board_displayAssignees(arrayAsString, j);
    }
  }
}

function board_resetSearch() {
  let search = document.getElementById("taskSearch").value;
  if (search == "") {
    board_renderToDo();
    board_renderInProgress();
    board_renderFeedback();
    board_renderDone();
  }
}

function board_addTask(arrayAsString) {
  overlay.style.display = "flex";
  overlayBody.innerHTML = "";
  overlayBody.innerHTML = createNewTask(arrayAsString);
  task_renderCategoryOptions();
  task_renderAssigneeOptions();
  blocker.onclick = function () {
    board_closeOverlay();
  };
}

function board_renderFullTaskCard(arrayAsString, i) {
  overlay.style.display = "flex";
  overlayBody.innerHTML = "";
  overlayBody.innerHTML = createFullTaskCard(arrayAsString, i);
  board_renderSubtasksFull(arrayAsString, i);
  board_displayAssigneesFull(arrayAsString, i);
  blocker.onclick = function () {
    board_closeOverlay();
  };
}

async function board_cutTask(arrayAsString, i) {
  taskLists[arrayAsString].splice(i, 1);
  await setItem(arrayAsString, JSON.stringify(taskLists[arrayAsString]));
  board_closeOverlay();
  board_loadTasks();
}

function board_renderWarning(arrayAsString, i) {
  document.getElementById("DeleteOverlay").style.display = "flex";
  document.getElementById("DeleteOverlaybody").innerHTML = "";
  document.getElementById("DeleteOverlaybody").innerHTML = /*html*/ `
    <h2>Are you sure you want to delete this Task?</h2>
    <div class="DeleteOptions">
      <button class="create" onclick="board_cutTask('${arrayAsString}', ${i})">Delete</button>
      <button class="backbutton" onclick="board_GoBack()">Back</button>
    </div>
  `;
}

function board_GoBack() {
  document.getElementById("DeleteOverlay").style.display = "none";
}

function board_editTask(arrayAsString, i) {
  let x = task_getPrioforEditor(arrayAsString, i);
  overlayBody.innerHTML = board_createTaskEditor(arrayAsString, i);
  task_renderSubtasks();
  task_renderAssigneeOptions();
  task_renderAssigneeList();
  if (x != null) {
    task_setPrio(x);
  }
}

function board_closeOverlay() {
  overlay.style.display = "none";
  overlayBody.innerHTML = "";
  task_resetArrays();
  board_loadTasks();
}

function board_showProgress() {
  let progress = answeredQuestions / subtasks.length;
  progress = Math.round(progress * 100);
  document.getElementById("progressBar").value = `${progress}% `;
}

function board_renderToDo() {
  let todoList = document.getElementById("toDo");
  if (taskLists["toDo"].length == 0) {
    board_renderPlaceholder(todoList, "No tasks to do");
  } else {
    board_renderCard(todoList, "toDo");
  }
}

function board_renderInProgress() {
  let progressList = document.getElementById("inProgress");
  if (taskLists["inProgress"].length == 0) {
    board_renderPlaceholder(progressList, "No tasks in progress");
  } else {
    board_renderCard(progressList, "inProgress");
  }
}

function board_renderFeedback() {
  let waitingList = document.getElementById("awaitFeedback");
  if (taskLists["feedback"].length == 0) {
    board_renderPlaceholder(waitingList, "No tasks awaiting feedback");
  } else {
    board_renderCard(waitingList, "feedback");
  }
}

function board_renderDone() {
  let doneList = document.getElementById("done");
  if (taskLists["done"].length == 0) {
    board_renderPlaceholder(doneList, "No tasks done yet");
  } else {
    board_renderCard(doneList, "done");
  }
}

function board_renderPlaceholder(List, placeholder) {
  List.innerHTML = `
    <div class="placeholder">
        <p>${placeholder}</p>
    </div>
    `;
}

function board_renderCard(list, arrayAsString) {
  let array = taskLists[arrayAsString]
  list.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    list.innerHTML += board_createTaskCard(arrayAsString, i);
    board_subTaskProgress(arrayAsString, i);
    board_displayAssignees(arrayAsString, i);
  }
}

async function board_loadFromStorage(list) {
  try {
    taskLists[list] = JSON.parse(await getItem(list));
  } catch {
    console.error("Loading error:");
  }
}

function board_renderSubtasksFull(arrayAsString, i) {
  let subtaskList = taskLists[arrayAsString][i]["subtasks"];
  let allSubtasks = document.getElementById("SubtaskListFull");
  allSubtasks.innerHTML = "";
  for (let j = 0; j < subtaskList.length; j++) {
    let subtask = subtaskList[j];
    if (subtask["done"] == 0) {
      allSubtasks.innerHTML += `
      <div class="singleSubtaskFull">
        <img id="checkbox${j}" class="checkbox" onclick="board_finishSubtask('${arrayAsString}', ${i}, ${j})" src="/assets/img/Rectangle 5.svg" alt="">
        ${subtask["task"]}
      </div>
      `;
    } else {
      allSubtasks.innerHTML += `
      <div class="singleSubtaskFull">
        <img id="checkbox${j}" class="checkbox" onclick="board_revertSubtask('${arrayAsString}', ${i}, ${j})" src="/assets/img/Check button.svg" alt="">
        ${subtask["task"]}
      </div>
      `;
    }
  }
}

async function board_finishSubtask(arrayAsString, i, j) {
  let subtaskList = taskLists[arrayAsString][i]["subtasks"];
  subtaskList[j]["done"] = 1;
  taskLists[arrayAsString][i]["subtasksDone"].push(subtaskList[j]);

  board_renderSubtasksFull(arrayAsString, i);
  await setItem(arrayAsString, JSON.stringify(taskLists[arrayAsString]));
}

async function board_revertSubtask(arrayAsString, i, j) {
  let subtaskList = taskLists[arrayAsString][i]["subtasks"];
  subtaskList[j]["done"] = 0;
  taskLists[arrayAsString][i]["subtasksDone"].splice(0, 1);

  board_renderSubtasksFull(arrayAsString, i);
  await setItem(arrayAsString, JSON.stringify(taskLists[arrayAsString]));
}

function board_subTaskProgress(arrayAsString, i) {
  let task = taskLists[arrayAsString][i];
  if (task["subtasks"].length == 0) {
    document.getElementById(`subtaskscard${arrayAsString}${i}`).style.display = "none";
  } else {
    let progress = task["subtasksDone"].length / task["subtasks"].length;
    progress = Math.round(progress * 100);
    document.getElementById(`progressbar${arrayAsString}${i}`).value = progress;
  }
}

function board_displayAssignees(arrayAsString, i) {
  let task = taskLists[arrayAsString][i];
  let assigned = task["assignees"];
  for (let j = 0; j < assigned.length; j++) {
    const assigneeNumber = assigned[j];
    let user = users[assigneeNumber];
    document.getElementById(`assignees${arrayAsString}${i}`).innerHTML += /*html*/ `
    <div class="initials-logo" style="background-color: ${user.color}">${getInitials(user.name)}</div>
  `;
  }
}

function board_displayAssigneesFull(arrayAsString, i) {
  let task = taskLists[arrayAsString][i];
  let assigned = task["assignees"];
  for (let j = 0; j < assigned.length; j++) {
    const assigneeNumber = assigned[j];
    let user = users[assigneeNumber];
    document.getElementById(`assigneeListFull`).innerHTML += /*html*/ `
    <div class="assigneeFull">
      <div class="initials-logo" style="background-color: ${user.color}">${getInitials(user.name)}</div>
      <div class="assigneeNameFull">${user.name}</div>
    </div>
    `;
  }
}

function getCurrentDate() {
  let currentDay = ("0" + new Date().getDate()).slice(-2);
  let currentMonth = ("0" + (new Date().getMonth() + 1)).slice(-2);
  let currentYear = new Date().getFullYear();

  return { currentYear, currentMonth, currentDay };
}

//////////////////////////////////////////////////////// HTML DUMP \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//////////////////////////////////////////////////////// HTML DUMP \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function createFullTaskCard(arrayAsString, i) {
  let task = taskLists[arrayAsString][i];
  let category = task["category"];
  let date = new Date(task["dueDate"]).toLocaleString("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return /*html*/ `
  <section id="DeleteOverlay" class="Boardoverlay" style="display: none;">
     <div onclick="board_GoBack()" id ="Deleteblocker" class="blocker"></div>
     <div id="DeleteOverlaybody" class="overlayBlank"></div>
  </section>
  <div class="FullTaskCard">
    <div class="cardheadFull">
        <div class="categorycardFull" style="background-color: ${categories[category]["color"]};">${categories[category]["name"]}</div>
            <img onclick="board_closeOverlay()" src="/assets/img/close.svg" alt="">
        </div>
        <h2 class="titleFull">${task["title"]}</h2>
        <p class="descriptionFull">
           ${task["description"]}
        </p>
        <div class="duedateFull">
            <p>Due Date:</p>
        <p>${date}</p>
        </div>
    <div class="prioFull">
        <p>Priority:</p>
        <div>
            ${task["priority"]["priority"]}
            <img class="prioPictureFull" src="${task["priority"]["symbol"]}" alt="">
        </div>
    </div>
    <div class="assigneesFull">
            <p>Assigned to:</p>
        <div class="assigneeListFull" id="assigneeListFull"></div>
    </div>
    <div class="subtasksFull">
        <p>Subtasks:</p>
        <div id="SubtaskListFull" class="subtaskListFull"></div>
      </div>
    
    <div class="editorbarFull">
        <button onclick="board_renderWarning('${arrayAsString}}', ${i})" class="del">Delete</button>
        <img src="/assets/img/Vector 3.svg" alt="">
        <button onclick="board_editTask('${arrayAsString}', ${i})" class="edit">Edit</button>
    </div>
  </div>
    `;
}

function board_createTaskCard(arrayAsString, i) {
  let task = taskLists[arrayAsString][i];
  let category = task["category"];
  return /*html*/ `
      <div draggable="true" ondragstart="startDragging('${arrayAsString}',${i})" onclick="board_renderFullTaskCard('${arrayAsString}', ${i})" class="taskcard">
        <div class="categorycard" style="background-color: ${categories[category]["color"]};">${categories[category]["name"]}</div>
        <h2>${task["title"]}</h2>
        <p class="descriptioncard">
            ${task["description"]}
        </p>
        <div id="subtaskscard${arrayAsString}${i}" class="subtaskscard">
            <label>${task["subtasksDone"].length}/${task["subtasks"].length} Subtasks</label>
            <progress id="progressbar${arrayAsString}${i}" max="100" value="0"></progress>
        </div>
        <div class="cardBottom">
            <div id="assignees${arrayAsString}${i}" class="assignees"></div>
            <img src="${task["priority"]["symbol"]}" alt=""> 
        </div>
      </div>
    `;
}

function board_createTaskEditor(arrayAsString, i) {
  let task = taskLists[arrayAsString][i];
  subtasks = task["subtasks"];
  assignees = task["assignees"];
  let date = new Date(task["dueDate"]);

  let day = ("0" + date.getDate()).slice(-2);
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let year = date.getFullYear();
  return /*html*/ `
<div class="cardheadEdit">
  <img onclick="board_closeOverlay()" src="/assets/img/close.svg" alt="">
</div>
<div class="TaskEditorBody scroll">
    <input id="category_selector" style="display: none" value="${task["category"]}" type="text">
<div class="titleEdit">
  <h2>Title</h2>
  <input id="title" type="textbox" placeholder="Enter a title" value="${task["title"]}">
  <div class="Taskerror" style="display: none;" id="errorTitle"> This field needs to be filled out</div>
</div>
<div class="descriptionEdit">
  <h2>Description</h2>
  <textarea name="" class="scroll" id="description" cols="56" rows="10" placeholder="Enter a Description">${task["description"]}</textarea>
</div>
<div class="duedateEdit">
    <p>Due Date:</p>
    <input id="due" type="date" data-date="" data-date-format="DD MMMM YYYY" value="${year}-${month}-${day}">
    <div class="Taskerror" style="display: none;" id="errorDate">You can not select a date that is in the Past</div>
</div>
<div class="prioEdit">
    <p>Priority:</p>
      <div class="priocontainerEdit">
        <div onclick="task_setPrio(0)" id="Prio0">
          Urgent
          <img id="Prio0_img" src="/assets/img/Prio_alta.png" class="">
        </div>
        <div onclick="task_setPrio(1)" id="Prio1">
          Medium
          <img id="Prio1_img" src="/assets/img/Prio_media.png" class="">
        </div>
        <div onclick="task_setPrio(2)" id="Prio2">
          Low
          <img id="Prio2_img" src="/assets/img/Prio_baja.png" class="">
        </div>
      </div>
      <div class="Taskerror" style="display: none;" id="errorPriority"> You need to Select a Priority</div>
      <div class="Taskerror" style="display: none;" id="errorCategory">You need to Select a Category</div>
</div>
<div class="assignment">
    <h2>Assigned to</h2>
    <div  class="assignmentInput" id="assignmentInput">
      <input onclick="task_toggleAssigneeOptions(this)" onkeyup="task_searchAssignees()" id="assigner" class="assignmentSelect" placeholder="Select contact to assign">
      <div id="assignmentSelectButton" onclick="task_toggleAssigneeOptions(this)">
        <img src="/assets/img/arrow_drop_downaa.svg" alt="">
      </div>
    </div> 
    <div class="assigneeOptionContainer" id="assigneeOptionContainer" style="display: none">
        <div  id="assign_select" class="assignmentContainer scroll"></div>
        <div class="ContactButtonContainer">
            <div class="newContactButton" id="assignmentNewContact">Add New contact
                <img src="/assets/img/person_add.svg" alt="">
            </div> 
        </div>
    </div>
    <div class="assigneeList" id="assigneeList"></div>
</div>
<div class="subtasksEdit">
    <p>Subtasks:</p>
    <div>
        <input onkeyup="task_changeSubtaskAppearance()" onkeydown="task_addSubtasksOnEnter(event)" id="subtasks" type="text" placeholder="Add new Subtask">
        <div class="subtaskimages" id="subtaskField">
            <img src="/assets/img/Subtasks icons11.svg" alt="">
        </div>
    </div>
    <div class="addedSubtasks" id="addedSubtasks"></div>
</div>
</div>
<div class="editorBottom">
  <button onclick="task_addEditedTask('${arrayAsString}', ${i})" class="create">Ok</button>
</div>
</div>
`;
}
