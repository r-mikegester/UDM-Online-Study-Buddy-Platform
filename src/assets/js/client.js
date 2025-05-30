const eventForm = document.getElementById("eventForm");
const eventList = document.getElementById("eventList");

// Load events from localStorage on page load
document.addEventListener("DOMContentLoaded", () => {
  const events = JSON.parse(localStorage.getItem("events")) || [];
  events.forEach(displayEvent);
});

// Handle form submission
eventForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("eventTitle").value;
  const date = document.getElementById("eventDate").value;
  const description = document.getElementById("eventDescription").value;

  const event = { title, date, description };

  // Save to localStorage
  const existingEvents = JSON.parse(localStorage.getItem("events")) || [];
  existingEvents.push(event);
  localStorage.setItem("events", JSON.stringify(existingEvents));

  // Display new event
  displayEvent(event);

  // Clear form
  eventForm.reset();
});

function displayEvent(event) {
  const card = document.createElement("div");
  card.className = "bg-white p-4 rounded-lg shadow hover:shadow-lg transition";
  card.innerHTML = `
            <h4 class="text-lg font-bold text-blue-700 mb-2">${event.title}</h4>
            <p class="text-sm text-gray-500 mb-1">📅 ${event.date}</p>
            <p class="text-gray-700 text-sm">${event.description}</p>
          `;
  eventList.appendChild(card);
}

const lessonData = {
  "1-1": Array.from({ length: 10 }, (_, i) => ({
    title: `1st Year - 1st Sem Topic ${i + 1}`,
    video: "https://www.youtube.com/embed/Wq8U2aDM3_0",
    book: "https://example.com/books/sample.pdf",
  })),
  "1-2": Array.from({ length: 10 }, (_, i) => ({
    title: `1st Year - 2nd Sem Topic ${i + 1}`,
    video: "https://www.youtube.com/embed/eIrMbAQSU34",
    book: "https://example.com/books/sample.pdf",
  })),
  "2-1": Array.from({ length: 10 }, (_, i) => ({
    title: `2nd Year - 1st Sem Topic ${i + 1}`,
    video: "https://www.youtube.com/embed/pQN-pnXPaVg",
    book: "https://example.com/books/sample.pdf",
  })),
  "2-2": Array.from({ length: 10 }, (_, i) => ({
    title: `2nd Year - 2nd Sem Topic ${i + 1}`,
    video: "https://www.youtube.com/embed/KGkiIBTq0y0",
    book: "https://example.com/books/sample.pdf",
  })),
  "3-1": Array.from({ length: 10 }, (_, i) => ({
    title: `3rd Year - 1st Sem Topic ${i + 1}`,
    video: "https://www.youtube.com/embed/Fdf5aTYRW0E",
    book: "https://example.com/books/sample.pdf",
  })),
  "3-2": Array.from({ length: 10 }, (_, i) => ({
    title: `3rd Year - 2nd Sem Topic ${i + 1}`,
    video: "https://www.youtube.com/embed/2ePf9rue1Ao",
    book: "https://example.com/books/sample.pdf",
  })),
  "4-1": Array.from({ length: 10 }, (_, i) => ({
    title: `4th Year - 1st Sem Topic ${i + 1}`,
    video: "https://www.youtube.com/embed/SJ0W9LJ9RQg",
    book: "https://example.com/books/sample.pdf",
  })),
  "4-2": Array.from({ length: 10 }, (_, i) => ({
    title: `4th Year - 2nd Sem Topic ${i + 1}`,
    video: "https://www.youtube.com/embed/vsQ3XJXKD5Y",
    book: "https://example.com/books/sample.pdf",
  })),
};

