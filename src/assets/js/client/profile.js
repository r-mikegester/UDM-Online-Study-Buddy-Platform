// profile.js

import { auth } from '../firebase/firebase.js';

function loadProfile() {
    const user = auth.currentUser ;
    if (user) {
        document.getElementById("profileName").textContent = user.displayName || "Student";
        document.getElementById("profileEmail").textContent = user.email;
        // You can add more fields if needed
    }
}

// Load profile on page load
document.addEventListener("DOMContentLoaded", loadProfile);
