let currentUser = null;
let isGuestUser = false;

function renderLoginMask() {
  var container = document.getElementById("content-app");

  container.innerHTML = `<div id="login_signupBody">

      <img id="logo" src="../../assets/img/logo_main.svg" alt="Logo">
  
      <form onsubmit="logIn(); return false;" id="login_form">
        <h1>Log in</h1>
        <input type="email" id="loginEmail" placeholder="Email" />
        <input type="password" id="loginPassword" placeholder="Password" />
        <button type="submit">Log in</button>
        <button type="button" onclick="logInGuest()">Guest Log in</button>
      </form>
      <a onclick=renderHelp()></a>
      </div>`;
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
        currentUser = { email: emailInput.value, name: userData.name };
        isGuestUser = false;
        app();
      } else {
        alert("Falsches Passwort. Bitte überprüfen Sie Ihr Passwort.");
      }
    } else {
      alert("Benutzer nicht gefunden. Überprüfen Sie Ihre E-Mail-Adresse.");
    }

    console.log(currentUser);
    console.log(isGuestUser);
  } catch (error) {
    console.error("Fehler beim Einloggen:", error);
  }
}

function logInGuest() {
  currentUser = {
    name: "Guest",
    email: "guest@join",
  };
  isGuestUser = true;
  app();
}

function logOut() {
  currentUser = null;
  app();
}