function updateLessons() {
  const year = document.getElementById("year").value;
  const sem = document.getElementById("semester").value;
  const key = `${year}-${sem}`;
  const display = document.getElementById("lessons-display");

  if (!lessonData[key]) {
    display.innerHTML = "<p>Please select a valid year and semester.</p>";
    return;
  }

  display.innerHTML = lessonData[key]
    .map(
      (lesson) => `
      <div class="lesson-card">
        <h4>${lesson.title}</h4>
        <iframe src="${lesson.video}" frameborder="0" allowfullscreen></iframe>
        <p><strong>📘 Recommended Book:</strong> <a href="${lesson.book}" target="_blank">Download / View</a></p>
      </div>
    `
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", function () {
  const events = JSON.parse(localStorage.getItem("events") || "[]");
  const container = document.getElementById("eventsList");
  if (events.length === 0) {
    container.innerHTML = "<p class='text-gray-500'>No upcoming events.</p>";
  } else {
    container.innerHTML = events
      .map(
        (e) => `
          <div class="bg-white p-4 rounded shadow">
            <h3 class="text-lg font-bold text-[#daa92b]">${e.title}</h3>
            <p>${e.description}</p>
            <p class="text-sm text-gray-500 mt-1">Created: ${new Date(
              e.createdAt
            ).toLocaleString()}</p>
          </div>
        `
      )
      .join("");
  }
});

//  if (!localStorage.getItem('email')) {
//       alert("Please sign in first.");
//       window.location.href = "signin.html";
//     }

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

// Sidebar toggle
document.getElementById("menu-toggle").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("active");
});

// Generate initials (up to 3 characters)
function getInitials(name) {
  if (!name) return "U";
  const parts = name.trim().split(/\s+/);
  let initials = parts
    .map((part) => part[0])
    .join("")
    .toUpperCase();
  return initials.slice(0, 3);
}

// Update profile and avatar
function updateUserProfile({ name, course, year, email }) {
  const initials = getInitials(name);

  // DiceBear avatar using initials
  const avatarURL = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
    initials
  )}&chars=1-3&fontSize=40&backgroundType=gradientLinear`;

  // Update DOM
  document.getElementById("profileName").textContent = name;
  document.getElementById("profileCourse").textContent = course;
  document.getElementById("profileYear").textContent = year;
  document.getElementById("profileEmail").textContent = email;
  document.getElementById("userAvatar").src = avatarURL;
  document.getElementById("userAvatar").alt = `Avatar for ${initials}`;
}

// Load on page
document.addEventListener("DOMContentLoaded", () => {
  // Replace with dynamic data from your user system
  const user = {
    name: "Al", // Change to "K", "Max", etc.
    course: "BSIT",
    year: "1st",
    email: "al@example.com",
  };

  updateUserProfile(user);
});

const socket = io("http://localhost:3000"); // Change to your server URL

const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const senderName = document.getElementById("senderName");
const receiverEmail = document.getElementById("receiverEmail");
const yearSelect = document.getElementById("yearSelect");

// Join selected room on load and when changed
function joinRoom() {
  const room = yearSelect.value;
  socket.emit("joinRoom", room);
  chatMessages.innerHTML = ""; // Clear messages on room change
}

yearSelect.addEventListener("change", joinRoom);
window.addEventListener("DOMContentLoaded", joinRoom);

function sendMessage() {
  const name = senderName.value.trim();
  const email = receiverEmail.value.trim();
  const message = chatInput.value.trim();
  const room = yearSelect.value;

  if (!name || !email || !message) {
    alert("Please fill in your name, receiver email, and message.");
    return;
  }

  const fullMessage = {
    name,
    to: email,
    message,
    room,
  };

  socket.emit("chatMessage", fullMessage);
  addMessage(`You: ${message}`, "sent");
  chatInput.value = "";
}

socket.on("chatMessage", (data) => {
  // Example: { name: "Alice", to: "bob@email.com", message: "Hi!", room: "year1" }
  const currentEmail = localStorage.getItem("email");
  if (data.to === currentEmail) {
    addMessage(`${data.name}: ${data.message}`, "received");
  }
});

function addMessage(message, type) {
  const div = document.createElement("div");
  div.classList.add("chat-message", type);
  div.textContent = message;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
