// Login

// Diese Funktion wird aufgerufen, wenn der Button mit der ID "LogIn" geklickt wird
function handleLoginClick() {
  // Die Werte aus den Input-Feldern abrufen

  emailValue = document.getElementById("loginEmail").value;
  passwordValue = document.getElementById("loginPw").value;
  // Die Werte in der Konsole ausgeben

  console.log("Eingegebene Email: " + emailValue);
  console.log("Eingegebenes Passwort: " + passwordValue);
  console.log("Aktuelle User: " + currentuser());
}

function handleGuestClick() {
  // Die Werte aus den Input-Feldern abrufen
  guestuser = "Guest";
  console.log("Aktuelle User: " + guestuser);
}

// Den Button mit der ID "LogIn" finden und einen Klick-Event-Listener hinzufügen
const loginButton = document.getElementById("LogIn");
loginButton.addEventListener("click", handleLoginClick);

// Den Button mit der ID "Guest" finden und einen Klick-Event-Listener hinzufügen
const GuestButton = document.getElementById("Guest");
GuestButton.addEventListener("click", handleGuestClick);

function currentuser() {
  currentuser = document.getElementById("loginEmail").value;
  guestuser = "Guest";
  if ((handleLoginClick = true)) {
    handleLoginClick();
  } else {
    handleGuestClick();
  }
}
