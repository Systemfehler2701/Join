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

// Den Button mit der ID "LogIn" finden und einen Klick-Event-Listener hinzufügen
const loginButton = document.getElementById("LogIn");
loginButton.addEventListener("click", handleLoginClick);

function currentuser() {
  currentuser = document.getElementById("loginEmail").value;
  return currentuser;
}
