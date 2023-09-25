let users = [{
        name: 'Elon Musk',
        mail: 'elonthegreatest@twitter.to',
        color: 'red'
    },
    {
        name: 'Jan Woll',
        mail: 'woll.jan@berlin',
        color: 'red'
    },
    {
        name: 'Stefanie Hinze',
        mail: 'stefanine.hinze@google.de',
        color: 'red'
    },
    {
        name: 'Max Mustermann',
        mail: 'mustermann@mustermail.de',
        color: 'red'
    },
]

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function render() {
    let content = '';
    let currentInitial = '';

    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const userInitial = user.name[0].toUpperCase();

        if (userInitial !== currentInitial) {
            content += `<div class="alphabet-section" id="alphabet-${userInitial}">${userInitial}</div>`;
            currentInitial = userInitial;
        }

        content += /* html */ `
    <div class="contactfield">
        <div onclick= "showdetails()" class="contactname">
        <div class="initials-logo">${getInitials(user.name)}</div>
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
        color: 'red'
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