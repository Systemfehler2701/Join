function renderContacts(element) {
    document.getElementById('help-link').classList.remove("d-none");
    navigationMenuClicked(element);
    let content = document.getElementById('content');
    content.innerHTML = /* html */ `
    <div class="contact-leftside">
        <button class="addButton" onclick="addNewContact()">
            <span>Add new Contact</span>
            <img src="assets/img/person_add.svg">
        </button>
        <div class="viewall">
            <div id="contactlist"></div>
        </div>
    </div>
        <div class="rightside">
            <div class="contacts-headline">
                <h1>Contacts</h1>
                <img class="contact-img" src="/assets/img/blue-stroke.svg">
                <h2>Better with a team</h2>
            </div>
            <div id="detailsContainer"></div>
            <!-- Dieser Container zeigt die Kontakt-Details an -->
        </div>

        <!-- Overlay für Kontaktformular -->
        <div class="overlay" id="overlay">
            <div class="containerAll">
                <div class="darkside">
                    <img src="/assets/img/logo-white.svg" alt="">
                    <button id="closeForm">X</button>
                    <h2>add contact</h2>
                    <h3>Tasks are better with a team!</h3>
                </div>
                <div class="form-container">
                    <div class="overlayPerson">
                        <img src="/assets/img/person.svg">
                    </div>
                    <form class="input-Area" id="contactForm">


                        <input class="inputName" type="text" placeholder="Surname Name" id="name" required>

                        <input class="inputMail" type="text" placeholder="E-Mail" id="email" required>

                        <input class="inputPhone" type="text" placeholder="Phone" id="phone" required>

                        <button class="createBtn" type="submit"> <span>Create contact</span><img src="/assets/check.svg"></button>
                    </form>
                </div>
            </div>
        </div>

        <!-- Overlay für Kontakt bearbeiten -->
        <div class="overlay" id="editOverlay">
            <div class="containerAll">
                <div class="darkside">
                    <img src="/assets/img/logo-white.svg" alt="">
                    <button id="closeEditForm">X</button>
                    <h3>Edit contact</h3>
                </div>
                <div class="Edit-Container">
                    <div class="Edit-Container">
                        <div class="initials-logo-edit" id="editInitialsLogo"></div>
                        <div>
                            <img src="/assets/img/contacts-white.svg">
                        </div>
                        <form class="edit-Area" id="editForm">
                            <input type="hidden" id="editIndex">

                            <label for="editName">Name:</label>
                            <input class="inputName" type="text" id="editName" required>

                            <label for="editEmail">E-Mail:</label>
                            <input class="inputMail" type="email" id="editEmail" required>

                            <label for="editPhone">Telefonnummer:</label>
                            <input class="inputPhone" type="tel" id="editPhone" required>

                            <div class="buttonOverview">

                                <button class="createBtn" type="submit">Save</button>
                                <button class="closeBtn" id="closeEditForm">Delete</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>`;
    loadContacts();
}