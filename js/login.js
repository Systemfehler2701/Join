let currentUser = null;
let isGuestUser = false;

async function logIn() {
  try {
    const emailInput = document.getElementById("loginEmail");
    const passwordInput = document.getElementById("loginPassword");
    const loginRememberCheckbox = document.getElementById("loginRemember");

    const usersData = await getItem("users");
    const users = JSON.parse(usersData);

    if (loginRememberCheckbox.checked) {
      // Wenn ausgewählt, Daten im Local Storage speichern
      var email = loginEmailInput.value;
      localStorage.setItem("rememberedEmail", email);
    } else {
      // Wenn nicht ausgewählt, zuvor gespeicherte Daten löschen
      localStorage.removeItem("rememberedEmail");
    }

    // Überprüfen, ob die eingegebene E-Mail in den Benutzerdaten vorhanden ist
    if (users.hasOwnProperty(emailInput.value)) {
      const userData = users[emailInput.value];

      // Überprüfen, ob das eingegebene Passwort mit dem gespeicherten Passwort übereinstimmt
      if (userData.password === passwordInput.value) {
        // Kopiere alle Benutzerdaten in den currentUser
        currentUser = { email: emailInput.value, name: userData.name, color: '#7D0C03', user: 'current'};
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
    color: '#0D0D0F'
  };
  isGuestUser = true;
  app();
}

function logOut() {
  currentUser = null;
  app();
}

async function addCurrentUser() {
  users = JSON.parse(await getItem("contacts"));
  userArray.unshift(currentUser)
  await setItem('contacts', users);
}

async function removeCurrentUser() {
  users = JSON.parse(await getItem("contacts"));
  if(users[0]['user'] == 'current') {
    users.splice(0, 1);
    await setItem('contacts', users);
  }
}