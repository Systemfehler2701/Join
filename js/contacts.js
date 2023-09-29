let users = [{
        name: 'Elon Musk',
        mail: 'elonthegreatest@twitter.to',
        phone: '123-456-7890',
    },
    {
        name: 'Jan Woll',
        mail: 'woll.jan@berlin',
        phone: '123-456-7890',
    },
    {
        name: 'Stefanie Hinze',
        mail: 'stefanine.hinze@google.de',
        phone: '123-456-7890',
    },
    {
        name: 'Max Mustermann',
        mail: 'mustermann@mustermail.de',
        phone: '123-456-7890',
    },
    {
        name: 'Michael Fischer',
        mail: 'mustermann@mustermail.de',
        phone: '123-456-7890',
    },
]

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const colors = ['#FF7A00', '#FF5EB3', '#6E52FF', '#9327FF', '#00BEE8', '#1FD7C1', '#FF745E', '#FFA35E', '#FC71FF', '#FFC701', '#0038FF', '#C3FF2B', '#FFE62B', '#FF4646', '#FFBB2B'];

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('.addButton').addEventListener('click', openOverlay);
    document.getElementById('closeForm').addEventListener('click', closeOverlay);
    document.getElementById('contactForm').addEventListener('submit', addContact);

    document.getElementById('closeEditForm').addEventListener('click', closeEditOverlay); // Dies wurde hinzugefügt
});

function render() {
    let content = '';
    let currentInitial = '';

    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const userInitial = user.name[0].toUpperCase();

        // Falls der Benutzer keine Farbe hat, weisen Sie ihm hier eine zu
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
    <div class="initials-logo" style="background-color: ${user.color}">${getInitials(user.name)}</div>
    <div class="contact">
    <span class= 'name'>
        <p><b>${user.name}</b></p></span>

    <span class='mail'>
        <p><b>${user.mail}</b></p>
</span>
</div>
</div>
</div>
</div>`;
    }

    document.getElementById('contactlist').innerHTML = content;
}


function addContact(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const mail = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newUser = {
        name: name,
        mail: mail,
        phone: phone,
        color: randomColor
    };

    users.push(newUser);
    users.sort((a, b) => a.name.localeCompare(b.name));

    render();
    closeOverlay();
}

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const mail = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.getElementById('editForm').addEventListener('submit', updateContact);

    const newUser = {
        name: name,
        mail: mail,
        phone: phone,
        color: randomColor
    };

    users.push(newUser);
    users.sort((a, b) => a.name.localeCompare(b.name));

    render();
    closeOverlay();
});


function getInitials(name) {
    const parts = name.split(' ');
    let initials = parts[0][0]; // Erster Buchstabe des Vornamens

    if (parts.length > 1) {
        initials += parts[parts.length - 1][0]; // Erster Buchstabe des Nachnamens
    }

    return initials.toUpperCase();

}

function addNewContact() {
    document.getElementById('overlay').style.display = 'block';
}

function openOverlay() {
    document.getElementById('overlay').style.display = 'block';
}

function closeOverlay() {
    document.getElementById('overlay').style.display = 'none';
}

document.querySelector('.addButton').addEventListener('click', openOverlay);
document.getElementById('closeForm').addEventListener('click', closeOverlay);
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const mail = document.getElementById('email').value;

    users.push({
        name: name,
        mail: mail,
    });

    render();
    closeOverlay();
});

function jumpToLetter(letter) {
    const element = document.getElementById(`alphabet-${letter}`);
    if (element) {
        element.scrollIntoView();
    }
}

function showDetails(index) {
    const user = users[index];
    const initials = getInitials(user.name);

    const detailsContent = /* html */ `
    <div class="contactView">
      <div class="detailsLogo" style="background-color: ${user.color}; margin: 0 auto;">${initials}</div>
        <div class="name">
        <h3>${user.name}</h3>
        <img src="/assets/img/edit.svg" onclick= editContact(${index})> Edit
        <img src="/assets/img/delete.svg" onclick= deleteContact(${index})> Delete 
        </div>

    </div>
        <div class="contactInformation">
        <h3>Contact Information</h3>
        <h3>Email</h3><br>
        <p class="email-blue">${user.mail}</p>
        <h3>Phone</h3>
        <p>Phone: ${user.phone}</p>

        </div>
</div>
    `;

    document.getElementById('detailsContainer').innerHTML = detailsContent;
}


function changeBackgroundColor(i) {
    // Wenn ein Kontakt bereits ausgewählt ist, entfernen Sie die "selected"-Klasse
    for (let j = 0; j < users.length; j++) {
        const element = users[j];

        document.getElementById(`painted${j}`).classList.remove('selected');

    }
    document.getElementById(`painted${i}`).classList.add('selected');
}

function deleteContact(index) {
    // Löschen Sie den Benutzer aus dem Array
    users.splice(index, 1);

    // Aktualisieren Sie die Anzeige
    render();
    document.getElementById('detailsContainer').innerHTML = '';
    closeOverlay();
}

function editContact(index) {
    const user = users[index];

    // Die Benutzerdaten in das Formular laden
    document.getElementById('editName').value = user.name;
    document.getElementById('editEmail').value = user.mail;
    document.getElementById('editPhone').value = user.phone;
    document.getElementById('editIndex').value = index; // Speichern des Benutzerindex für das spätere Update

    // Setzen Sie die Initialen und Farbe des Kontakts im Edit-Overlay
    const editInitialsLogo = document.getElementById('editInitialsLogo');
    editInitialsLogo.textContent = getInitials(user.name);
    editInitialsLogo.style.backgroundColor = user.color;

    // Das Overlay anzeigen
    document.getElementById('editOverlay').style.display = 'block';
}

function updateContact(e) {
    e.preventDefault();

    const index = document.getElementById('editIndex').value;
    const user = users[index];

    user.name = document.getElementById('editName').value;
    user.mail = document.getElementById('editEmail').value;
    user.phone = document.getElementById('editPhone').value;

    render();
    closeEditOverlay();
    clearDetails();
}

function closeEditOverlay() {
    document.getElementById('editOverlay').style.display = 'none';
}

function clearDetails() {
    const detailsContainer = document.getElementById("detailsContainer");
    detailsContainer.innerHTML = "";
}