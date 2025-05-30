// lessons.js

import { db } from '../firebase/firebase.js';
import { collection, getDocs, query, where } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

async function updateLessons() {
    const year = document.getElementById("year").value;
    const semester = document.getElementById("semester").value;
    const lessonsContainer = document.getElementById("lessons-display");
    lessonsContainer.innerHTML = "Loading...";

    if (!year || !semester) {
        lessonsContainer.innerHTML = "<p class='text-center text-gray-500'>Select year and semester</p>";
        return;
    }

    const lessonsRef = collection(db, "lessons");
    const q = query(lessonsRef, where("year", "==", year), where("semester", "==", semester));

    const snapshot = await getDocs(q);
    lessonsContainer.innerHTML = "";

    snapshot.forEach(doc => {
        const lesson = doc.data();
        const lessonCard = document.createElement("div");
        lessonCard.className = "lesson-card p-4 border shadow rounded bg-white";
        lessonCard.innerHTML = `
            <h4 class="font-bold text-yellow-600">${lesson.subject}</h4>
            <p><strong>Instructor:</strong> ${lesson.instructor}</p>
            <p><strong>Books:</strong> ${lesson.books.join(", ")}</p>
        `;
        lessonsContainer.appendChild(lessonCard);
    });

    if (snapshot.empty) {
        lessonsContainer.innerHTML = "<p class='text-center text-gray-500'>No lessons found.</p>";
    }
}

// Load lessons on page load
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("year").addEventListener("change", updateLessons);
    document.getElementById("semester").addEventListener("change", updateLessons);
});
