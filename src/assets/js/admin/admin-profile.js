// admin-profile.js
import { auth, db } from '../firebase/firebase.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

function loadAdminProfile() {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      document.getElementById("profileName").textContent = user.displayName || "Admin";
      document.getElementById("profileEmail").textContent = user.email;

      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);
      const userData = docSnap.exists() ? docSnap.data() : {};

      document.getElementById("profileRole").textContent = userData.role || "admin";
      document.getElementById("profileCourse").textContent = userData.course || "-";
      document.getElementById("profileYear").textContent = userData.year || "-";
    }
  });
}

document.addEventListener("DOMContentLoaded", loadAdminProfile);
