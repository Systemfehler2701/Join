function renderNavigation() {
    let content = document.getElementById('left-layout');
    content.innerHTML = /* html */ `
    <nav>
        ${renderNavHeader()}
        ${renderNavMenu()}
        ${renderNavFooter()}        
    </nav>`;
}

function navigationMenuClicked(element) {
    let activeElement = document.querySelector('.menu-button.active');
    if (activeElement != undefined) {
        activeElement.classList.remove('active');
    }
    element.classList.add('active');
}

function renderAddTask(element) {
    navigationMenuClicked(element);
    let content = document.getElementById('content');
    content.innerHTML = createNewTask('ToDo');
}

function openSubmenu() {
    document.getElementById('summarysubmenu').classList.toggle("d-none");
}



///HEADER & NAVIGATION TEMPLATES///
function renderNavHeader() {
    return /* html */ `<div class = "navigation-img" >
            <img class = "navigation-logo"src = "/assets/img/logo-white.svg">
        </div>`;
}

function renderNavMenu() {
    return /* html */ `<div class = "navigation-menu">
    <div class = "menu-button" onclick = "navigationMenuClicked(this); renderSummary();">
        <div class = "menu-icon summary"></div><span> Summary </span>
    </div>
    <div class = "menu-button" onclick = "renderAddTask(this);">
        <div class = "menu-icon add-task" ></div><span>Add Task</span>
    </div>
    <div class = "menu-button" onclick = "navigationMenuClicked(this)">
        <div class = "menu-icon board" ></div><span>Board</span>
    </div>
    <div class = "menu-button" onclick = "navigationMenuClicked(this)">
        <div class = "menu-icon contacts"></div><span>Contacts</span>
    </div>
</div>`;
}

function renderNavFooter() {
    return /* html */ `<div class = "footer">
    <div class = "menu-button" onclick = "navigationMenuClicked(this);"><a href ="">Privacy Policy</a></div>
    <div class = "menu-button" onclick = "navigationMenuClicked(this);"><a href ="">Legal Notice</a></div>
</div >`;
}

function renderHeader() {
    let content = document.getElementById('header');
    content.innerHTML = /* html */ `
        <div class="headline">
            <span>Kanban Project Management Tool</span>
        </div>
        <div class="headline-profile">
            <div class="help-link">
                <div onclick="renderHelp()"><img src="/assets/img/help.svg" ></div>
            </div>
            <div onclick="openSubmenu()" class="user-profile-initials"></div>
        </div>
        <div id="summarysubmenu" class="summary-submenu d-none">
            <div><a href ="">Legal Notice</a></div>
            <div class = "menu-button" onclick = "navigationMenuClicked(this);"><a href ="">Privacy Policy</a></div>
            <div><p>Log out</p></div>            
        </div>`;
}