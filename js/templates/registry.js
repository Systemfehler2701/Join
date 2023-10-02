// Registry

// Diese Funktion wird aufgerufen, wenn das Formular abgeschickt wird
function submitForm() {
  // Formular-Element auswählen
  const form = document.getElementById("login_form");

  // Werte aus den Eingabefeldern abrufen
  const name = form.querySelector("#regName").value;
  const email = form.querySelector("#regEmail").value;
  const password = form.querySelector("#regPw").value;
  const confirmPassword = form.querySelector("#regPwcConfirm").value;

  // Überprüfen, ob die Passwörter übereinstimmen
  if (password !== confirmPassword) {
    alert("Die Passwörter stimmen nicht überein.");
    return; // Die Funktion abbrechen, wenn die Passwörter nicht übereinstimmen
  }

  const userData = {
    name: getElementById("regName"),
    password: getElementById("regPwConfirm"),
  };

  setItem(email, JSON.stringify(userData))
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
const submitButton = document.querySelector("#Submit");
submitButton.addEventListener("click", submitForm);
