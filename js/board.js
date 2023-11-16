let overlay;
let overlayBody;
let blocker;
let todoList;
let progressList;
let waitingList;
let doneList;

/**
 * loads the tasks stored in arrays from the server and renders them
 */
async function boardLoadTasks() {
    board_assignDocuments();

    await boardLoadFromStorage("toDo");
    await boardLoadFromStorage("inProgress");
    await boardLoadFromStorage("feedback");
    await boardLoadFromStorage("done");

    boardRenderToDo();
    boardRenderInProgress();
    boardRenderFeedback();
    boardRenderDone();
    taskResetArrays();
}

/**
 * assigns elements to the variables so they can be used globally
 */
function board_assignDocuments() {
    overlay = document.getElementById("BoardOverlay");
    overlayBody = document.getElementById("boardOverlaybody");
    blocker = document.getElementById("blocker");
    todoList = document.getElementById("toDo");
    progressList = document.getElementById("inProgress");
    waitingList = document.getElementById("awaitFeedback");
    doneList = document.getElementById("done");
}

/**
 * executes a searchfunction for in every task-list
 */
function board_search() {
    board_searchByList(todoList, "toDo");
    board_searchByList(progressList, "inProgress");
    board_searchByList(waitingList, "feedback");
    board_searchByList(doneList, "done");
}

/**
 * ths is called when the searchbar is emptied to display all tasks again
 *
 */
function board_resetSearch() {
    let search = document.getElementById("taskSearch").value;
    if (search == "") {
        boardRenderToDo();
        boardRenderInProgress();
        boardRenderFeedback();
        boardRenderDone();
    }
}

/**
 * loops through the tasks in an array.
 * If an array title or description fits the search, the task gets displayed
 *
 * @param {Element} panel The element on the board in which the tasks are displayed
 * @param {string} arrayAsString The name of the array inside "tasksLists" to which the task is
 */
function board_searchByList(panel, arrayAsString) {
    let search = document.getElementById("taskSearch").value;
    search = search.toLowerCase();
    panel.innerHTML = "";
    let tasks = taskLists[arrayAsString];
    for (let j = 0; j < tasks.length; j++) {
        let task = tasks[j];
        if (
            task["title"].toLowerCase().includes(search) ||
            task["description"].toLowerCase().includes(search)
        ) {
            panel.innerHTML += board_createTaskCard(arrayAsString, j);
            board_subTaskProgress(arrayAsString, j);
            board_displayAssignees(arrayAsString, j);
        }
    }
}

/**
 * opens the overlay and renders a new task-creation into it.
 * Also enables the blocker to close the overlay on click
 *
 * @param {string} arrayAsString This is the name of the array inside "tasksLists" to which the task is supposed to be added
 */
function board_addTask(arrayAsString) {
    overlay.style.display = "flex";
    overlayBody.innerHTML = "";
    overlayBody.innerHTML = createNewTask(arrayAsString);
    task_renderCategoryOptions();
    task_renderAssigneeOptions();
    blocker.onclick = function() {
        board_closeOverlay();
    };
}

/**
 * opens the overlay and renders a Full task card into it.
 * Also enables the blocker to close the overlay on click
 *
 * @param {string} arrayAsString This is the name of the array inside "tasksLists" to which the task is supposed to be added
 * @param {number} i This is the index of the rendered task in its respective array
 */
function board_renderFullTaskCard(arrayAsString, i) {
    overlay.style.display = "flex";
    overlayBody.innerHTML = "";
    overlayBody.innerHTML = createFullTaskCard(arrayAsString, i);
    board_renderSubtasksFull(arrayAsString, i);
    board_displayAssigneesFull(arrayAsString, i);
    blocker.onclick = function() {
        board_closeOverlay();
    };
}

/**
 * Cuts a task out of its array, restores the array and then reloads the board
 *
 * @param {string} arrayAsString This is the name of the array inside "tasksLists" to which the task is supposed to be added
 * @param {number} i This is the index of the rendered task in its respective array
 */
async function board_cutTask(arrayAsString, i) {
    taskLists[arrayAsString].splice(i, 1);
    await setItem(arrayAsString, JSON.stringify(taskLists[arrayAsString]));
    board_closeOverlay();
    boardLoadTasks();
}

/**
 * displays another overlay in which a warning is rendered when a task is supposed to be deleted
 *
 * @param {string} arrayAsString This is the name of the array inside "tasksLists" to which the task is supposed to be added
 * @param {number} i This is the index of the rendered task in its respective array
 */
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

