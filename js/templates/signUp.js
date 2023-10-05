let regUsers = {};

async function signUpInit() {
  loadUsers();
}

async function loadUsers() {
  try {
    regUsers = JSON.parse(await getItem("users"));
  } catch (e) {
    console.error("Loading error:", e);
  }
}

async function register() {
  try {
    registerBtn.disabled = true;

    if (signUpPw.value !== signUpPw2.value) {
      alert("Die Passwörter stimmen nicht überein.");
      return;
    }

    const newUser = {
      name: signUpName.value,
      password: signUpPw.value,
    };

    // Verwende die E-Mail-Adresse als Schlüssel
    regUsers[signUpEmail.value] = newUser;

    await setItem("users", JSON.stringify(regUsers));
    resetForm();
    alert("Dein Konto wurde erstellt.");
  } catch (e) {
    console.error("Register error:", e);
  }
}

function resetForm() {
  try {
    signUpName.value = "";
    signUpEmail.value = "";
    signUpPw.value = "";
    signUpPw2.value = "";
    registerBtn.disabled = false;
  } catch (e) {
    console.error("Reset error:", e);
  }
}

// Überprüfen, ob die Passwörter übereinstimmen
function checkPassword() {
  if (password !== confirmPassword) {
    alert("Die Passwörter stimmen nicht überein.");
    return; // Die Funktion abbrechen, wenn die Passwörter nicht übereinstimmen
  } else {
    register();
  }
}
