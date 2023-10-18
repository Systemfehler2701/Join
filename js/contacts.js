let users = [];

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const colors = [
    "#FF7A00",
    "#FF5EB3",
    "#6E52FF",
    "#9327FF",
    "#00BEE8",
    "#1FD7C1",
    "#FF745E",
    "#FFA35E",
    "#FC71FF",
    "#FFC701",
    "#0038FF",
    "#C3FF2B",
    "#FFE62B",
    "#FF4646",
    "#FFBB2B",
];

async function loadContacts() {
    const contactsJSON = await getItem("contacts");
    users = JSON.parse(contactsJSON).map(jsonUser => User.fromJSON(jsonUser));
}

async function renderContactList() {
    await loadContacts();
    let content = "";
    let currentInitial = "";
    for (const index in users) {
        if (users.hasOwnProperty(index)) {
            const user = users[index];
            if (user.name == "") {
                continue;
            }
            const userInitial = user.name[0].toUpperCase();

            user.color = getColor(user.name);

            if (!user.color) {
                user.color = colors[Math.floor(Math.random() * colors.length)];
            }

            if (userInitial !== currentInitial) {
                content += `<div class="alphabet-section" id="alphabet-${userInitial}">${userInitial}</div>`;
                currentInitial = userInitial;
            }

            content += /* html */ `
          <div class="contactfield-wrapper" id='painted${index}'>
            <div class="contactfield" onclick="showDetails('${index}'); changeBackgroundColor('${index}');">
              <div class="initials-logo" style="background-color: ${user.color}">${getInitials(user.name)}</div>
              <div class="contact">
                <span class= 'name'><p><h3>${user.name}</h3></p></span>
                <span class='mail'><p><h3>${user.email}</h3></p></span>
              </div>
            </div>
          </div>
        `;
        }
    }

    document.getElementById("contactlist").innerHTML = content;
}


function getInitials(name) {
    const parts = name.split(" ");
    let initials = parts[0][0];

    if (parts.length > 1) {
        initials += parts[parts.length - 1][0];
    }

    return initials.toUpperCase();
}

function openOverlay() {
    document.getElementById("overlay").style.display = "block";
}

function closeOverlay() {
    document.getElementById("overlay").style.display = "none";
}


function changeBackgroundColor(index) {
    for (let j = 0; j < users.length; j++) {
        document.getElementById(`painted${j}`).classList.remove("selected");
    }
    document.getElementById(`painted${index}`).classList.add("selected");
}

function getColor(name) {
    const sum = name.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const colorIndex = sum % colors.length;
    return colors[colorIndex];
}

async function deleteContact(index) {
    removeUserfromTasks('toDo', users[index].id)
    removeUserfromTasks('inProgress', users[index].id)
    removeUserfromTasks('feedback', users[index].id)
    removeUserfromTasks('done', users[index].id)
    users.splice(index, 1);
    await setItem("contacts", users);
    renderContactList();
    document.getElementById("detailsContainer").innerHTML = "";
    closeOverlay();
}


/**
 * 
 */

function renderAddContact() {
    openContactOverlay();
    let overlayH2Content = document.getElementById("contacts-overlay-h2");
    overlayH2Content.innerHTML = `Add contact`;
    let overlayH3Content = document.getElementById("contacts-overlay-h3");
    overlayH3Content.innerHTML = `Tasks are better with a team!`;
    let overlayIcon = document.getElementById("contacts-overlay-whiteside-left");
    overlayIcon.innerHTML = /*html*/ `<div class="contacts-overlay-icon-border">
    <div class="contacts-overlay-icon">
        <img src="../assets/img/person2.svg">
    </div>
    </div>`;
    let overlayButtons = document.getElementById("contacts-overlay-buttons");
    overlayButtons.innerHTML = `<button class="cancelBtn" onclick="closeContactOverlay()">Cancel<img src="assets/img/close.svg"></button>
    <button onclick="createContact()"class="createBtn" type="submit">Create Contact<img src="assets/img/check.png"></button>`;
    document.getElementById("contact-edit-index").value = -1;
}


