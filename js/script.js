function app() {
    renderLayout();
    renderNavigation();
    renderHeader();
    renderSummary();
}

function renderLayout() {
    let content = document.getElementById('content-app');
    content.innerHTML = '';
    content.innerHTML = /* html */ `
    <div id="left-layout"></div>
    <div id="right-layout">
        <div id="header"></div>
        <div id="content"></div>
    </div>`;
}

function renderNavigation() {
    let content = document.getElementById('left-layout');
    content.innerHTML = /* html */ `
    <nav>
        <div class = "navigation-img" >
            <img class = "navigation-logo"src = "/assets/img/logo-white.svg">
        </div>
        <div class = "navigation-menu">
            <div class = "menu-button" onclick = "navigationMenuClicked(this)">
                <div class = "menu-icon summary"></div><span> Summary </span>
            </div>
            <div class = "menu-button" onclick = "navigationMenuClicked(this)">
                <div class = "menu-icon add-task" ></div><span>Add Task</span>
            </div>
            <div class = "menu-button" onclick = "navigationMenuClicked(this)">
                <div class = "menu-icon board" ></div><span>Board</span>
            </div>
            <div class = "menu-button" onclick = "navigationMenuClicked(this)">
                <div class = "menu-icon contacts"></div><span>Contacts</span>
            </div>
        </div>
        <div class = "footer">
            <a href ="">Privacy Policiy </a>
            <a href ="">Legal notice</a>
        </div >
    </nav>`;
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
        </div>`;
}

function renderHelp() {

}