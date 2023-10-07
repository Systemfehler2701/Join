function renderLoginMask() {
    var container = document.getElementById("content-app");

    container.innerHTML = /*html*/ `<div id="login_signupBody">
    <div class="login-headline">
      <img id="logo" src="../../assets/img/logo_main.svg" alt="Logo">
      <div class="headline-right">
        <span>Not a Join user?</span>
        <!--sign up button-->
      </div>
    </div>
      <form onsubmit="logIn(); return false;" id="login_form">
        <h1>Log in</h1>
        <input type="email" id="loginEmail" placeholder="Email" />
        <input type="password" id="loginPassword" placeholder="Password" />
        <button type="submit">Log in</button>
        <button type="button" onclick="logInGuest()">Guest Log in</button>
      </form>
      <a onclick=renderHelp()></a>
      </div>`;
}