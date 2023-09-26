const overlay = document.getElementById("BoardOverlay");
const overlayBody = document.getElementById("boardOverlaybody");

function Board_addTask(array) {
  overlay.style.display = "flex";
  overlayBody.innerHTML = "";
  overlayBody.innerHTML = createNewTask(array);
  Board_renderCategoryOptions();
}

function Board_renderFullTaskCard() {
  overlay.style.display = "flex";
  overlayBody.innerHTML = "";
  overlayBody.innerHTML = createFullTaskCard();
}

function closeOverlay() {
  resetForm();
  overlay.style.display = "none";
  overlayBody.innerHTML = "";
}

function Board_showProgress() {
  let progress = answeredQuestions / subtasks.length;
  progress = Math.round(progress * 100);
  document.getElementById("progressBar").value = `${progress}% `;
}

function Board_loadTasks() {
  Board_renderToDo();
  Board_renderInProgress();
  Board_renderAwaiting();
  Board_renderDone();
}

function Board_renderToDo() {
  let todoList = document.getElementById("ToDo");
  if (ToDo.length === 0) {
    Board_renderPlaceholder(todoList, "No tasks to do");
  } else {
    Board_renderCard(todoList, ToDo);
  }
}
function Board_renderInProgress() {
  let progressList = document.getElementById("inProgress");
  if (InProgress.length === 0) {
    Board_renderPlaceholder(progressList, "No tasks in progress");
  } else {
    Board_renderCard(progressList, InProgress);
  }
}
function Board_renderAwaiting() {
  let waitingList = document.getElementById("awaitFeedback");
  if (Awaiting.length === 0) {
    Board_renderPlaceholder(waitingList, "no tasks awaiting feedback");
  } else {
    Board_renderCard(waitingList, Awaiting);
  }
}
function Board_renderDone() {
  let doneList = document.getElementById("done");
  if (Done.length === 0) {
    Board_renderPlaceholder(doneList, "No tasks done yet");
  } else {
    Board_renderCard(doneList, Done);
  }
}

function Board_renderPlaceholder(List, placeholder) {
  List.innerHTML = `
    <div class="placeholder">
        <p>${placeholder}</p>
    </div>
    `;
}

function Board_renderCard(list, array) {
  list.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    list.innerHTML += Board_createTaskCard(array, i);
  }
}

function Board_createTaskCard(array, i) {
  let task = array[i];
  let category = task['category']
  return(`
    <div onclick="Board_renderFullTaskCard(array, i)" class="taskcard">
      <div class="categorycard" style="background-color: ${categories[category]['color']};">${categories[category]['name']}</div>
      <h2>${task['title']}</h2>
      <p class="descriptioncard">
          ${task['description']}
      </p>
      <div class="subtaskscard">
          <label>0/2 Subtasks</label>
          <progress id="progressbar" max="100" value="0"></progress>
      </div>
      <div class="cardBottom">
          <div class="assignees">yoo</div>
          <img src="${task['priority']['symbol']}" alt="">
      </div>
    </div>
  `)
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

//////////////////////////////////////////////////////// HTML DUMP \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//////////////////////////////////////////////////////// HTML DUMP \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function createFullTaskCard() {
  return `
    <div class="cardheadFull">
        <div class="categorycardFull" style="background-color: blue;">User Story</div>
            <img onclick="closeOverlay()" src="../../assets/img/close.svg" alt="">
        </div>
        <h2>Байрактар & Байрактар </h2>
        <p class="descriptionFull">
            Російска поліція справи заводить
        </p>
        <div class="duedateFull">
            <p>Due Date:</p>
        <p>12/03/2023</p>
        </div>
    <div class="prioFull">
        <p>Priority:</p>
        <div>
            Medium
            <img src="../img/Prio media.png" alt="">
        </div>
    </div>
    <div class="assigneesFull">
        <p>Assigned to:</p>
    </div>
    <div class="subtasksFull">
        <p>Subtasks:</p>
        <div class="subtaskFull">
        <div class="checkboxticked">
            <img src="../img/Vector 9.svg" alt="">
            <img class="check" src="../img/Vector 17.svg" alt="">
        </div>
        Байрактар…
    </div>
      <div class="subtaskFull">
          <div class="checkbox">
            <img src="../img/Rectangle 5.svg" alt="">
          </div>
          Байрактар…
      </div>
    </div>
    <div class="editorbarFull">
        <button onclick="" class="del">Delete</button>
        <img src="../img/Vector 3.svg" alt="">
        <button onclick="" class="edit">Edit</button>
    </div>
    `;
}

function createNewTask(array) {
  return `
    <div class="taskbody">
    <h1>Add Task</h1>
    <div>
        <div class="task_input">
            <div class="input1">
                <div class="title">
                    <h2>Title</h2>
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
                    <h2>Due Date</h2>
                    <input type="date" name="" id="due">
                    <div class="Taskerror" style="display: none;" id="errorDate"> This field needs to be filled out</div>
                </div>
                <div class="prio">
                    <h2>Prio</h2>
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
                    <div class="Taskerror" style="display: none;" id="errorPrio"> This field needs to be filled out</div>
                </div>
                <div class="category">
                    <h2>Category</h2>
                    <select id="category_selector" required>
                        <option value="null">Select Category</option>
                    </select>
                    <div class="Taskerror" style="display: none;" id="errorCategory"> This field needs to be filled out</div>
                </div>
                <form action="">
                    <div class="subtask">
                        <h2>Subtasks</h2>
                        <div>
                            <input id="subtask" type="text" placeholder="Add new Subtask">
                            <img onclick="addSubtask" src="../img/Subtasks icons11.svg" alt="">
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="buttons">
            <button onclick="resetForm()" class="clear">Clear</button>
            <button onclick="addTask(${array})" class="create">Create Task</button>
        </div>
    </div>
    </div>
    `;
}