function renderEditContact(index) {
    openContactOverlay();
    let overlayH2Content = document.getElementById("contacts-overlay-h2");
    overlayH2Content.innerHTML = `Edit contact`;
    let overlayH3Content = document.getElementById("contacts-overlay-h3");
    overlayH3Content.innerHTML = ``;
    const user = users[index];
    const userInitials = getInitials(user.name);
    let overlayIcon = document.getElementById("contacts-overlay-whiteside-left");
    overlayIcon.innerHTML = /*html*/ `
        <div class="detailsLogo" style="background-color: ${user.color}; margin: 0;">${userInitials}</div>`;
    let overlayButtons = document.getElementById("contacts-overlay-buttons");
    overlayButtons.innerHTML = `<button class="cancelBtn" onclick="deleteContact(${index})">Delete</button>
    <button class="createBtn" type="submit">Save<img src="assets/img/check.png"></button>`;
    document.getElementById("contact-edit-index").value = index;
    document.getElementById("editName").value = user.name;
    document.getElementById("editEmail").value = user.email;
    document.getElementById("editPhone").value = user.phone;
}

function openContactOverlay() {
    document.getElementById("overlay").style.animation = "slideIn 1s forwards";
}

function closeContactOverlay() {
    document.getElementById("overlay").style.animation = "slideOut 1s forwards";
}

async function saveContact() {
    let index = document.getElementById("contact-edit-index").value;
    let name = document.getElementById("editName").value;
    let email = document.getElementById("editEmail").value;
    let phone = document.getElementById("editPhone").value;
    let user;
    if (index == -1) {
        user = new User(name, email, phone);
        users.push(user);
    } else {
        user = users[index];
        user.setName(name);
        user.setPhone(phone);
        user.setEmail(email);
    }
    users.sort((a, b) => a.name.localeCompare(b.name));
    await setItem("contacts", users);
    renderContactList();
    closeOverlay();
    index = users.findIndex(element => element.id == user.id);
    showDetails(index);
}


function goBackToContacts() {
    renderContacts();
}

function openContactSubmenu() {
    const optionsMenu = document.getElementById("optionsMenu");
    optionsMenu.classList.add("show-options-menu");
    document.getElementById("optionsMenu").style.animation = "slideIn 1s forwards";
}

function closeContactSubmenu(e) {
    let menu = document.getElementById('optionsMenu');
    if (menu != undefined && menu.classList.contains('show-options-menu') && !menu.contains(e.target)) {
        menu.style.animation = "slideOut 1s forwards";
    }
}

function showSuccessOverlay() {
    const overlay = document.querySelector(".success-overlay");
    overlay.classList.add("show-success");

    // Automatisches Schließen nach z.B. 3 Sekunden
    setTimeout(() => {
        hideSuccessOverlay();
    }, 3000); // 3000ms = 3 Sekunden
}

function hideSuccessOverlay() {
    const overlay = document.querySelector(".success-overlay");
    //Checks if the overlay is still there, to prevent an error-log in the console when you switch to a different submenu after adding a task
    if (overlay) {
        overlay.classList.remove("show-success");
    }
}

/**
 * Loops through all tasks in a tasklist, then loops through all assignees inside the tasks and if the id is inside an assignee array (which means the contact is assigned)
 * the ID will be deleted from the task. By looping backwards, if an item is removed, the items not yet checked won't shift, preventing any from being skipped.
 * Happens every time a contact is deleted
 * 
 * @param {string} arrayAsString This is the name of the array inside "tasksLists" to which the task is supposed to be added
 * @param {*} id id of the user thats about to be deleted
 */
async function removeUserfromTasks(arrayAsString, id) {
    let list = taskLists[arrayAsString]
    for (let index = 0; index < list.length; index++) {
        let task = list[index];
        let assignees = task['assignees'];
        for (let j = assignees.length - 1; j >= 0; j--) {
            if (assignees[j] == id) {
                assignees.splice(j, 1);
            }
        }
    }
    await setItem(arrayAsString, JSON.stringify(taskLists[arrayAsString]));
}