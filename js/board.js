const overlay = document.getElementById("BoardOverlay");
const overlayBody = document.getElementById("boardOverlaybody");
const blocker = document.getElementById("blocker")

function Board_addTask(array) {
  overlay.style.display = "flex";
  overlayBody.innerHTML = "";
  overlayBody.innerHTML = createNewTask(array);
  Board_renderCategoryOptions();
  blocker.onclick = function () {
    resetForm();
    Board_closeOverlay();
  };
}

function Board_renderFullTaskCard(array, i) {
  overlay.style.display = "flex";
  overlayBody.innerHTML = "";
  overlayBody.innerHTML = createFullTaskCard(array, i);
  renderSubtasksFull(array, i);
  blocker.onclick = function () {
    Board_closeOverlay();
  };
}

async function Board_cutTask(array, i) {
  TaskLists[array].splice(i, 1)
  await setItem(array, JSON.stringify(TaskLists[array]))
  Board_closeOverlay();
  Board_loadTasks();
}

function Board_editTask(array, i) {
  let x = getPrioforEditor(array, i)
  overlayBody.innerHTML = Board_createTaskEditor(array, i)
  renderSubtasksFromTask(array, i)
  if(x != null) {
   setPrio(x) 
  }
}


function Board_closeOverlay() {
  overlay.style.display = "none";
  overlayBody.innerHTML = "";
  Board_loadTasks()
}

function Board_showProgress() {
  let progress = answeredQuestions / subtasks.length;
  progress = Math.round(progress * 100);
  document.getElementById("progressBar").value = `${progress}% `;
}

async function Board_loadTasks() {
  await Board_loadFromStorage("ToDo");
  await Board_loadFromStorage("InProgress");
  await Board_loadFromStorage("Awaiting");
  //await Board_loadFromStorage("Done");

  Board_renderToDo();
  Board_renderInProgress();
  Board_renderAwaiting();
  Board_renderDone();
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
    Board_renderPlaceholder(waitingList, "no tasks awaiting feedback");
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
    Board_subTaskProgress(array, i)
  }
}

function Board_renderCategoryOptions() {
  let selector = document.getElementById("category_selector");
  for (let index = 0; index < categories.length; index++) {
    const category = categories[index];
    selector.innerHTML += `
        <option value="${index}">${category["name"]}</option>
        `;
  }
}

async function Board_loadFromStorage(list) {
  try {
    TaskLists[list] = JSON.parse(await getItem(list));
  } catch {
    console.error("Loading error:");
  }
}

function renderSubtasksFull(array, i) {
  let subtaskList = TaskLists[array][i]["subtasks"];
  let allSubtasks = document.getElementById("SubtaskListFull");
  allSubtasks.innerHTML = "";
  for (let j = 0; j < subtaskList.length; j++) {
    let subtask = subtaskList[j];
    if (subtask["done"] == 0) {
      allSubtasks.innerHTML += `
      <div class="singleSubtaskFull">
        <img id="checkbox${j}" class="checkbox" onclick="finishSubtask('${array}', ${i}, ${j})" src="../img/Rectangle 5.svg" alt="">
        ${subtask["task"]}
      </div>
      `;
    } else {
      allSubtasks.innerHTML += `
      <div class="singleSubtaskFull">
        <img id="checkbox${j}" class="checkbox" onclick="revertSubtask('${array}', ${i}, ${j})" src="../img/Check button.svg" alt="">
        ${subtask["task"]}
      </div>
      `;
    }
  }
}


async function finishSubtask(array, i, j) {
  let subtaskList = TaskLists[array][i]["subtasks"];
  subtaskList[j]['done'] = 1;
  TaskLists[array][i]['subtasksDone'].push(subtaskList[j])
  
  renderSubtasksFull(array, i)
  await setItem(array, JSON.stringify(TaskLists[array]))
  console.log(TaskLists[array][i])
}


