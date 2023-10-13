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
    <div class="iconWrapper" onclick="renderEditContact()">
        <img class="icon" src="/assets/img/edit.svg">
        <span class="iconText">Edit</span>
    </div>
    <div class="iconWrapper" onclick="deleteContact(currentlyDisplayedContactIndex)">
        <img class="icon" src="/assets/img/delete.svg">
        <span class="iconText">Delete</span>
    </div>
</div>
    </div>

    <  <!-- Overlay -->

    <div class="overlay">
            <div class="containerAll">
                <div class="darkside">
                    <div class="image-to-hide">
                        <span class="blueLineHorizontal"></span>
                    </div>
                </div>
                        <div class="whiteside">
                                
                                    
                        </div>    
                            <div class="inputContainer">
                                <form class="inputArea">
                                    <input type="hidden">
                                                <input class="inputName" type="text" id="editName" required>  
                                                <input class="inputMail" type="email" id="editEmail" required>           
                                                <input class="inputPhone" type="tel" id="editPhone" required>
                                        <div class="buttonArea">
                                            <button></button>
                                            <button></button>
                                            <button></button>
                                </form>  
                                        </div>
                            </div>
                        
            </div>    
    </div>

    `;
    addContactsEventlistener();
}