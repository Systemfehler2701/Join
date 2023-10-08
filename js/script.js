function app() {
    if (currentUser === null) {
        renderLoginMask();
    } else {
        renderLayout();
        renderNavigation();
        renderHeader();
        renderSummary();
    }
}

function renderLayout() {
    let content = document.getElementById("content-app");
    content.innerHTML = "";
    content.innerHTML = /* html */ `
    <div id="left-layout"></div>
    <div id="right-layout">
        <div id="header"></div>
        <div id="content"></div>
    </div>`;
}


function appLegalNotice() {
    renderLayout();
    renderNavigation();
    renderHeader();
    renderNotice();
}


function appPrivacyPolicy() {
    renderLayout();
    renderNavigation();
    renderHeader();
    renderPolicy();
}