async function revertSubtask(array, i, j) {
  let subtaskList = TaskLists[array][i]["subtasks"]
  subtaskList[j]['done'] = 0;
  TaskLists[array][i]['subtasksDone'].splice(0, 1)

  renderSubtasksFull(array, i)
  await setItem(array, JSON.stringify(TaskLists[array]))
  console.log(TaskLists[array][i])
}



function Board_subTaskProgress(array, i) {
  let task = array[i];
  console.log(task)
  let progress = task['subtasksDone'].length / task['subtasks'].length;
  progress = Math.round(progress * 100);
  document.getElementById(`progressbar${i}`).value = progress;
}


function getCurrentDate() {
  let currentDay = ('0' + new Date().getDate()).slice(-2)
  let currentMonth = ('0' + (new Date().getMonth() + 1)).slice(-2)
  let currentYear = new Date().getFullYear()

  return{currentYear, currentMonth, currentDay}
  
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
  return `
    <div class="cardheadFull">
        <div class="categorycardFull" style="background-color: ${categories[category]["color"]};">${categories[category]["name"]}</div>
            <img onclick="closeOverlay()" src="../../assets/img/close.svg" alt="">
        </div>
        <h2>${task["title"]}</h2>
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
    </div>
    <div class="editorbarFull">
        <button onclick="Board_cutTask('${array}', ${i})" class="del">Delete</button>
        <img src="../img/Vector 3.svg" alt="">
        <button onclick="Board_editTask('${array}', ${i})" class="edit">Edit</button>
    </div>
    `;
}

function createNewTask(array) {
  let currentDate = getCurrentDate()
  console.log(currentDate)
  return `
    <div class="taskbody">
    <h1>Add Task</h1>
    <div>
        <div class="task_input">
            <div class="input1">
                <div class="title">
                <div class="uselessAstriks"><h2>Title</h2>*</div>
                    <input id="title" type="textbox" placeholder="Enter a title" required>
                    <div class="Taskerror" style="display: none;" id="errorTitle"> This field needs to be filled out</div>
                </div>
                <div class="description">
                    <h2>Description</h2>
                    <textarea name="" id="description" cols="56" rows="10" placeholder="Enter a Description"></textarea>
                    <div class="Taskerror" style="display: none;" id="errorDescription"> This field needs to be filled out</div>
                </div>
                <div class="assignment">
                    <h2>Assigned to</h2>
                    <select id="assign_select">
                        <option value="null">Select contacts to assign</option>
                    </select>
                </div>
            </div>
            <div class="divider"></div>
            <div class="input2">
                <div class="date">
                    <div class="uselessAstriks"><h2>Due Date</h2>*</div>
                    <input id="due" type="date" data-date="" data-date-format="DD MMMM YYYY" value="${currentDate.currentYear}-${currentDate.currentMonth}-${currentDate.currentDay}">
                    <div class="Taskerror" style="display: none;" id="errorDate">You can not select a date that is in the Past</div>
                </div>
                <div class="prio">
                  <div class="uselessAstriks"><h2>Prio</h2>*</div>
                    <div class="priocontainer">
                        <div onclick="setPrio(0)" id="Prio0">
                            Urgent
                            <img id="Prio0_img" src="../img/Prio alta.png" class="">
                        </div>
                        <div onclick="setPrio(1)" id="Prio1">
                            Medium
                            <img id="Prio1_img" src="../img/Prio media.png" class="">
                        </div>
                        <div onclick="setPrio(2)" id="Prio2">
                            Low
                            <img id="Prio2_img" src="../img/Prio baja.png" class="">
                        </div>
                    </div>
                </div>
                <div class="category">
                    <div class="uselessAstriks"><h2>Category</h2>*</div>
                    <select id="category_selector" required>
                        <option value="null">Select Category</option>
                    </select>
                </div>
                    <div class="subtask">
                        <h2>Subtasks</h2>
                        <div>
                            <input onkeyup="changeSubtaskAppearance()" id="subtasks" type="text" placeholder="Add new Subtask">
                            <div class="subtaskimages" id="subtaskField">
                                <img src="../img/Subtasks icons11.svg" alt="">
                            </div>
                        </div>
                        <div class="addedSubtasks" id="addedSubtasks"></div>
                    </div>
            </div>
        </div>
        <div class="addTaskBottom">
          <div class="uselessAstriks">*<h2>This field is required</h2></div>
          <div class="buttons">
              <button onclick="resetForm()" class="clear">Clear</button>
              <button onclick="addTask('${array}')" class="create">Create Task</button>
          </div>
        </div>
    </div>
    </div>
    `;
}

