let regUsers = {};

async function renderSignUpMask() {
  var container = document.getElementById("content-app");

  container.innerHTML = `<div id="login_signupBody">
        <div class="login-headline">
      <img id="logo" src="../../assets/img/logo_main.svg" alt="Logo">
      <div class="headline-right">
      </div>
    </div>
  <form id="signUp_form" onsubmit="register(); return false;">
    <div id="loginArrow">
      <img id="loginArrow" src="../../assets/img/arrow-left-line.svg" alt="Arrow" onclick="app()">
    </div>
    <div id="loginHead">
      <h1 id="loginTitle">Sign Up</h1>
    </div>
    <div id="loginInput">
      <input required type="text" id="signUpName" placeholder="Name" />
      <input required type="email" id="signUpEmail" placeholder="Email" />
      <input required type="password" id="signUpPw" placeholder="Password" />
      <input
        required
        type="password"
        id="signUpPw2"
        placeholder="Confirm Password"
      />
      </div>
      <div id="loginCheckbox">
      <input onclick="checkCheckbox()"
        class=""
        type="checkbox"
        value=""
        id="signUpCheck"
        unchecked
      />
      <span>
        I accept the <a href="privacy_policy.html" target="_blank">Privacy Policy</a>
      </span> 
      </div>
      <div id="loginButtons">
      <button id="signUpBtn" type=button >Sign Up</button></div>
    </div>
    </form></div>`;
}

async function register() {
  try {
    // signUpBtn.disabled = true;

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
    signUpBtn.disabled = false;
  } catch (e) {
    console.error("Reset error:", e);
  }
}

function checkCheckbox() {
  const signUpCheck = document.getElementById("signUpCheck");
  const signUpBtn = document.getElementById("signUpBtn");

  if (signUpCheck.checked) {
    signUpBtn.disabled = false;
    console.log("checked");
  } else {
    signUpBtn.disabled = true;
    console.log("unchecked");
  }
}
