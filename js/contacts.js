let users = [
  {
    name: "Elon Musk",
    mail: "elonthegreatest@twitter.to",
    phone: "123-456-7890",
  },
  {
    name: "Jan Woll",
    mail: "woll.jan@berlin",
    phone: "123-456-7890",
  },
  {
    name: "Stefanie Hinze",
    mail: "stefanine.hinze@google.de",
    phone: "123-456-7890",
  },
  {
    name: "Max Mustermann",
    mail: "mustermann@mustermail.de",
    phone: "123-456-7890",
  },
  {
    name: "Michael Fischer",
    mail: "mustermann@mustermail.de",
    phone: "123-456-7890",
  },
];

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

async function renderContactList() {
  // Rufe die Benutzerdaten aus dem Storage ab, wobei die E-Mail-Adresse als Schlüssel verwendet wird
  const contactsJSON = await getItem("contacts");
  const contacts = JSON.parse(contactsJSON);

  let content = "";
  let currentInitial = "";

  for (const email in contacts) {
    if (contacts.hasOwnProperty(email)) {
      const user = contacts[email];
      const userInitial = user.name[0].toUpperCase();

      user.color = getColor(user.name);

      if (!user.color) {
        user.color = colors[Math.floor(Mathrandom() * colors.length)];
      }

      if (userInitial !== currentInitial) {
        content += `<div class="alphabet-section" id="alphabet-${userInitial}">${userInitial}</div>`;
        currentInitial = userInitial;
      }

      content += /* html */ `
          <div class="contactfield-wrapper" id='painted${email}'>
            <div class="contactfield" onclick="showDetails('${email}'); changeBackgroundColor('${email}');">
              <div class="initials-logo" style="background-color: ${
                user.color
              }">${getInitials(user.name)}</div>
              <div class="contact">
                <span class= 'name'><p><h3>${user.name}</h3></p></span>
                <span class='mail'><p><h3>${email}</h3></p></span>
              </div>
            </div>
          </div>
        `;
    }
  }

  document.getElementById("contactlist").innerHTML = content;
}

