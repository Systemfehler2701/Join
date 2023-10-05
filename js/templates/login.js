async function logIn() {
  try {
    const emailInput = document.getElementById("loginEmail");
    const passwordInput = document.getElementById("loginPassword");
    
    const usersData = await getItem("users");
    const users = JSON.parse(usersData);

    // Überprüfen, ob die eingegebene E-Mail in den Benutzerdaten vorhanden ist
    if (users.hasOwnProperty(emailInput.value)) {
      const currentUser = users[emailInput.value];
      
      // Überprüfen, ob das eingegebene Passwort mit dem gespeicherten Passwort übereinstimmt
      if (currentUser.password === passwordInput.value) {
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        alert("Erfolgreich eingeloggt.");
        window.location.href = "../../index.html";
      } else {
        alert("Falsches Passwort. Bitte überprüfen Sie Ihr Passwort.");
      }
    } else {
      alert("Benutzer nicht gefunden. Überprüfen Sie Ihre E-Mail-Adresse.");
    }
  } catch (error) {
    console.error("Fehler beim Einloggen:", error);
  }
}


function logInGuest() {
  currentUser = {
    name: "Guest",
    email: "guest",
    password: "guest"
  }
  window.location.href = "../../index.html";
}