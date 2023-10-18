function renderContacts(element) {
    document.getElementById('help-link').classList.remove("d-none");
    navigationMenuClicked(element);
    let content = document.getElementById('content');
    content.innerHTML = /* html */ `
    <div id="leftside" class="contact-leftside">
        <div class="contact-left-button">
            <button class="addButton" onclick="renderAddContact()">
                <span>Add new Contact</span>
                <img src="assets/img/person_add.svg">
            </button>
        </div>
        <div class="viewall scroll">
            <button id="responsiveButton"><img src="assets/img/person_add.svg" onclick="renderAddContact()"></button>
            <div style="width: 100%" id="contactlist"></div>
        </div>
    </div>
            
    <div class="rightside" id="contactsforRespons">
        <div onclick="goBackToContacts()" class="arrowBack">
            <img src="/assets/img/arrow-left-line.svg" alt="Back" id="backArrow">
        </div>
        <div class="contacts-headline">
            <h1>Contacts</h1>
            <img class="contact-img" src="/assets/img/blue-stroke.svg">
            <h2>Better with a team</h2>
            <img class="contact-img-responsive" src="/assets/img/Vector 5.svg">
        </div>
        <div class="contactInfo" id="detailsContainer"></div>        
    </div>
    <div class="success-overlay" id="successOverlay">
                            <div class="success-message">
                                Contact succesfully created
                                </div>
                        </div>
    <!-- Overlay neu -->
<div class="contacts-overlay-content" id="overlay"> 
    <div class="contacts-overlay">
        <div class="darkside">
            <div id="contacts-overlay-headline"> 
                <img src="../assets/img/logo-white.svg">
                <h2 id="contacts-overlay-h2"></h2>
                <h3 id="contacts-overlay-h3"></h3>
                <span class="blue-line-horizontal"></span>               
            </div>
        </div>
        <div class="whiteside">
            <div class="contacts-overlay-close">
                <div class="contacts-overlay-close-img" onclick="closeContactOverlay()">
                    <div class="contacts-overlay-close-X"></div>
                </div>
            </div>
            <div class="whiteside-content">
                <div id="contacts-overlay-whiteside-left">  
                    <div id="contacts-overlay-icon-border" class="contacts-overlay-icon-border">
                    </div>                  
                </div>
                <div class="contacts-overlay-whiteside-right">
                    <div class="inputContainer">
                        <form class="contact-input-area" onsubmit="saveContact(); return false;" >
                            <input id="contact-edit-index" type="hidden" value="-1">
                            <input class="inputName" type="text"placeholder="Surname Name" id="editName" required>  
                            <input class="inputMail" type="email"placeholder="Email" id="editEmail" required>           
                            <input class="inputPhone" type="tel"placeholder="Phone" id="editPhone" required>
                            <div id="contacts-overlay-buttons">                                
                            </div>    
                        </form>  
                        
                    </div>
    </div>
</div>            
                         
                    </div>
                </div>
            </div>    
        </div>    
    </div>
</div>
    `;
    renderContactList();
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
    <div class="contactCard">
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
        <div class=contactoverview>
            <div class="contactInformation">
                <h3>Contact Information</h3>
                <br>
                <br>
                <h4>Email</h4><br>
                <p class="email-blue">${user.email}</p>
                <h4>Phone</h4>
                <p><h5>${user.phone}</h5></p>
            </div>
        </div>
        <button class="options-button" onclick="openContactSubmenu()"><img src="assets/img/more_vert.svg"></button>            
            <div class="options-menu" id="optionsMenu">
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
    `;

    document.getElementById("detailsContainer").innerHTML = detailsContent;
}