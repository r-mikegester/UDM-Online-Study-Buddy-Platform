document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("studentsContainer");

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const students = users.filter((user) => user.role === "student");

  // Clear existing
  container.innerHTML = "";

  // Render each student card
  students.forEach((student) => {
    const card = document.createElement("div");
    card.className = "p-4 bg-white shadow rounded mb-4";

    card.innerHTML = `
          <h2 class="text-lg font-bold text-[#daa92b]">${student.fullName}</h2>
          <p><strong>Course:</strong> ${student.course}</p>
          <p><strong>Year:</strong> ${student.year}</p>
          <p><strong>Email:</strong> ${student.email}</p>
        `;

    container.appendChild(card);
  });
});

// if (!localStorage.getItem("email")) {
//   alert("Please sign in first.");
//   window.location.href = "/src/auth/signin.html";
// }

window.addEventListener("DOMContentLoaded", () => {
  const savedUser = JSON.parse(localStorage.getItem("user"));
  if (savedUser) {
    document.getElementById("profileName").textContent = savedUser.fullName;
    document.getElementById("profileCourse").textContent = savedUser.course;
    document.getElementById("profileYear").textContent = savedUser.year;
    document.getElementById("profileEmail").textContent = savedUser.email;

    const greeting = document.querySelector(".topbar h1");
    if (greeting && savedUser.fullName) {
      greeting.textContent = `Welcome, ${savedUser.fullName}`;
    }
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const savedUser = JSON.parse(localStorage.getItem("user"));
  if (savedUser) {
    document.getElementById("profileName").textContent = savedUser.fullName;
    document.getElementById("profileCourse").textContent = savedUser.course;
    document.getElementById("profileYear").textContent = savedUser.year;
    document.getElementById("profileEmail").textContent = savedUser.email;

    const greeting = document.querySelector(".profile h1");
    if (greeting && savedUser.fullName) {
      greeting.textContent = ` ${savedUser.fullName}`;
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const loginHistoryBody = document.getElementById("loginHistoryBody");
  const stored = JSON.parse(localStorage.getItem("loginHistory") || "[]");

  if (!loginHistoryBody) return;

  // Clear existing table rows (if needed)
  loginHistoryBody.innerHTML = "";

  let adminCount = 0;
  let userCount = 0;

  stored.forEach((entry) => {
    // Append row to table
    const row = document.createElement("tr");
    row.className = "hover:bg-gray-100";

    row.innerHTML = `
          <td class="px-4 py-3">${entry.name}</td>
          <td class="px-4 py-3 font-medium ${
            entry.role === "Admin" ? "text-red-600" : "text-blue-600"
          }">${entry.role}</td>
          <td class="px-4 py-3">${entry.date}</td>
          <td class="px-4 py-3">${entry.time}</td>
        `;
    loginHistoryBody.appendChild(row);

    // Count admin vs users
    if (entry.role === "Admin") {
      adminCount++;
    } else {
      userCount++;
    }
  });

  // Update the dashboard cards with counts
  // Find the cards by text or assign IDs to them first for easier targeting

  // For demo: let's add IDs to the relevant cards in your HTML:
  // Card 3 (Total Admin Login): <p> ... <strong id="adminLoginCount">5</strong> ... </p>
  // Card 4 (Total User Login): <p> ... <strong id="userLoginCount">245</strong> ... </p>

  const adminLoginCountElem = document.getElementById("adminLoginCount");
  const userLoginCountElem = document.getElementById("userLoginCount");

  if (adminLoginCountElem) adminLoginCountElem.textContent = adminCount;
  if (userLoginCountElem) userLoginCountElem.textContent = userCount;

  // Optionally, you can add a total login card or somewhere else
  const totalLoginCount = adminCount + userCount;
  console.log(`Total logins: ${totalLoginCount}`);
});

// Sidebar toggle
document.getElementById("menu-toggle").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("active");
});

document.addEventListener("DOMContentLoaded", function () {
  const stored = JSON.parse(localStorage.getItem("loginHistory") || "[]");

  // Count roles
  const roleCounts = stored.reduce((acc, entry) => {
    const role = entry.role || "Unknown";
    acc[role] = (acc[role] || 0) + 1;
    return acc;
  }, {});

  // Prepare chart data
  const ctx = document.getElementById("loginChart").getContext("2d");
  new Chart(ctx, {
    type: "pie",
    data: {
      labels: Object.keys(roleCounts),
      datasets: [
        {
          label: "Login Count",
          data: Object.values(roleCounts),
          backgroundColor: ["#f87171", "#60a5fa"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Number of Logins",
          },
        },
      },
    },
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser || currentUser.role !== "admin") {
    alert("Access denied. Admins only.");
    window.location.href = "/src/auth/signin.html";
  }
});
