///BOARD TEMPLATES///
function renderBoard(element) {
  document.getElementById("help-link").classList.remove("d-none");
  navigationMenuClicked(element);
  let content = document.getElementById("content");
  content.innerHTML = /* html */ `
    ${renderBoardOverlay()}
    ${renderBoardBody()}`;
  overlay = document.getElementById("BoardOverlay");
  overlayBody = document.getElementById("boardOverlaybody");
  blocker = document.getElementById("blocker");
  board_loadTasks();
}

function renderBoardOverlay() {
  return /* html */ `
    <section id="BoardOverlay" class="Boardoverlay" style="display: none;">
        <div id ="blocker" class="blocker"></div>
        <div id="boardOverlaybody" class="overlayBlank"></div>
    </section>`;
}

function renderBoardBody() {
  return /* html */ `
    <section class="boardbody">
        ${renderBoardHead()}
        ${renderBoardPanels()}
    </section>`;
}

function renderBoardPanels() {
  return /* html */ `
    <div class="panels">
        ${renderBoardTaskTodo()}
        ${renderBoardTaskProgress()}
        ${renderBoardTaskFeedback()}
        ${renderBoardTaskDone()}
    </div>`;
}

function renderBoardHead() {
  return /* html */ `
    <div class="head">
        <h1 class="h1">Board</h1>
        <div class="headleft">
            <div class="searchbar">
                <input onkeyup="board_resetSearch()" type="text" id="taskSearch" placeholder="Find task">
                <div class="divider"></div>
                <div class="searchbutton">
                    <img onclick="board_search()" src="assets/img/search.svg" alt="">
                </div>
            </div>
            <button onclick="board_addTask('toDo')">Add task</button>
        </div>
    </div>`;
}

function renderBoardTaskTodo() {
  return /* html */ `
    <div class="taskpanel">
        <div class="panelhead">
            <h2>To do</h2>
            <button onclick="board_addTask('toDo')" class="add"></button>
        </div>
        <div id="toDo" class="panelbody" ondrop="drop('toDo')" ondragover="allowDrop(event)"></div>
    </div>`;
}

function renderBoardTaskProgress() {
  return /* html */ `
    <div class="taskpanel">
        <div class="panelhead">
            <h2>In progress</h2>
            <button onclick="board_addTask('inProgress')" class="add"></button>
        </div>
        <div id="inProgress" class="panelbody" ondrop="drop('inProgress')" ondragover="allowDrop(event)"></div>
    </div>`;
}

function renderBoardTaskFeedback() {
  return /* html */ `
    <div class="taskpanel">
        <div class="panelhead">
            <h2>Await feedback</h2>
            <button onclick="board_addTask('feedback')" class="add"></button>
        </div>
        <div id="awaitFeedback" class="panelbody" ondrop="drop('feedback')" ondragover="allowDrop(event)"></div>
    </div>`;
}

function renderBoardTaskDone() {
  return /* html */ `
    <div class="taskpanel">
        <div class="panelhead">
            <h2>Done</h2>
        </div>
        <div id="done" class="panelbody" ondrop="drop('done')" ondragover="allowDrop(event)"></div>
    </div>`;
}
