// auth-check.js
import { auth, signOut } from "../firebase/firebase.js";

document.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    alert("You must be logged in to view this page.");
    window.location.href = "/src/auth/signin.html";
    return;
  }

  if (
    window.location.pathname.includes("admin.html") &&
    currentUser.role !== "admin"
  ) {
    alert("Unauthorized. Admins only.");
    window.location.href = "/src/auth/signin.html";
    return;
  }

  const profileNameEl = document.getElementById("profileName");
  if (profileNameEl) profileNameEl.textContent = currentUser.name || "User";

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      signOut(auth).then(() => {
        window.location.href = "/src/auth/signin.html";
      });
    });
  }
});
