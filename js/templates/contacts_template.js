function renderContacts(element) {
    document.getElementById('help-link').classList.remove("d-none");
    navigationMenuClicked(element);
    let content = document.getElementById('content');
    content.innerHTML = /* html */ `
    <div id="leftside" class="contact-leftside">
        <div class="contact-left-button">
            <button class="addButton" onclick="openContactOverlay()">
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
    <!-- Overlay neu -->
<div class="contacts-overlay-content" id="overlay"> 
    <div class="contacts-overlay">
        <div class="darkside">
            <div id="contacts-overlay-headline"> 
                <img src="../assets/img/logo-white.svg">
                <h2 id="contacts-overlay-h2">add contact</h2>
                <h3 id="contacts-overlay-h3">Tasks are better with a team!</h3>
                <span class="blue-line-horizontal"></span>               
            </div>
        </div>
        <div class="whiteside">
        <button class="goBack"><img src="assets/img/close.svg"></button>
            <div class="contacts-overlay-whiteside-left">
                <div class="contacts-overlay-icon">
                    <img src="../assets/img/person2.svg">
                </div>
            </div>
            <div class="contacts-overlay-whiteside-right">
                <div class="contacts-overlay-close"><img src=""></div>
                <div class="inputContainer">
                    <form class="inputArea" onsubmit="">
                        <input class="inputName" type="text"placeholder="Surname Name" id="editName" required>  
                        <input class="inputMail" type="email"placeholder="Mail" id="editEmail" required>           
                        <input class="inputPhone" type="tel"placeholder="Phone" id="editPhone" required>
                        <div id="contacts-overlay-buttons">
                            <button class="cancelBtn">Cancel<img src="assets/img/close.svg"></button>
                            <button class="createBtn">Create Contact</button>
                        </div>    
                    </form>  
                </div>
            </div>
        </div>    
    </div>
</div>
    `;
    renderContactList();
}