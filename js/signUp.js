let regUsers = {};

async function renderSignUpMask() {
  var container = document.getElementById("content-app");

  container.innerHTML = /*html*/ `
      <div id="login_signupBody">
        <div class="login-headline">
          <img id="logo" src="../../assets/img/logo_main.svg" alt="Logo">
          <div class="headline-right">
          </div>
        </div>
        <div class="signUp-formular">
        <form id="signUp_form" onsubmit="register(); return false;">
          <div id="loginArrow">
            <img id="loginArrowImg" src="../../assets/img/arrow-left-line.svg" alt="Arrow" onclick="app()">
          </div>
          <div id="loginHead">
            <h1 id="loginTitle">Sign Up</h1>
          </div>
          <div id="loginInput">
            <input required type="text" id="signUpName" class="inputName" placeholder="Name" />
            <input required type="email" id="signUpEmail" class="inputEmailImg" placeholder="Email" />
            <input required type="password" id="signUpPw" class="" placeholder="Password" />
            <input
            required
            type="password"
            id="signUpPw2"
            placeholder="Confirm Password"
            />
          </div>
          <div id="loginCheckbox">
            <input 
            required  
            class=""
            type="checkbox"
            value=""
            id="signUpCheck"
            unchecked
            />
            <span>I accept the <a href="privacy_policy.html" target="_blank">Privacy Policy</a></span> 
          </div>
          <div id="loginButtons">
            <input style="display:none;" id="signUpBtn" type="submit">
            <button onclick="signUpBtn.click();">Sign Up</button>
          </div>
        </form>
      </div>
      </div>`;
}

async function register() {
  try {
    // signUpBtn.disabled = true;

    if (signUpPw.value !== signUpPw2.value) {
      // alert("Die Passwörter stimmen nicht überein.");
      return;
    }

    const newUser = {
      name: signUpName.value,
      password: signUpPw.value,
    };

    // Verwende die E-Mail-Adresse als Schlüssel
    regUsers[signUpEmail.value] = newUser;

    await setItem("users", JSON.stringify(regUsers));

    createOverlay("You Signed Up successfully.");
    setTimeout(app, 3000);

    resetForm();
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
    // console.error("Reset error:", e);
  }
}

function createOverlay(message) {
  const overlay = document.createElement("div");
  overlay.id = "customOverlay";
  overlay.innerHTML = `<div class="customAlert">${message}</div>`;
  document.body.appendChild(overlay);
}

function removeOverlay() {
  const overlay = document.getElementById("customOverlay");
  if (overlay) {
    overlay.parentNode.removeChild(overlay);
  }
}
