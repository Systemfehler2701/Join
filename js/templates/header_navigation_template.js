///HEADER & NAVIGATION TEMPLATES///
function renderNavigation() {
    let content = document.getElementById('left-layout');
    content.innerHTML = /* html */ `
    <nav>
        ${renderNavHeader()}
        ${renderNavMenu()}
        ${renderNavFooter()}        
    </nav>`;
}


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
    <div class = "menu-button" onclick = "navigationMenuClicked(this); renderBoard()">
        <div class = "menu-icon board" ></div><span>Board</span>
    </div>
    <div class = "menu-button" onclick = "navigationMenuClicked(this); renderContacts()">
        <div class = "menu-icon contacts"></div><span>Contacts</span>
    </div>
</div>`;
}


function renderNavFooter() {
    return /* html */ `<div class = "footer">
    <div class = "menu-button" onclick = "navigationMenuClicked(this); "><p>Privacy Policy</p></div>
    <div class = "menu-button" onclick = "navigationMenuClicked(this); renderNotice();"><p>Legal Notice</p></div>
</div >`;
}


function renderHeader() {
    let content = document.getElementById('header');
    content.innerHTML = /* html */ `
        ${renderHeaderHeadline()}
        ${renderHeaderProfile()}
        ${renderHeaderSubMenu()}
        `;
}


function renderHeaderHeadline() {
    return /* html */ `
    <div class="headline">
        <span>Kanban Project Management Tool</span>
    </div>`;
}


function renderHeaderProfile() {
    return /* html */ `
    <div class="headline-profile">
        <div id="help-link">
            <div onclick="renderHelp()"><img src="/assets/img/help.svg"></div>
        </div>
        <div onclick="openSubmenu()" class="user-profile-initials"></div>
    </div>`;
}

function renderHeaderSubMenu() {
    return /* html */ `
    <div id="headersubmenu" class="header-submenu d-none">
        <div>
            <p>Legal Notice</p>
        </div>
        <div class = "menu-button" onclick = "navigationMenuClicked(this);">
            <p>Privacy Policy</p>
        </div>
        <div>
            <p>Log out</p>
        </div>            
    </div>`;
}