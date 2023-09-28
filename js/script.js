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

function renderSummary() {
    document.getElementById('help-link').classList.remove("d-none");
    let content = document.getElementById('content');
    content.innerHTML = /* html */ `
    <div class="summary-content">
        ${renderSummaryHeader()}
        <div class="summary-info">
            ${renderSummaryTask()}
            ${renderSummaryWelcome()}
        </div>
    </div>`;
    greet();
}

function renderAddTask(element) {
    document.getElementById('help-link').classList.remove("d-none");
    navigationMenuClicked(element);
    let content = document.getElementById('content');
    content.innerHTML = createNewTask('ToDo');
}