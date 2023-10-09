function renderLoginMask() {
    var container = document.getElementById("content-app");

    container.innerHTML = /*html*/ `<div id="login_signupBody">
    <div class="login-headline">
      <img id="logo" src="../../assets/img/logo_main.svg" alt="Logo">
      <div class="headline-right">
        <span>Not a Join user?</span>
        <button id="SignUpbtn" type="button" onclick="renderSignUpMask()">Sign Up</button>
      </div>
    </div>
      <form onsubmit="logIn(); return false;" id="login_form">
        <div id="loginHead">
        <h1 id="loginTitle">Log in</h1>
        <div id="loginInput">
        <input type="email" id="loginEmail" placeholder="Email" />
        <input type="password" id="loginPassword" placeholder="Password" />
        </div>
        <div id="loginButtons">
        <button type="submit">Log in</button>
        <button class="guest-login-btn" type="button" onclick="logInGuest()">Guest Log in</button>
      </div>
      </form>
      </div>
      <div id="legalNotice">
      <a href="privacy_policy.html" target="_blank">Privacy Policy</a>
      
      <a href="legal_notice.html" target="_blank">Legal Notice</a>
      </div>`;
}