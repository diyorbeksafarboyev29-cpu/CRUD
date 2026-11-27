import { students } from "../data/data.js";

const studentsWrapperEl = document.querySelector(".users-container");
const modalEl = document.querySelector(".modal-overlay");
const btnEl = document.querySelector(".add-user");
const closeBtnEl = document.querySelector(".modal__close");
const formEl = document.querySelector("#addStudentForm");

btnEl.addEventListener("click", () => {
  modalEl.classList.remove("hidden");
});

closeBtnEl.addEventListener("click", () => {
  modalEl.classList.add("hidden");
});

modalEl.addEventListener("click", (e) => {
  if (e.target === modalEl) {
    modalEl.classList.add("hidden");
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modalEl.classList.add("hidden");
  }
});

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  let formData = new FormData(e.target);

  let fullName = formData.get("fullName").trim();

  if (fullName === "") {
    alert("Ism va familiyani kiriting!");
    return;
  }

  let studentData = {
    id: students.length == 0 ? 1 : students.at(-1).id + 1,
    fullName: fullName,
    age: Number(formData.get("age")),
    course: formData.get("course"),
    grade: Number(formData.get("grade")),
    isGraduated: formData.get("isGraduated") ? true : false,
  };
  students.push(studentData);
  updateUi(students);
  console.log(studentData);

  modalEl.classList.add("hidden");
});

function deleteStudent(id) {
  let findStudent = students.findIndex((item) => item.id == id);

  if (findStudent === -1) {
    return;
  }

  students.splice(findStudent, 1);

  studentsWrapperEl.innerHTML = "";
  updateUi(students);
}

window.deleteStudent = deleteStudent;

function updateUi(arr) {
  studentsWrapperEl.innerHTML = "";
  arr.forEach((item) => {
    let { id, fullName, age, course, grade, isGraduated } = item;
    studentsWrapperEl.innerHTML += `
      <div class="student-card">
        <div class="student-card__header">
          <div class="student-card__avatar">${fullName[0]}</div>
          <div class="student-card__info">
            <h3 class="student-card__name">${fullName}</h3>
            <p class="student-card__course">${course}</p>
          </div>
          <button onclick="deleteStudent(${id})" class="student-card__delete-btn" title="O'chirish">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>
        </div>

        <div class="student-card__details">
          <span>Yoshi: ${age}</span>
        </div>

        <div class="student-card__footer">
          <span class="student-card__grade">Baho: ${grade}</span>
          <span class="student-card__status ${
            isGraduated
              ? "student-card__status--graduated"
              : "student-card__status--studying"
          }">${isGraduated ? "bitirgan" : "o'qiyapti"}</span>
        </div>
      </div>
    `;
  });
}

updateUi(students);
