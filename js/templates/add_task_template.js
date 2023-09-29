///ADD TASK TEMPLATES///
function renderAddTask(element) {
    document.getElementById('help-link').classList.remove("d-none");
    navigationMenuClicked(element);
    let content = document.getElementById('content');
    content.innerHTML = createNewTask('ToDo');
}


function createNewTask(array) {
    let currentDate = getCurrentDate()
    console.log(currentDate)
    return /* html */ `
    <div class="taskbody">
        <h1>Add Task</h1>
        <div>
            <div class="task_input">
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
                    </div>
                    <div class="category">
                        <div class="uselessAstriks">
                            <h2>Category</h2>*
                        </div>
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