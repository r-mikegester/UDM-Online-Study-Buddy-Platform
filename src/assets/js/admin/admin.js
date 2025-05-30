// admin.js

// Ensure admin is logged in by default if no current user is set
function ensureAdminLogin() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    const defaultAdmin = {
      name: "Admin",
      email: "admin@gmail.com",
      role: "admin"
    };
    localStorage.setItem("currentUser", JSON.stringify(defaultAdmin));
    console.log("Default admin logged in.");
  } else {
    console.log(`User already logged in as ${currentUser.name} (${currentUser.role})`);
  }
}

// Check for valid admin access on admin pages
function checkAdminAccess() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser || currentUser.role !== "admin") {
    alert("Access denied. Admins only.");
    window.location.href = "/src/auth/signin.html";
  }
}

// Display admin name if present
function displayAdminGreeting() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const header = document.querySelector(".main header h1");

  if (currentUser && header) {
    header.textContent = `Welcome, ${currentUser.name}!`;
  }
}

// Initialize admin dashboard
function initAdminDashboard() {
  ensureAdminLogin();
  checkAdminAccess();
  displayAdminGreeting();
}

// Run initialization on DOM load
document.addEventListener("DOMContentLoaded", initAdminDashboard);