/**
 * closes te overlay opened in the board_renderWarning() function
 */
function board_GoBack() {
    document.getElementById("DeleteOverlay").style.display = "none";
}

/**
 * Sets the priority and renders the editor into the overlay
 *
 * @param {string} arrayAsString This is the name of the array inside "tasksLists" to which the edited task is supposed to be added
 * @param {number} i This is the index of the rendered task in its respective array
 */
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

/**
 * closes overlay
 */
function board_closeOverlay() {
    overlay.style.display = "none";
    overlayBody.innerHTML = "";
    taskResetArrays();
    boardLoadTasks();
}

/**
 * checks if the corresponding array is empty.
 * If its empty it renders a placeholder, if not it renders the cards
 */
function boardRenderToDo() {
    let todoList = document.getElementById("toDo");
    if (taskLists["toDo"].length == 0) {
        board_renderPlaceholder(todoList, "No tasks to do");
    } else {
        board_renderCard(todoList, "toDo");
    }
}

/**
 * checks if the corresponding array is empty.
 * If its empty it renders a placeholder, if not it renders the cards
 */
function boardRenderInProgress() {
    let progressList = document.getElementById("inProgress");
    if (taskLists["inProgress"].length == 0) {
        board_renderPlaceholder(progressList, "No tasks in progress");
    } else {
        board_renderCard(progressList, "inProgress");
    }
}

/**
 * checks if the corresponding array is empty.
 * If its empty it renders a placeholder, if not it renders the cards
 */
function boardRenderFeedback() {
    let waitingList = document.getElementById("awaitFeedback");
    if (taskLists["feedback"].length == 0) {
        board_renderPlaceholder(waitingList, "No tasks awaiting feedback");
    } else {
        board_renderCard(waitingList, "feedback");
    }
}

/**
 * checks if the corresponding array is empty.
 * If its empty it renders a placeholder, if not it renders the cards
 */
function boardRenderDone() {
    let doneList = document.getElementById("done");
    if (taskLists["done"].length == 0) {
        board_renderPlaceholder(doneList, "No tasks done yet");
    } else {
        board_renderCard(doneList, "done");
    }
}

/**
 * renders placeholder into an empty array
 *
 * @param {Element} panel The element on the board in which the tasks are displayed
 * @param {string} placeholder the text that needs to be displayed insted of tasks
 */
function board_renderPlaceholder(panel, placeholder) {
    panel.innerHTML = `
    <div class="placeholder">
        <p>${placeholder}</p>
    </div>
    `;
}

/**
 * loops through all tasks in an array and then renders them into a panel
 *
 * @param {Element} panel The element on the board in which the tasks are displayed
 * @param {string} arrayAsString This is the name of the array inside "tasksLists" where the task is found
 */
function board_renderCard(panel, arrayAsString) {
    let array = taskLists[arrayAsString];
    panel.innerHTML = "";
    for (let i = 0; i < array.length; i++) {
        panel.innerHTML += board_createTaskCard(arrayAsString, i);
        board_subTaskProgress(arrayAsString, i);
        board_displayAssignees(arrayAsString, i);
    }
}

/**
 * loads the array from the server and fills them into the arrays of the same name in the taskLists array
 *
 * @param {*} arrayAsString This is the name of the array inside "tasksLists" to which the task is supposed to be added
 */
async function boardLoadFromStorage(arrayAsString) {
    try {
        taskLists[arrayAsString] = JSON.parse(await getItem(arrayAsString));
    } catch {
        console.error("Loading error:");
    }
}

/**
 * loops through all subtasks saved in a certain task and displays them.
 * If they are done, they are displayed with a button that un-finishes them, if not they are displayed with a button that finishes them
 *
 * @param {string} arrayAsString This is the name of the array inside "tasksLists" where the task is found
 * @param {number} i This is the index of the rendered task in its respective array
 */
function board_renderSubtasksFull(arrayAsString, i) {
    let subtaskList = taskLists[arrayAsString][i]["subtasks"];
    let allSubtasks = document.getElementById("SubtaskListFull");
    allSubtasks.innerHTML = "";
    for (let j = 0; j < subtaskList.length; j++) {
        let subtask = subtaskList[j];
        if (subtask["done"] == 0) {
            allSubtasks.innerHTML += board_createUnfinishedSubtasksFull(arrayAsString, i, j, subtask)
        } else {
            allSubtasks.innerHTML += board_createFinishedSubtasksFull(arrayAsString, i, j, subtask)
        }
    }
}

