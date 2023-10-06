async function logIn() {
  try {
    let email = document.getElementById("loginEmail");
    let passwort = document.getElementById("loginPassword");
    
    const usersData = await getItem("users");
    const users = JSON.parse(usersData || "{}");

    const currentUser = Object.values(users).find(
      (user) => user.email === email.value && user.password === passwort.value
    );

    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = "../index.html";
    } else {
      alert("Benutzer nicht gefunden. Überprüfen Sie Ihre E-Mail-Adresse und Ihr Passwort.");
    }
  } catch (error) {
    console.error("Fehler beim Einloggen:", error);
  }
}

function logInGuest() {
  currentUser = {
    name: "Guest",
    email: "guest",
    password: "guest"
  }
  window.location.href = "../../index.html";
}