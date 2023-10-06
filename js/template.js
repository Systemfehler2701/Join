function Template_renderBoard() {
    document.getElementById('').innerHTML =
        `
    <section id="BoardOverlay" class="Boardoverlay" style="display: none;">
        <div id ="blocker" class="blocker"></div>
        <div id="boardOverlaybody" class="overlayBlank"></div>
    </section>
    <section class="boardbody">
        <div class="head">
            <h1 class="h1">Board</h1>
            <div class="headleft">
                <div class="searchbar">
                    <input type="text" placeholder="Find task">
                    <div class="divider"></div>
                    <img onclick="" src="../img/search.svg" alt="">
                </div>
                <button onclick="board_addTask('toDo')">Add task</button>
            </div>
        </div>
        <div class="panels">
            <div class="taskpanel">
                <div class="panelhead">
                    <h2>To do</h2>
                    <button onclick="board_addTask('toDo')" class="add"></button>
                </div>
                <div id="toDo" class="panelbody"></div>
            </div>
            <div class="taskpanel">
                <div class="panelhead">
                    <h2>In progress</h2>
                    <button onclick="board_addTask('inProgress')" class="add"></button>
                </div>
                <div id="inProgress" class="panelbody">
                </div>
            </div>
            <div class="taskpanel">
                <div class="panelhead">
                    <h2>Await feedback</h2>
                    <button onclick="board_addTask('feedback')" class="add"></button>
                </div>
                <div id="awaitFeedback" class="panelbody">
                </div>
            </div>
            <div class="taskpanel">
                <div class="panelhead">
                    <h2>Done</h2>
                </div>
                <div id="done" class="panelbody">
                </div>
            </div>
        </div>
    </section>
    
    `;
}