/**
 * assigns a subtask inside of a task the "done" value, which is 1 and takes the subtask out of the subtask array into the subtasksDone array
 * Them saves and rerenders the subtasks
 *
 * @param {string} arrayAsString This is the name of the array inside "tasksLists" where the task is found
 * @param {number} i This is the index of the rendered task in its respective array
 * @param {number} j This is the index of the individual subtask inside a task
 */
async function board_finishSubtask(arrayAsString, i, j) {
    let subtaskList = taskLists[arrayAsString][i]["subtasks"];
    subtaskList[j]["done"] = 1;
    taskLists[arrayAsString][i]["subtasksDone"].push(subtaskList[j]);

    board_renderSubtasksFull(arrayAsString, i);
    await setItem(arrayAsString, JSON.stringify(taskLists[arrayAsString]));
}

/**
 * assigns a subtask inside of a task the "not done" value, which is 0 and takes the subtask out of the subtasksDone array into the subtask array
 * Then saves and rerenders the subtasks
 *
 * @param {string} arrayAsString This is the name of the array inside "tasksLists" where the task is found
 * @param {number} i This is the index of the rendered task in its respective array
 * @param {number} j This is the index of the individual subtask inside a task
 */
async function board_revertSubtask(arrayAsString, i, j) {
    let subtaskList = taskLists[arrayAsString][i]["subtasks"];
    subtaskList[j]["done"] = 0;
    taskLists[arrayAsString][i]["subtasksDone"].splice(0, 1);

    board_renderSubtasksFull(arrayAsString, i);
    await setItem(arrayAsString, JSON.stringify(taskLists[arrayAsString]));
}

/**
 * checks if subtasks are present inside the task. If there are none, the progressbar gets hidden.
 * Then divides the finished subtasks against the unfinished ones to get a value for the progressbar
 *
 * @param {string} arrayAsString This is the name of the array inside "tasksLists" where the task is found
 * @param {number} i This is the index of the rendered task in its respective array
 */
function board_subTaskProgress(arrayAsString, i) {
    let task = taskLists[arrayAsString][i];
    if (task["subtasks"].length == 0) {
        document.getElementById(`subtaskscard${arrayAsString}${i}`).style.display =
            "none";
    } else {
        let progress = task["subtasksDone"].length / task["subtasks"].length;
        progress = Math.round(progress * 100);
        document.getElementById(`progressbar${arrayAsString}${i}`).value = progress;
    }
}

/**
 * loops through the assignees-numbers array inside the task and renders the users at the index that the assigneenumber respresnts into the small board card.
 * If/else to make sure no impossible numbers got assigned
 *
 * @param {string} arrayAsString This is the name of the array inside "tasksLists" where the task is found
 * @param {number} i This is the index of the rendered task in its respective array
 */
function board_displayAssignees(arrayAsString, i) {
    let task = taskLists[arrayAsString][i];
    let assigned = task["assignees"];
    let list = document.getElementById(`assignees${arrayAsString}${i}`);
    if (assigned.length != 0) {
        for (let index = 0; index < users.length; index++) {
            let user = users[index];
            if (assigned.includes(user.id)) {
                list.innerHTML += board_createAssignees(user)
            }
        }
    }
}

/**
 * loops through the assignees-numbers array inside the task and renders the users at the index that the assigneenumber respresnts into the full card
 *
 * @param {string} arrayAsString This is the name of the array inside "tasksLists" where the task is found
 * @param {number} i This is the index of the rendered task in its respective array
 */
function board_displayAssigneesFull(arrayAsString, i) {
    let task = taskLists[arrayAsString][i];
    let assigned = task["assignees"];
    let list = document.getElementById(`assigneeListFull`);
    if (assigned.length != 0) {
        for (let index = 0; index < users.length; index++) {
            let user = users[index];
            if (assigned.includes(user.id)) {
                list.innerHTML += board_createAssigneesFull(user)
            }
        }
    }
}


/**
 *
 * @returns returns the current year in YYYY format, the current month in MM format and the current day in DD format
 */
function getCurrentDate() {
    let currentDay = ("0" + new Date().getDate()).slice(-2);
    let currentMonth = ("0" + (new Date().getMonth() + 1)).slice(-2);
    let currentYear = new Date().getFullYear();

    return { currentYear, currentMonth, currentDay };
}