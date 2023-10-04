let overlay;
let overlayBody;
let blocker;
let todoList;
let progressList;
let waitingList;
let doneList;

async function Board_loadTasks() {
  assignDocuments();

  await Board_loadFromStorage("ToDo");
  await Board_loadFromStorage("InProgress");
  await Board_loadFromStorage("Awaiting");
  await Board_loadFromStorage("Done");

  Board_renderToDo();
  Board_renderInProgress();
  Board_renderAwaiting();
  Board_renderDone();
  resetArrays();
}

function assignDocuments() {
  overlay = document.getElementById("BoardOverlay");
  overlayBody = document.getElementById("boardOverlaybody");
  blocker = document.getElementById("blocker");
  todoList = document.getElementById("ToDo");
  progressList = document.getElementById("inProgress");
  waitingList = document.getElementById("awaitFeedback");
  doneList = document.getElementById("done");
}

function Board_search() {
  Board_searchByList(todoList, "ToDo");
  Board_searchByList(progressList, "InProgress");
  Board_searchByList(waitingList, "Awaiting");
  Board_searchByList(doneList, "Done");
}

function Board_searchByList(list, array) {
  let search = document.getElementById("taskSearch").value;
  search = search.toLowerCase();
  list.innerHTML = "";
  tasks = TaskLists[array];
  for (let j = 0; j < tasks.length; j++) {
    let task = tasks[j];
    if (task["title"].toLowerCase().includes(search)) {
      list.innerHTML += Board_createTaskCard(tasks, j, array);
      Board_subTaskProgress(tasks, j);
    }
  }
}

function Board_resetSearch() {
  let search = document.getElementById("taskSearch").value;
  if (search == "") {
    Board_renderToDo();
    Board_renderInProgress();
    Board_renderAwaiting();
    Board_renderDone();
  }
}

function Board_addTask(array) {
  overlay.style.display = "flex";
  overlayBody.innerHTML = "";
  overlayBody.innerHTML = createNewTask(array);
  renderCategoryOptions();
  renderAssigneeOptions();
  blocker.onclick = function () {
    Board_closeOverlay();
  };
}

function Board_renderFullTaskCard(array, i) {
  overlay.style.display = "flex";
  overlayBody.innerHTML = "";
  overlayBody.innerHTML = createFullTaskCard(array, i);
  Board_renderSubtasksFull(array, i);
  blocker.onclick = function () {
    Board_closeOverlay();
  };
}

async function Board_cutTask(array, i) {
  TaskLists[array].splice(i, 1);
  await setItem(array, JSON.stringify(TaskLists[array]));
  Board_closeOverlay();
  Board_loadTasks();
}

function Board_renderWarning(array, i) {
  document.getElementById("DeleteOverlay").style.display = "flex";
  document.getElementById("DeleteOverlaybody").innerHTML = "";
  document.getElementById("DeleteOverlaybody").innerHTML = /*html*/ `
    <h2>Are you sure you want to delete this Task?</h2>
    <div class="DeleteOptions">
      <button class="create" onclick="Board_cutTask('${array}', ${i})">Delete</button>
      <button class="clear" onclick="Board_GoBack()">Go Back</button>
    </div>
  `;
}

function Board_GoBack() {
  document.getElementById("DeleteOverlay").style.display = "none";
}

function Board_editTask(array, i) {
  let x = getPrioforEditor(array, i);
  overlayBody.innerHTML = Board_createTaskEditor(array, i);
  renderSubtasks()
  renderAssigneeOptions();
  if (x != null) {
    setPrio(x);
  }
}

function Board_closeOverlay() {
  overlay.style.display = "none";
  overlayBody.innerHTML = "";
  resetArrays()
  Board_loadTasks();
}

function Board_showProgress() {
  let progress = answeredQuestions / subtasks.length;
  progress = Math.round(progress * 100);
  document.getElementById("progressBar").value = `${progress}% `;
}

function Board_renderToDo() {
  let todoList = document.getElementById("ToDo");
  if (TaskLists["ToDo"].length == 0) {
    Board_renderPlaceholder(todoList, "No tasks to do");
  } else {
    Board_renderCard(todoList, TaskLists["ToDo"], "ToDo");
  }
}

function Board_renderInProgress() {
  let progressList = document.getElementById("inProgress");
  if (TaskLists["InProgress"].length == 0) {
    Board_renderPlaceholder(progressList, "No tasks in progress");
  } else {
    Board_renderCard(progressList, TaskLists["InProgress"], "InProgress");
  }
}

