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
  users = JSON.parse(await getItem("contacts"));
  let content = "";
  let currentInitial = "";

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
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
            <div class="contactfield-wrapper" id='painted${i}'>
                <div class="contactfield" onclick="showDetails(${i}); changeBackgroundColor(${i});">
                    <div class="initials-logo" style="background-color: ${
                      user.color
                    }">${getInitials(user.name)}</div>
                    <div class="contact">
                        <span class= 'name'><p><h3>${user.name}</h3></p></span>
                        <span class='mail'><p><h3>${user.mail}</h3></p></span>
                    </div>
                </div>
            </div>
            
        `;
  }

  document.getElementById("contactlist").innerHTML = content;
}

async function addContact(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const mail = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  const newUser = {
    name,
    mail,
    phone,
    color: randomColor,
  };

  users.push(newUser);
  users.sort((a, b) => a.name.localeCompare(b.name));
  await setItem("contacts", users);
  renderContactList();
  closeOverlay();
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
    <div class="iconWrapper" onclick="editContact(${index})">
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

// Event Listeners
function addContactsEventlistener() {
  renderContactList();

  document.getElementById("menu").addEventListener("click", toggleOverlay);
  document.getElementById("responsiveButton").addEventListener("click", openOverlay);
  document.getElementById("contactForm").addEventListener("submit", addContact);
  document.querySelector(".addButton").addEventListener("click", openOverlay);
  document.getElementById("closeForm").addEventListener("click", closeOverlay);
//   document.getElementById("editForm").addEventListener("submit", updateContact);
  document
    .getElementById("closeEditForm")
    .addEventListener("click", closeEditOverlay);
  document
    .getElementById("deleteContactBtn")
    .addEventListener("click", function () {
      const indexToDelete = document.getElementById("editIndex").value;
      deleteContact(indexToDelete);
      document.getElementById("editOverlay").style.display = "none";
      window.addEventListener("resize", checkWindowSize);
      document
        .getElementById("backToContacts")
        .addEventListener("click", () => {
          document.querySelector(".rightside").style.display = "none";
        });
    });
}

function toggleOverlay() {
  var overlay = document.getElementById("contactOverlay");

  if (overlay.classList.contains("overlay-hidden")) {
    overlay.classList.remove("overlay-hidden");
    overlay.classList.add("overlay-visible");
  } else {
    overlay.classList.remove("overlay-visible");
    overlay.classList.add("overlay-hidden");
  }
}
