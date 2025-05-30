import { auth } from "./firebase/firebase.js";  // Adjust the path to match your project
import { signInWithEmailAndPassword } from "firebase/auth";


document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById('loginForm');

  if (!loginForm) return;

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    if (email === "admin@gmail.com" && password === "6921") {
      const adminUser = { name: "Admin", email, role: "admin" };
      localStorage.setItem("currentUser", JSON.stringify(adminUser));
      window.location.href = "/src/users/admin.html";
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        const userData = {
          name: user.displayName || user.email,
          email: user.email,
          uid: user.uid,
          role: "user"
        };

        localStorage.setItem("currentUser", JSON.stringify(userData));
        window.location.href = "/src/users/client.html";
      })
      .catch((error) => {
        alert("Login failed: " + error.message);
      });
  });
});