function Board_renderAwaiting() {
  let waitingList = document.getElementById("awaitFeedback");
  if (TaskLists["Awaiting"].length == 0) {
    Board_renderPlaceholder(waitingList, "No tasks awaiting feedback");
  } else {
    Board_renderCard(waitingList, TaskLists["Awaiting"], "Awaiting");
  }
}

function Board_renderDone() {
  let doneList = document.getElementById("done");
  if (TaskLists["Done"].length == 0) {
    Board_renderPlaceholder(doneList, "No tasks done yet");
  } else {
    Board_renderCard(doneList, TaskLists["Done"], "Done");
  }
}

function Board_renderPlaceholder(List, placeholder) {
  List.innerHTML = `
    <div class="placeholder">
        <p>${placeholder}</p>
    </div>
    `;
}

function Board_renderCard(list, array, arrayName) {
  list.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    list.innerHTML += Board_createTaskCard(array, i, arrayName);
    Board_subTaskProgress(array, i, arrayName);
    Board_displayAssignees(array, i, arrayName);
  }
}

async function Board_loadFromStorage(list) {
  try {
    TaskLists[list] = JSON.parse(await getItem(list));
  } catch {
    console.error("Loading error:");
  }
}

function Board_renderSubtasksFull(array, i) {
  let subtaskList = TaskLists[array][i]["subtasks"];
  let allSubtasks = document.getElementById("SubtaskListFull");
  allSubtasks.innerHTML = "";
  for (let j = 0; j < subtaskList.length; j++) {
    let subtask = subtaskList[j];
    if (subtask["done"] == 0) {
      allSubtasks.innerHTML += `
      <div class="singleSubtaskFull">
        <img id="checkbox${j}" class="checkbox" onclick="finishSubtask('${array}', ${i}, ${j})" src="/assets/img/Rectangle 5.svg" alt="">
        ${subtask["task"]}
      </div>
      `;
    } else {
      allSubtasks.innerHTML += `
      <div class="singleSubtaskFull">
        <img id="checkbox${j}" class="checkbox" onclick="revertSubtask('${array}', ${i}, ${j})" src="/assets/img/Check button.svg" alt="">
        ${subtask["task"]}
      </div>
      `;
    }
  }
}

async function finishSubtask(array, i, j) {
  let subtaskList = TaskLists[array][i]["subtasks"];
  subtaskList[j]["done"] = 1;
  TaskLists[array][i]["subtasksDone"].push(subtaskList[j]);

  Board_renderSubtasksFull(array, i);
  await setItem(array, JSON.stringify(TaskLists[array]));
}

async function revertSubtask(array, i, j) {
  let subtaskList = TaskLists[array][i]["subtasks"];
  subtaskList[j]["done"] = 0;
  TaskLists[array][i]["subtasksDone"].splice(0, 1);

  Board_renderSubtasksFull(array, i);
  await setItem(array, JSON.stringify(TaskLists[array]));
}

function Board_subTaskProgress(array, i, arrayName) {
  let task = array[i];
  if (task["subtasks"].length == 0) {
    document.getElementById(`subtaskscard${i}`).style.display = "none";
  } else {
    let progress = task["subtasksDone"].length / task["subtasks"].length;
    progress = Math.round(progress * 100);
    document.getElementById(`progressbar${arrayName}${i}`).value = progress;
  }
}

