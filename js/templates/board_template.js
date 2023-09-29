///BOARD TEMPLATES///
function renderBoard(element) {
    document.getElementById('help-link').classList.remove("d-none");
    navigationMenuClicked(element);
    let content = document.getElementById('content');
    content.innerHTML = /* html */ `
    ${renderBoardOverlay()}
    ${renderBoardBody()}`;
    overlay = document.getElementById("BoardOverlay");
    overlayBody = document.getElementById("boardOverlaybody");
    blocker = document.getElementById("blocker")
    Board_loadTasks()
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
                <input type="text" placeholder="Find task">
                <div class="divider"></div>
                <img onclick="" src="assets/img/search.svg" alt="">
            </div>
            <button onclick="Board_addTask('ToDo')">Add task</button>
        </div>
    </div>`;
}


function renderBoardTaskTodo() {
    return /* html */ `
    <div class="taskpanel">
        <div class="panelhead">
            <h2>To do</h2>
            <button onclick="Board_addTask('ToDo')" class="add"></button>
        </div>
        <div id="ToDo" class="panelbody"></div>
    </div>`;
}


function renderBoardTaskProgress() {
    return /* html */ `
    <div class="taskpanel">
        <div class="panelhead">
            <h2>In progress</h2>
            <button onclick="Board_addTask('InProgress')" class="add"></button>
        </div>
        <div id="inProgress" class="panelbody"></div>
    </div>`;
}


function renderBoardTaskFeedback() {
    return /* html */ `
    <div class="taskpanel">
        <div class="panelhead">
            <h2>Await feedback</h2>
            <button onclick="Board_addTask('Awaiting')" class="add"></button>
        </div>
        <div id="awaitFeedback" class="panelbody"></div>
    </div>`;
}


function renderBoardTaskDone() {
    return /* html */ `
    <div class="taskpanel">
        <div class="panelhead">
            <h2>Done</h2>
        </div>
        <div id="done" class="panelbody"></div>
    </div>`;
}