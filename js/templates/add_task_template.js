///ADD TASK TEMPLATES///
function renderAddTask(element) {
    document.getElementById("help-link").classList.remove("d-none");
    navigationMenuClicked(element);
    let content = document.getElementById("content");
    Prio = [];
    subtasks = [];
    subtasksDone = [];
    content.innerHTML = createNewTask("toDo");
    renderCategoryOptions();
    renderAssigneeOptions();
}

function createNewTask(array) {
    let currentDate = getCurrentDate();
    return /* html */ `
    <div class="taskbody">
        <h1>Add Task</h1>
        <div style="width: 100%">
            <div class="task_input scroll">
                <div class="input1">
                    <div class="title">
                        <div class="uselessAstriks">
                            <h2>Title</h2>*
                        </div>
                        <input id="title" type="textbox" placeholder="Enter a title" required>
                        <div class="Taskerror" style="display: none;" id="errorTitle"> This field needs to be filled out</div>
                    </div>
                    <div class="description">
                        <h2>Description</h2>
                        <textarea class="scroll" name="" id="description" cols="56" rows="10" placeholder="Enter a Description"></textarea>
                        <div class="Taskerror" style="display: none;" id="errorDescription"> This field needs to be filled out</div>
                    </div>
                    <div class="assignment">
                        <h2>Assigned to</h2>
                        <div  class="assignmentInput" id="assignmentInput">
                            <input onclick="toggleAssigneeOptions(this)" onkeyup="searchAssignees()" id="assigner" class="assignmentSelect" placeholder="Select contact to assign">
                            <div id="assignmentSelectButton" onclick="toggleAssigneeOptions(this)">
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
                </div>
                <div class="divider"></div>
                <div class="input2">
                    <div class="date">
                        <div class="uselessAstriks">
                            <h2>Due Date</h2>*
                        </div>
                        <input id="due" type="date" data-date="" data-date-format="DD MMMM YYYY" value="${currentDate.currentYear}-${currentDate.currentMonth}-${currentDate.currentDay}">
                        <div class="Taskerror" style="display: none;" id="errorDate">You can not select a date that is in the Past</div>
                    </div>
                    <div class="prio">
                        <div class="uselessAstriks">
                            <h2>Prio</h2>*
                        </div>
                        <div class="priocontainer">
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
                        <div class="Taskerror" style="display: none;" id="errorPriority">You need to Select a Priority</div>
                    </div>
                    <div class="category">
                        <div class="uselessAstriks">
                            <h2>Category</h2>*
                        </div>
                        <select id="category_selector">
                            <option value="null">Select Category</option>
                        </select>
                        <div class="Taskerror" style="display: none;" id="errorCategory">You need to Select a Category</div>
                    </div>
                        <div class="subtask">
                            <h2>Subtasks</h2>
                            <div>
                                <input onkeyup="changeSubtaskAppearance()" id="subtasks" type="text" placeholder="Add new Subtask">
                                <div class="subtaskimages" id="subtaskField">
                                    <img src="/assets/img/Subtasks icons11.svg" alt="">
                                </div>
                            </div>
                            <div class="addedSubtasks" id="addedSubtasks"></div>
                        </div>
                </div>
            </div>
            <div class="addTaskBottom">
                <div class="uselessAstriks">*
                    <h2>This field is required</h2>
                </div>
                <div class="buttons">
                    <button onclick="resetForm()" class="clear">Clear</button>
                    <button onclick="addTask('${array}')" class="create">Create Task</button>
                </div>
            </div>
        </div>
    </div>`;
}