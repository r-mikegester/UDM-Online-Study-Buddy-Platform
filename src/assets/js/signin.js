
import { auth } from "./firebase/firebase.js";
   
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById('loginForm');

  if (!loginForm) return;

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    // Admin hardcoded login
    if (email === "admin@gmail.com" && password === "6921") {
      const adminUser = {
        name: "Admin",
        email: email,
        role: "admin"
      };
      localStorage.setItem("currentUser", JSON.stringify(adminUser));
      window.location.href = "/src/pages/admin.html";
      return;
    }

    // Firebase login
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        const userData = {
          name: user.displayName || user.email,
          email: user.email,
          uid: user.uid,
          role: "user"
        };

        localStorage.setItem("currentUser", JSON.stringify(userData));
        window.location.href = "/src/pages/user.html";
      })
      .catch((error) => {
        alert("Login failed: " + error.message);
      });
  });
});
