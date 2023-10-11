/**
 * This function start the app and render the login-mask or the summary
 */
async function app() {
    if (currentUser === null) {
        renderLoginMask();
        fillRememberedEmail();
    } else {
        await getAppData();
        await loadUsers();
        renderLayout();
        renderNavigation();
        renderHeader();
        renderSummary();
    }
}

/**
 * This function create the basic for the content
 */
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

/**
 * This function render legal notice
 */
function appLegalNotice() {
    renderLayout();
    renderNavigation();
    renderHeader();
    renderNotice();
}

/**
 * This function render privacy policy
 */
function appPrivacyPolicy() {
    renderLayout();
    renderNavigation();
    renderHeader();
    renderPolicy();
}

/**
 * This function load all data from storage
 */
async function getAppData() {
    users = JSON.parse(await getItem("contacts"));
    await board_loadFromStorage("toDo");
    await board_loadFromStorage("inProgress");
    await board_loadFromStorage("feedback");
    await board_loadFromStorage("done");
}

async function loadUsers() {
    try {
        const storedUsersJSON = await getItem("users");
        if (storedUsersJSON) {
            const storedUsers = JSON.parse(storedUsersJSON);
            return storedUsers;
        } else {
            return {};
        }
    } catch (e) {
        console.error("Load users error:", e);
        return {};
        n;
    }
}