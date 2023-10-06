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

function loadContacts() {
    let content = '';
    let currentInitial = '';

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
                    <div class="initials-logo" style="background-color: ${user.color}">${getInitials(user.name)}</div>
                    <div class="contact">
                        <span class= 'name'><p><b>${user.name}</b></p></span>
                        <span class='mail'><p><b>${user.mail}</b></p></span>
                    </div>
                </div>
            </div>
        `;
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
        name,
        mail,
        phone,
        color: randomColor
    };

    users.push(newUser);
    users.sort((a, b) => a.name.localeCompare(b.name));
    loadContacts();
    closeOverlay();
}

function getInitials(name) {
    const parts = name.split(' ');
    let initials = parts[0][0];

    if (parts.length > 1) {
        initials += parts[parts.length - 1][0];
    }

    return initials.toUpperCase();
}

function openOverlay() {
    document.getElementById('overlay').style.display = 'block';
}

function closeOverlay() {
    document.getElementById('overlay').style.display = 'none';
}

function showDetails(index) {
    const user = users[index];
    const initials = getInitials(user.name);

    const detailsContent = /* html */ `
        <div class="contactView">
            <div class="detailsLogo" style="background-color: ${user.color}; margin: 0 auto;">${initials}</div>
            <div class="name">
                <h3>${user.name}</h3>
             <div class="contactsIcons">
                    <div class="editIcon">
                        <img class="editSymbol" src="/assets/img/edit.svg" onclick= editContact(${index})>
                        <span>Edit</span>
                    </div>
                    <div class="deleteIcon" onclick= deleteContact(${index})>
                        <img src="/assets/img/delete.svg">
                        <span>Delete </span>
                    </div>
            </div>
            </div>
        </div>
        <div class="contactInformation">
            <h3>Contact Information</h3>
            <h3>Email</h3><br>
            <p class="email-blue">${user.mail}</p>
            <h3>Phone</h3>
            <p>Phone: ${user.phone}</p>
        </div>
    `;

    document.getElementById('detailsContainer').innerHTML = detailsContent;
}

function changeBackgroundColor(i) {
    for (let j = 0; j < users.length; j++) {
        document.getElementById(`painted${j}`).classList.remove('selected');
    }
    document.getElementById(`painted${i}`).classList.add('selected');


}

function getColor(name) {
    const sum = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const colorIndex = sum % colors.length;
    return colors[colorIndex];
}

function deleteContact(index) {
    users.splice(index, 1);
    loadContacts();
    document.getElementById('detailsContainer').innerHTML = '';
    closeOverlay();
}

function editContact(index) {
    const user = users[index];
    document.getElementById('editName').value = user.name;
    document.getElementById('editEmail').value = user.mail;
    document.getElementById('editPhone').value = user.phone;
    document.getElementById('editIndex').value = index;

    const editInitialsLogo = document.getElementById('editInitialsLogo');
    editInitialsLogo.textContent = getInitials(user.name);
    editInitialsLogo.style.backgroundColor = user.color;

    document.getElementById('editOverlay').style.display = 'block';
}

function updateContact(e) {
    e.preventDefault();

    const index = document.getElementById('editIndex').value;
    const user = users[index];

    user.name = document.getElementById('editName').value;
    user.mail = document.getElementById('editEmail').value;
    user.phone = document.getElementById('editPhone').value;

    // Das Array erneut sortieren, nachdem ein Kontakt bearbeitet wurde
    users.sort((a, b) => a.name.localeCompare(b.name));

    loadContacts();
    closeEditOverlay();
    clearDetails();
}


function closeEditOverlay() {
    document.getElementById('editOverlay').style.display = 'none';
}

function clearDetails() {
    document.getElementById("detailsContainer").innerHTML = "";
}

// Event Listeners
function addContactsEventlistener() {
    loadContacts();
    document.getElementById('contactForm').addEventListener('submit', addContact);
    document.querySelector('.addButton').addEventListener('click', openOverlay);
    document.getElementById('closeForm').addEventListener('click', closeOverlay);
    document.getElementById('editForm').addEventListener('submit', updateContact);
    document.getElementById('closeEditForm').addEventListener('click', closeEditOverlay);

}