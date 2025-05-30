// events.js
document.addEventListener("DOMContentLoaded", () => {
  const events = JSON.parse(localStorage.getItem("events") || "[]");
  const container = document.getElementById("eventsList");
  if (!container) return;

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
