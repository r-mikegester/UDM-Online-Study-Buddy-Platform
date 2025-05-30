// Your DOM logic and sign-up handling here...
// /src/auth/signup.js
import { auth } from "../js/firebase/firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";

document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");

  if (!signupForm) return;

  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = document.getElementById("signupName").value.trim();
    const course = document.getElementById("signupCourse").value.trim();
    const year = document.getElementById("signupYear").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value.trim();

    if (!fullName || !course || !year || !email || !password) {
      alert("All fields are required!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          uid: user.uid,
          fullName,
          course,
          year,
          email,
        })
      );

      alert("Account created successfully!");
      window.location.href = "/src/users/client.html";
    } catch (error) {
      alert("Signup failed: " + error.message);
    }
  });
});
