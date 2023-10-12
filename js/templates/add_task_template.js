///ADD TASK TEMPLATES///

/**
 * resets all arrays before rendering the addTask page into the content, also undefines 'overlayBody' to signal that the task is added in the add task submenu
 *
 *
 * @param {element} element element that needs to be displayed as active
 */
function renderAddTask(element) {
  document.getElementById("help-link").classList.remove("d-none");
  if(element) {
    navigationMenuClicked(element);
  }
  let content = document.getElementById("content");
  task_resetArrays();
  overlayBody = undefined;
  content.innerHTML = createNewTask("toDo");
  task_renderCategoryOptions();
  task_renderAssigneeOptions();
}

/**
 * returns the HTML to be rendered with the renderAddTask() function
 *
 * @param {string} arrayAsString This is the name of the array inside "tasksLists" to which the task is supposed to be added
 * @returns HTML
 */
function createNewTask(arrayAsString) {
  let currentDate = getCurrentDate();
  return /* html */ `
    <div onclick="task_closeOverlay(event, this)" class="taskbody">
        <div id="taskNotification" class="taskNotification"> 
            Task added to board
            <img src="/assets/img/Vector_board.svg" alt="">
        </div>
        <h1>Add Task</h1>
        <div class="taskInputContainer" style="width: 100%">
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
                        <div  onclick="task_openOverlay(event)" class="assignmentInput" id="assignmentInput">
                            <input onkeyup="task_searchAssignees()" id="assigner" class="assignmentSelect" placeholder="Select contact to assign">
                            <div id="assignmentSelectButton" onclick="task_closeOverlay(event, this)">
                                <img src="/assets/img/arrow_drop_downaa.svg" alt="">
                            </div>
                        </div> 
                        <div onclick="preventClose(event)" class="assigneeOptionContainer" id="assigneeOptionContainer" style="display: none">
                            <div  id="assign_select" class="assignmentContainer scroll"></div>
                            <div class="ContactButtonContainer">
                              <div onclick="goToContacts()" class="newContactButton" id="assignmentNewContact">Add New contact
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
                                <input onkeyup="task_changeSubtaskAppearance()" onkeydown="task_addSubtasksOnEnter(event)" id="subtasks" type="text" placeholder="Add new Subtask">
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
                    <button onclick="clearTaskCreator('${arrayAsString}')" class="clear">Clear</button>
                    <button onclick="task_addTask('${arrayAsString}')" class="create">Create Task</button>
                </div>
            </div>
        </div>
    </div>`;
}

/**
 * renders a contact into the assignee Options which has been assigned already, with a button to unassgin him
 *
 * @param {object} user object from the users array
 * @param {number} index index of the object in the users array
 */
function task_createAssignedContact(user, index) {
  let selector = document.getElementById("assign_select");
  selector.innerHTML += /*html*/ `
    <div id="assignee${index}" class="assigneeOption" value="${index}">
      <div class="initials-logo" style="background-color: ${
        user.color
      }">${getInitials(user.name)}</div>
      <div class="assigneeName">${user.name}</div>
      <img id="assigneeCheckbox${index}" onclick="task_unassign(${index})" class="checkbox" src="/assets/img/Check button.svg" alt="">
  </div>
  `;
}

/**
 * renders a contact into the assignee Options which has not been assigned yet, with a button to assgin him
 *
 * @param {object} user object from the users array
 * @param {number} index index of the object in the users array
 */
function task_createUnassignedContact(user, index) {
  let selector = document.getElementById("assign_select");
  selector.innerHTML += /*html*/ `
    <div id="assignee${index}" class="assigneeOption" value="${index}">
      <div class="initials-logo" style="background-color: ${
        user.color
      }">${getInitials(user.name)}</div>
      <div class="assigneeName">${user.name}</div>
      <img id="assigneeCheckbox${index}" onclick="task_assign(${index})" class="checkbox" src="/assets/img/Rectangle 5.svg" alt="">
  </div>
  `;
}

//onkeyup="task_searchAssignees()"
