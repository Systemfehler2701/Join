let users = [];

async function signUpInit() {
  loadUsers();
}

async function loadUsers() {
  try {
    users = JSON.parse(await getItem("users"));
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

    users.push({
      name: signUpName.value,
      email: signUpEmail.value,
      password: signUpPw.value,
    });
    
    await setItem("users", JSON.stringify(users));
    resetForm();
  } catch (e) {
    console.error("Register error:", e);
  }
}

function resetForm() {
  try {
    signUpName.value = "";
    signUpEmail.value = "";
    signUpPw.value = "";
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
    register();}
}
