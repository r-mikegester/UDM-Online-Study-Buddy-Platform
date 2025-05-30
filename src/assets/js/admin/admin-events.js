// admin-events.js
import { db } from '../firebase/firebase.js';
import {
  collection, getDocs, addDoc, deleteDoc, doc
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

const eventsRef = collection(db, "events");

async function fetchEvents() {
  const snapshot = await getDocs(eventsRef);
  const container = document.getElementById("eventsTable");
  container.innerHTML = "";
  snapshot.forEach(docSnap => {
    const event = docSnap.data();
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${event.title}</td>
      <td>${event.date}</td>
      <td>${event.location}</td>
      <td>${event.description}</td>
      <td>
        <button onclick="deleteEvent('${docSnap.id}')">Delete</button>
      </td>
    `;
    container.appendChild(row);
  });
}

window.deleteEvent = async (id) => {
  await deleteDoc(doc(db, "events", id));
  fetchEvents();
};

document.getElementById("eventForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const newEvent = {
    title: e.target.title.value,
    date: e.target.date.value,
    location: e.target.location.value,
    description: e.target.description.value,
  };
  await addDoc(eventsRef, newEvent);
  e.target.reset();
  fetchEvents();
});

document.addEventListener("DOMContentLoaded", fetchEvents);
