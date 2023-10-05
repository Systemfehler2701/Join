async function logIn() {
  try {
    let email = document.getElementById("loginEmail");
    let passwort = document.getElementById("loginPassword");
    
    const usersData = await getItem("users");
    const users = JSON.parse(usersData || "{}");

    const user = Object.values(users).find(
      (user) => user.email === email.value && user.password === passwort.value
    );

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = "index.html";
    } else {
      alert("Benutzer nicht gefunden. Überprüfen Sie Ihre E-Mail-Adresse und Ihr Passwort.");
    }
  } catch (error) {
    console.error("Fehler beim Einloggen:", error);
  }
}

// Delete Users from Storage

async function removeItem(key) {
  try {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    await fetch(url, {
      method: "DELETE",
    });
  } catch (e) {
    console.error("Remove error:", e);
  }
}
