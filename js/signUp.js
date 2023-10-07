let regUsers = {};

async function renderSignUpMask() {
  var container = document.getElementById("content-app");

  container.innerHTML = `<div id="login_signupBody">

  <form onsubmit="register(); return false;">
      <input required type="name" id="signUpName" placeholder="Name" />
      <input required type="email" id="signUpEmail" placeholder="Email" />
      <input required type="password" id="signUpPw" placeholder="Password" />
      <input
        required
        type="password"
        id="signUpPw2"
        placeholder="Confirm Password"
      />
      <button id="registerBtn">Registrieren</button>

      <input
        class=""
        type="checkbox"
        value=""
        id="signUpCheck"
        checked
      />
      <label>
        I accept the
        <a onclick="renderPolicy()">Privacy Policy</a>
      </label>
    </form></div>`;
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
    app();
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
