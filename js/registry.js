// Login

// Diese Funktion wird aufgerufen, wenn der Button mit der ID "LogIn" geklickt wird
function handleLoginClick() {
  // Die Werte aus den Input-Feldern abrufen
  const emailValue = document.getElementById("loginEmail").value;
  const passwordValue = document.getElementById("loginPw").value;

  // Die Werte in der Konsole ausgeben
  console.log("Eingegebene Email: " + emailValue);
  console.log("Eingegebenes Passwort: " + passwordValue);
}

// Den Button mit der ID "LogIn" finden und einen Klick-Event-Listener hinzufügen
const loginButton = document.getElementById("LogIn");
loginButton.addEventListener("click", handleLoginClick);

// Registry

// Diese Funktion wird aufgerufen, wenn das Formular abgeschickt wird
function submitForm() {
  // Formular-Element auswählen
  const form = document.getElementById("login_form");

  // Werte aus den Eingabefeldern abrufen
  const name = form.querySelector("#regName").value;
  const email = form.querySelector("#regEmail").value;
  const password = form.querySelector("#regPw").value;
  const confirmPassword = form.querySelector("#regPwcomfirm").value;

  // Überprüfen, ob die Passwörter übereinstimmen
  if (password !== confirmPassword) {
    alert("Die Passwörter stimmen nicht überein.");
    return; // Die Funktion abbrechen, wenn die Passwörter nicht übereinstimmen
  }

  // Daten in den Storage schreiben
  setItem("name", name)
    .then(() => setItem("email", email))
    .then(() => setItem("password", password))
    .then(() => {
      alert("Die Daten wurden erfolgreich gespeichert.");
      // Hier kannst du weitere Aktionen nach dem Speichern durchführen
    })
    .catch((error) => {
      console.error("Fehler beim Speichern der Daten:", error);
      alert("Es ist ein Fehler aufgetreten. Bitte versuche es erneut.");
    });
}

// Event Listener zum Abfangen des Formularabsendens hinzufügen
const submitButton = document.querySelector("Submit");
submitButton.addEventListener("click", submitForm);