async function addContact() {
  const userEmail = document.getElementById("editEmail").value;
  const getContactsJSON = await getItem("contacts");
  const getContacts = JSON.parse(getContactsJSON || "{}");

  // Überprüfen, ob der Kontakt bereits existiert
  if (getContacts[userEmail]) {
    console.log(`Kontakt mit der E-Mail ${userEmail} existiert bereits.`);
  } else {
    const addUser = {
      name: document.getElementById("editName").value,
      mail: userEmail,
      phone: document.getElementById("editPhone").value,
      // color: document.getElementById("color").value,
    };

    // set Key to mail
    getContacts[userEmail] = addUser;

    await setItem("contacts", JSON.stringify(getContacts));

    renderContactList();
    closeOverlay();
  }
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

function showDetails(index) {
  currentlyDisplayedContactIndex = index;
  const user = users[index];
  const initials = getInitials(user.name);
  if (screenData.internalWidth == "mobile") {
    document.getElementById("leftside").style.display = "none";
    document.getElementById("contactsforRespons").style.display = "flex";
  }
  if (screenData.internalWidth == "fullscreen") {
    document.getElementById("leftside").style.display = "flex";
    document.getElementById("contactsforRespons").style.display = "flex";
  }
  const detailsContent = /* html */ `
        <div class="contactView">
            <div class="detailsLogo" style="background-color: ${user.color}; margin: 0;">${initials}</div>
            <div class="contactUser">
                <h3>${user.name}</h3>
                <div class="contactsIcons">
    <div class="iconWrapper" onclick="renderEditContact(${index})">
        <img class="icon" src="/assets/img/edit.svg">
        <span class="iconText">Edit</span>
    </div>
    <div class="iconWrapper" onclick="deleteContact(${index})">
        <img class="icon" src="/assets/img/delete.svg">
        <span class="iconText">Delete</span>
    </div>
</div>
            </div>
        </div>
        <div class="contactInformation">

            <h3>Contact Information</h3>
            <br>
            <br>
            <h4>Email</h4><br>
            <p class="email-blue">${user.mail}</p>
            <h4>Phone</h4>
            <p><h5>${user.phone}</h5></p>
        </div>
    `;

  document.getElementById("detailsContainer").innerHTML = detailsContent;
}

function changeBackgroundColor(i) {
  for (let j = 0; j < users.length; j++) {
    document.getElementById(`painted${j}`).classList.remove("selected");
  }
  document.getElementById(`painted${i}`).classList.add("selected");
}

function getColor(name) {
  const sum = name.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const colorIndex = sum % colors.length;
  return colors[colorIndex];
}

function deleteContact(index) {
  users.splice(index, 1);
  renderContactList();
  document.getElementById("detailsContainer").innerHTML = "";
  closeOverlay();
}

function editContact(index) {
  const user = users[index];
  document.getElementById("editName").value = user.name;
  document.getElementById("editEmail").value = user.mail;
  document.getElementById("editPhone").value = user.phone;
  document.getElementById("editIndex").value = index;
  const editInitialsLogo = document.getElementById("editInitialsLogo");
  editInitialsLogo.textContent = getInitials(user.name);
  editInitialsLogo.style.backgroundColor = user.color;
  document.getElementById("editOverlay").style.display = "block";
}

function updateContact(e) {
  e.preventDefault();

  const index = document.getElementById("editIndex").value;
  const user = users[index];

  user.name = document.getElementById("editName").value;
  user.mail = document.getElementById("editEmail").value;
  user.phone = document.getElementById("editPhone").value;

  // Das Array erneut sortieren, nachdem ein Kontakt bearbeitet wurde
  users.sort((a, b) => a.name.localeCompare(b.name));

  renderContactList();
  closeEditOverlay();
  clearDetails();
}

function closeEditOverlay() {
  document.getElementById("editOverlay").style.display = "none";
}

function clearDetails() {
  document.getElementById("detailsContainer").innerHTML = "";
}

function toggleOverlay() {
  document.getElementById("contactOverlay").style.animation =
    "slideIn 1s forwards";
}

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
  overlayButtons.innerHTML = `<button class="cancelBtn">Cancel<img src="assets/img/close.svg"></button>
    <button class="createBtn" onclick="addContact()">Create Contact<img src="assets/img/check.png"></button>`;
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
  overlayButtons.innerHTML = `<button class="cancelBtn">Delete</button>
    <button class="createBtn" onclick="saveEditedContact(${index})">Save<img src="assets/img/check.png"></button>`;

  document.getElementById("editName").value = user.name;
  document.getElementById("editEmail").value = user.mail;
  document.getElementById("editPhone").value = user.phone;
}

function openContactOverlay() {
  document.getElementById("overlay").style.animation = "slideIn 1s forwards";
}

function closeContactOverlay() {
  document.getElementById("overlay").style.animation = "slideOut 1s forwards";
}

function saveEditedContact(index) {
  // Erhalten Sie die ursprünglichen Benutzerdaten
  const originalUser = users[index];

  // Erhalten Sie die aktualisierten Benutzerdaten
  const updatedUser = {
    name: document.getElementById("editName").value,
    mail: document.getElementById("editEmail").value,
    phone: document.getElementById("editPhone").value,
    // Beibehalten der ursprünglichen Farbe
    color: originalUser.color,
  };

  // Aktualisieren Sie den Benutzer im users Array
  users[index] = updatedUser;

  // Aktualisieren Sie die Kontaktliste im UI
  renderContactList();

  // Schließen Sie das Bearbeitungs-Overlay
  closeContactOverlay();

  // Wählen Sie den bearbeiteten Kontakt aus
  changeBackgroundColor(index);

  // Zeigen Sie die aktualisierten Details an
  showDetails(index);
}

function goBackToContacts() {
  renderContacts();
}

// only for testing //
async function hardCodeUsers() {
  // Erstelle ein leeres Objekt, um die Benutzerdaten zu speichern
  const userObject = {};

  for (const user of users) {
    // Verwende die E-Mail-Adresse als Schlüssel
    userObject[user.mail] = user;
  }

  // Konvertiere das Benutzerobjekt in ein JSON-String
  const userObjectJSON = JSON.stringify(userObject);

  // Setze das "contacts"-Objekt im Storage
  await setItem("contacts", userObjectJSON);
}

// delete All contacts
async function deleteAllContacts() {
  setItem("contacts", []);
}
