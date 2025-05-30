// admin-lessons.js
import { db } from '../firebase/firebase.js';
import {
  collection, getDocs, addDoc, deleteDoc, updateDoc, doc
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

const lessonsRef = collection(db, "lessons");

async function fetchLessons() {
  const snapshot = await getDocs(lessonsRef);
  const container = document.getElementById("lessonsTable");
  container.innerHTML = "";
  snapshot.forEach(docSnap => {
    const lesson = docSnap.data();
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${lesson.subject}</td>
      <td>${lesson.instructor}</td>
      <td>${lesson.year}</td>
      <td>${lesson.semester}</td>
      <td>
        <button onclick="deleteLesson('${docSnap.id}')">Delete</button>
      </td>
    `;
    container.appendChild(row);
  });
}

window.deleteLesson = async (id) => {
  await deleteDoc(doc(db, "lessons", id));
  fetchLessons();
};

document.getElementById("lessonForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const newLesson = {
    subject: e.target.subject.value,
    instructor: e.target.instructor.value,
    year: e.target.year.value,
    semester: e.target.semester.value,
    books: e.target.books.value.split(",").map(b => b.trim()),
  };
  await addDoc(lessonsRef, newLesson);
  e.target.reset();
  fetchLessons();
});

document.addEventListener("DOMContentLoaded", fetchLessons);