function Board_createTaskCard(array, i, arrayName) {
  let task = array[i];
  let category = task["category"];
  return `
      <div onclick="Board_renderFullTaskCard('${arrayName}', ${i})" class="taskcard">
        <div class="categorycard" style="background-color: ${categories[category]["color"]};">${categories[category]["name"]}</div>
        <h2>${task["title"]}</h2>
        <p class="descriptioncard">
            ${task["description"]}
        </p>
        <div class="subtaskscard">
            <label>${task['subtasksDone'].length}/${task['subtasks'].length} Subtasks</label>
            <progress id="progressbar${i}" max="100" value="0"></progress>
        </div>
        <div class="cardBottom">
            <div class="assignees">yoo</div>
            <img src="${task["priority"]["symbol"]}" alt="">
        </div>
      </div>
    `;
}

function Board_createTaskEditor(array, i) {
  let task = TaskLists[array][i];
  let date = new Date(task["dueDate"]);
  
  let day = ("0" + date.getDate()).slice(-2); 
  let month = ("0" + (date.getMonth() + 1)).slice(-2); 
  let year = date.getFullYear();
  return /*html*/`

<div class="cardheadEdit">
  <img onclick="Board_closeOverlay()" src="../../assets/img/close.svg" alt="">
</div>
<div class="TaskEditorBody">
<div class="titleEdit">
  <div class="uselessAstriks"><h2>Title</h2>*</div>
  <input id="title" type="textbox" placeholder="Enter a title" value="${task['title']}">
  <div class="Taskerror" style="display: none;" id="errorTitle"> This field needs to be filled out</div>
</div>
<div class="descriptionEdit">
  <h2>Description</h2>
  <textarea name="" id="description" cols="56" rows="10" placeholder="Enter a Description">${task['description']}</textarea>
</div>
<div class="duedateEdit">
    <p>Due Date:</p>
    <input id="due" type="date" data-date="" data-date-format="DD MMMM YYYY" value="${year}-${month}-${day}">
</div>
<div class="prioEdit">
    <p>Priority:</p>
      <div class="priocontainerEdit">
        <div onclick="setPrio(0)" id="Prio0">
          Urgent
          <img id="Prio0_img" src="../img/Prio alta.png" class="">
        </div>
        <div onclick="setPrio(1)" id="Prio1">
          Medium
          <img id="Prio1_img" src="../img/Prio media.png" class="">
        </div>
        <div onclick="setPrio(2)" id="Prio2">
          Low
          <img id="Prio2_img" src="../img/Prio baja.png" class="">
        </div>
      </div>
</div>
<div class="assigneesEdit">
  <p>Assigned to:</p>
  <select id="assign_select">
    <option value="null">Select contacts to assign</option>
  </select>
</div>
<div class="subtasksEdit">
    <p>Subtasks:</p>
    <div>
        <input onkeyup="changeSubtaskAppearance()" id="subtasks" type="text" placeholder="Add new Subtask">
        <div class="subtaskimages" id="subtaskField">
            <img src="../img/Subtasks icons11.svg" alt="">
        </div>
    </div>
    <div class="addedSubtasks" id="addedSubtasks"></div>
</div>
</div>
<div class="editorBottom">
  <button onclick="addTask('${array}')" class="create">Ok</button>
</div>
</div>
`;
  
}
