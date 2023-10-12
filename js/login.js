let currentUser = null;
let isGuestUser = false;

/**
 * This function checks the value of the input field and changes the image
 */
function changePasswordImg() {
    if (document.getElementById("loginPassword").value != "") {
        document.getElementById("password-img").style.backgroundImage = 'url(../assets/img/visibility_off.svg)';
    } else {
        document.getElementById("password-img").style.backgroundImage = 'url(../assets/img/lock.svg)';
    }
}

/**
 * This function checks the value of the input field and makes the password visible or invisible
 * 
 * @returns void
 */
function togglePasswordVisibility() {
    let passwordField = document.getElementById("loginPassword");
    if (passwordField.value == "") {
        return;
    }
    if (passwordField.type === "password") {
        document.getElementById("password-img").style.backgroundImage = 'url(../assets/img/visibility.svg)';
        passwordField.type = "text";
    } else {
        document.getElementById("password-img").style.backgroundImage = 'url(../assets/img/visibility_off.svg)';
        passwordField.type = "password";
    }
}

async function logIn() {
    try {
        const emailInput = document.getElementById("loginEmail");
        const passwordInput = document.getElementById("loginPassword");

        const usersData = await getItem("users");
        const users = JSON.parse(usersData);

        // Überprüfen, ob die eingegebene E-Mail in den Benutzerdaten vorhanden ist
        if (users.hasOwnProperty(emailInput.value)) {
            const userData = users[emailInput.value];

            // Überprüfen, ob das eingegebene Passwort mit dem gespeicherten Passwort übereinstimmt
            if (userData.password === passwordInput.value) {
                // Kopiere alle Benutzerdaten in den currentUser
                currentUser = {
                    email: emailInput.value,
                    name: userData.name,
                    color: "#7D0C03",
                    user: "current",
                };
                isGuestUser = false;
                app();
            } else {
                alert("Benutzer oder Passwort falsch. Überprüfen Sie Ihre eingabe");
            }
        } else {
            alert("Benutzer oder Passwort falsch. Überprüfen Sie Ihre eingabe.");
        }
    } catch (error) {
        console.error("Fehler beim Einloggen:", error);
    }
}

function logInGuest() {
    currentUser = {
        name: "Guest",
        email: "guest@join",
        color: "#0D0D0F",
        user: "current",
    };
    isGuestUser = true;
    app();
}

function logOut() {
    currentUser = null;
    app();
}

function rememberMe() {
    var loginRememberCheckbox = document.getElementById("loginRemember");
    var loginEmailInput = document.getElementById("loginEmail");

    if (loginRememberCheckbox.checked) {
        // Wenn die Checkbox ausgewählt ist, schreibe den Wert von loginEmail ins localStorage
        var emailValue = loginEmailInput.value;
        localStorage.setItem("rememberedEmail", emailValue);
    } else {
        // Wenn die Checkbox nicht ausgewählt ist, entferne den Eintrag aus dem localStorage
        localStorage.removeItem("rememberedEmail");
    }
}

function fillRememberedEmail() {
    var loginEmailInput = document.getElementById("loginEmail");
    var rememberedEmail = localStorage.getItem("rememberedEmail");

    if (rememberedEmail) {
        loginEmailInput.value = rememberedEmail;
    }
}