let currentUser = null;
let isGuestUser = false;

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
        alert("Erfolgreich eingeloggt.");
        window.location.href = "../../index.html";
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
  window.location.href = "../../index.html";
}
