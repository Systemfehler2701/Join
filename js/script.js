/**
 * This function start the app and render the login-mask or the summary
 */
async function app() {
    if (currentUser === null) {
        renderLoginMask();
        fillRememberedEmail();
        await loadUsers();
    } else {
        await getAppData();
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
 * This function render legal notice content
 */
function appLegalNotice() {
    renderLayout();
    renderNavigation();
    renderHeader();
    renderNotice();
}

/**
 * This function render privacy policy content
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

/**
 * Loads the users from storage and returns them as an object.
 *
 * @return {Object} The users loaded from storage.
 */
async function loadUsers() {
    try {
        const storedUsersJSON = await getItem("users");
        let regUsers;
        if (storedUsersJSON) {
            regUsers = JSON.parse(storedUsersJSON);
        } else {
            regUsers = {};
        }
    } catch (e) {
       // console.error("Load users error:", e);
        return {};
    }
}

let currentlyDisplayedContactIndex = null;
let screenData = {
    internalWidth: ''
};

// checks the screenwidth every time it changes to find out if a change of layouts of the Full Card is required
function checkScreenWidth() {
    if (window.innerWidth >= 1190) {
        screenData.Screenwidth = 'fullscreen';
    } else {
        screenData.Screenwidth = 'mobile';
    }
}

// Watches for a change in screenwidth to a predetermined width to see if the layout of the Full Card needs to be changed
Object.defineProperty(screenData, 'Screenwidth', {
    get() {
        return this.internalWidth;
    },
    set(newVal) {
        if (newVal !== this.internalWidth) { // checks if value is actually changing
            this.internalWidth = newVal;
            onScreenwidthChange();; // calls the function when Screenwidth changes
        }
    }
});

//automatically renders the full pokemon card if the card is already displayed. Checks for the currentlyDisplayedCardIndex to make sure the card is not rendered until you click the required button
function onScreenwidthChange() {
    if (currentlyDisplayedContactIndex !== null) {
        let index = currentlyDisplayedContactIndex
        showDetails(index)
    }
}