function Board_displayAssignees(array, i) {
  let task = array[i];
  let assigned = task["assignees"];
  for (let j = 0; j < assigned.length; j++) {
    const assigneeNumber = assigned[j];
    let user = users[assigneeNumber];
    document.getElementById(`assignees${i}`).innerHTML += /*html*/ `
    <div class="initials-logo">${getInitials(user.name)}</div>
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

function createFullTaskCard(array, i) {
  let task = TaskLists[array][i];
  let category = task["category"];
  let date = new Date(task["dueDate"]).toLocaleString("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return /*html*/ `
  <section id="DeleteOverlay" class="Boardoverlay" style="display: none;">
     <div onclick="Board_GoBack()" id ="Deleteblocker" class="blocker"></div>
     <div id="DeleteOverlaybody" class="overlayBlank"></div>
  </section>
  <div class="FullTaskCard">
    <div class="cardheadFull">
        <div class="categorycardFull" style="background-color: ${categories[category]["color"]};">${categories[category]["name"]}</div>
            <img onclick="Board_closeOverlay()" src="/assets/img/close.svg" alt="">
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
    </div>
    <div class="subtasksFull">
        <p>Subtasks:</p>
        <div id="SubtaskListFull" class="subtaskListFull"></div>
      </div>
    
    <div class="editorbarFull">
        <button onclick="Board_renderWarning('${array}', ${i})" class="del">Delete</button>
        <img src="/assets/img/Vector 3.svg" alt="">
        <button onclick="Board_editTask('${array}', ${i})" class="edit">Edit</button>
    </div>
  </div>
    `;
}

function Board_createTaskCard(array, i, arrayName) {
  let task = array[i];
  let category = task["category"];
  return /*html*/ `
      <div onclick="Board_renderFullTaskCard('${arrayName}', ${i})" class="taskcard">
        <div class="categorycard" style="background-color: ${categories[category]["color"]};">${categories[category]["name"]}</div>
        <h2>${task["title"]}</h2>
        <p class="descriptioncard">
            ${task["description"]}
        </p>
        <div id="subtaskscard${i}" class="subtaskscard">
            <label>${task["subtasksDone"].length}/${task["subtasks"].length} Subtasks</label>
            <progress id="progressbar${arrayName}${i}" max="100" value="0"></progress>
        </div>
        <div class="cardBottom">
            <div id="assignees${i}" class="assignees"></div>
            <img src="${task["priority"]["symbol"]}" alt=""> 
        </div>
      </div>
    `;
}

function Board_createTaskEditor(array, i) {
  let task = TaskLists[array][i];
  subtasks = task["subtasks"];
  assignees = task["assignees"];
  let date = new Date(task["dueDate"]);

  let day = ("0" + date.getDate()).slice(-2);
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let year = date.getFullYear();
  return /*html*/ `
<div class="cardheadEdit">
  <img onclick="Board_closeOverlay()" src="/assets/img/close.svg" alt="">
</div>
<div class="TaskEditorBody">
    <input id="category_selector" style="display: none" value="${task["category"]}" type="text">
<div class="titleEdit">
  <h2>Title</h2>
  <input id="title" type="textbox" placeholder="Enter a title" value="${task["title"]}">
  <div class="Taskerror" style="display: none;" id="errorTitle"> This field needs to be filled out</div>
</div>
<div class="descriptionEdit">
  <h2>Description</h2>
  <textarea name="" id="description" cols="56" rows="10" placeholder="Enter a Description">${task["description"]}</textarea>
</div>
<div class="duedateEdit">
    <p>Due Date:</p>
    <input id="due" type="date" data-date="" data-date-format="DD MMMM YYYY" value="${year}-${month}-${day}">
    <div class="Taskerror" style="display: none;" id="errorDate">You can not select a date that is in the Past</div>
</div>
<div class="prioEdit">
    <p>Priority:</p>
      <div class="priocontainerEdit">
        <div onclick="setPrio(0)" id="Prio0">
          Urgent
          <img id="Prio0_img" src="/assets/img/Prio_alta.png" class="">
        </div>
        <div onclick="setPrio(1)" id="Prio1">
          Medium
          <img id="Prio1_img" src="/assets/img/Prio_media.png" class="">
        </div>
        <div onclick="setPrio(2)" id="Prio2">
          Low
          <img id="Prio2_img" src="/assets/img/Prio_baja.png" class="">
        </div>
      </div>
      <div class="Taskerror" style="display: none;" id="errorPriority"> You need to Select a Priority</div>
      <div class="Taskerror" style="display: none;" id="errorCategory">You need to Select a Category</div>
</div>
<div class="assignment">
    <h2>Assigned to</h2>
    <div onclick="openAssigneeOptions()" id="assigner" class="assignmentSelect">Select contacts to assign</div>
    <div style="display: none" id="assign_select" class="assignmentContainer"></div>
</div>
<div class="subtasksEdit">
    <p>Subtasks:</p>
    <div>
        <input onkeyup="changeSubtaskAppearance()" id="subtasks" type="text" placeholder="Add new Subtask">
        <div class="subtaskimages" id="subtaskField">
            <img src="/assets/img/Subtasks icons11.svg" alt="">
        </div>
    </div>
    <div class="addedSubtasks" id="addedSubtasks"></div>
</div>
</div>
<div class="editorBottom">
  <button onclick="addEditedTask('${array}', ${i})" class="create">Ok</button>
</div>
</div>
`;
}
