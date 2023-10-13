function renderContacts(element) {
    document.getElementById('help-link').classList.remove("d-none");
    navigationMenuClicked(element);
    let content = document.getElementById('content');
    content.innerHTML = /* html */ `
    <div id="leftside" class="contact-leftside">
        <div class="contact-left-button">
        <button class="addButton">
            <span>Add new Contact</span>
            <img src="assets/img/person_add.svg">
        </button>
        </div>
        <div class="viewall scroll">
            <button id="responsiveButton"><img src="assets/img/person_add.svg"></button>
            <div style="width: 100%" id="contactlist"></div>
        </div>
    </div>

        <div class="rightside" id="contactsforRespons">
        <div class="arrowBack">
        <img src="/assets/img/arrow-left-line.svg" alt="Back" id="backArrow" style="display:none;">
</div>
            <div class="contacts-headline">
                <h1>Contacts</h1>
                  <img class="contact-img" src="/assets/img/blue-stroke.svg">
                  <h2>Better with a team</h2>
                  <img class="contact-img-responsive" src="/assets/img/Vector 5.svg">
            </div>
            <div class="contactInfo" id="detailsContainer"></div>
            <div class="responsiveMenu">
            <button id="menu"><img src="assets/img/more_vert.svg"></button>
            </div>
 
            <div id="contactOverlay" class="overlay-hidden">
    <div class="iconWrapper" onclick="editContact(currentlyDisplayedContactIndex)">
        <img class="icon" src="/assets/img/edit.svg">
        <span class="iconText">Edit</span>
    </div>
    <div class="iconWrapper" onclick="deleteContact(currentlyDisplayedContactIndex)">
        <img class="icon" src="/assets/img/delete.svg">
        <span class="iconText">Delete</span>
    </div>
</div>
    </div>

        <!-- Overlay für Kontakt hinzufuegen -->
        <div class="overlay" id="overlay">
            <div class="containerAll">
                <div class="darkside">
                    <div class="image-to-hide">
                        <img src="/assets/img/logo-white.svg" alt="">
                        <h2>add contact</h2>
                        <h3>Tasks are better with a team!</h3>
                        <span class="blueLineHorizontal"></span>
                    </div>
                </div>
            <div class="form-container">
                    <div class="overlayPerson">
                        <img class="person img"src="/assets/img/person.svg">
                    </div>
                <div class="inputContainer"> 
                    <form class="inputArea" id="contactForm">
                        <input class="inputName" type="text" placeholder="Surname Name" id="name" required>
                        <input class="inputMail" type="text" placeholder="E-Mail" id="email" required>
                        <input class="inputPhone" type="text" placeholder="Phone" id="phone" required>
                        
                        <div class="buttonArea">
                        <button class="closeWin" id="closeForm">
                                        <img src="assets/img/person_add.svg" alt="Close" />
                            </button>
                            <button class="cancelBtn"> <span>Cancel</span><img src="/assets/img/close.svg"></button>
                            <button class="createBtn" type="submit"> <span>Create contact</span><img src="/assets/img/check.png"></button>
                    </form>
                </div>
            </div>
        </div>
        <!-- Overlay für Kontakt bearbeiten -->
        <div class="overlay" id="editOverlay">
            <div class="containerAll">
                <div class="darkside">
                    <div class="image-to-hide">
                        <img src="/assets/img/logo-white.svg" alt="">
                        <h2>Edit contact</h2> 
                        <span class="blueLineHorizontal"></span>
                    </div>
                </div>
                        <div class="form-container">
                                <button class="closeWindow" id="closeEditForm">X</button> 
                            <div class="detailsLogo" id="editInitialsLogo">
                                    <img class="person-img" src="/assets/img/person.svg" alt="">
                            </div>    
                                <div class="inputContainer">
                                    <form class="inputArea" id="editForm">
                                        <input type="hidden" id="editIndex">
                                            <input class="inputName" type="text" id="editName" required>  
                                            <input class="inputMail" type="email" id="editEmail" required>           
                                            <input class="inputPhone" type="tel" id="editPhone" required>
                                        <div class="buttonArea">
                                            <button class="deleteBtn" type="button" id="deleteContactBtn">Delete</button>
                                            <button class="createBtn" type="submit"><span>Save</span><img src="/assets/img/check.png" alt=""></button>
                                            <button class="closeBtn" id="closeEditFormBottom">Close</button>
                                    </form>  
                                        </div>
                                </div>
                            </div>
                        </div>
                </div>
        </div>
</div>`;
    addContactsEventlistener();
}