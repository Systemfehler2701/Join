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