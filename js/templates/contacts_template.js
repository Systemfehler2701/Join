function renderContacts(element) {
    document.getElementById('help-link').classList.remove("d-none");
    navigationMenuClicked(element);
    let content = document.getElementById('content');
    content.innerHTML = /* html */ `
    <div class="contact-leftside">
        <div class="contact-left-button">
        <button class="addButton">
            <span>Add new Contact</span>
            <img src="assets/img/person_add.svg">
        </button>
        </div>
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
            <div class="contactInfo" id="detailsContainer"></div>
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
                    <span class="blueLineHorizontal"></span>
                </div>
                <div class="form-container">
                    <div class="overlayContainer">
                    <div class="overlayPerson">
                        
                        <img class="person img"src="/assets/img/person.svg">
                    </div>
                    </div>
                    <form class="input-Area" id="contactForm">


                        <input class="inputName" type="text" placeholder="Surname Name" id="name" required>

                        <input class="inputMail" type="text" placeholder="E-Mail" id="email" required>

                        <input class="inputPhone" type="text" placeholder="Phone" id="phone" required>
                        <div class="buttonArea">
                        <button class="cancelBtn"> <span>Cancel</span><img src="/assets/img/close.svg"></button>
                        <button class="createBtn" type="submit"> <span>Create contact</span><img src="/assets/img/check.png"></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Overlay für Kontakt bearbeiten -->
        <div class="overlay" id="editOverlay">
            <div class="containerAll">
                <div class="darkside">
                    <img src="/assets/img/logo-white.svg" alt="">
                    <h3>Edit contact</h3>
                </div>
                <div class="form-container">
                <button class="closeWindow" id="closeEditForm">X</button>
                    <div class="Edit-Container">
                        <div class="overlayPerson" id="editInitialsLogo"></div>
                        <div>
                            
                        <form class="input-Area" id="editForm">
                            <input type="hidden" id="editIndex">

                            <label for="editName">Name:</label>
                            <input class="inputName" type="text" id="editName" required>

                            <label for="editEmail">E-Mail:</label>
                            <input class="inputMail" type="email" id="editEmail" required>

                            <label for="editPhone">Telefonnummer:</label>
                            <input class="inputPhone" type="tel" id="editPhone" required>

                            <div class="buttonArea">
                            <button class="deleteBtn" type="button" id="deleteContactBtn">Delete</button>
    <button class="createBtn" type="submit"><span>Save</span><img src="/assets/img/check.png"></button>
    <button class="closeBtn" id="closeEditForm">Close</button>
                        </form>
    
</div>
</div>
                    </div>
                </div>
            </div>
        </div>`;
    addContactsEventlistener();
}