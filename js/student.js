import { students } from "../data/data.js";

const studentsWrapperEl = document.querySelector(".users-container");
const modalEl = document.querySelector(".modal-overlay");
const btnEl = document.querySelector(".add-user");
const closeBtnEl = document.querySelector(".modal__close");
const formEl = document.querySelector("#addStudentForm");

// Add Student tugmasi
btnEl.addEventListener("click", () => {
  modalEl.classList.remove("hidden");
});

// Modalni yopish tugmasi (x)
closeBtnEl.addEventListener("click", () => {
  modalEl.classList.add("hidden");
});

modalEl.addEventListener("click", (e) => {
  if (e.target === modalEl) {
    modalEl.classList.add("hidden");
  }
});

// ESC bosilsa yopiladi
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modalEl.classList.add("hidden");
  }
});

// Formani yuborish
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  let formData = new FormData(e.target);

  let fullName = formData.get("fullName").trim(); // probellarni olib tashlaydi

  if (fullName === "") {
    alert("Ism va familiyani kiriting!");
    return;
  }

  let studentData = {
    fullName: fullName,
    age: Number(formData.get("age")),
    course: formData.get("course"),
    grade: Number(formData.get("grade")),
    isGraduated: formData.get("isGraduated") ? true : false,
  };

  console.log(studentData);
  updateUi([studentData]);

  formEl.reset();
  modalEl.classList.add("hidden");
});

function updateUi(arr) {
  arr.forEach((item) => {
    let { fullName, age, course, grade, isGraduated } = item;
    studentsWrapperEl.innerHTML += `
      <div class="student-card">
        <div class="student-card__header">
    <div class="student-card__avatar">${fullName[0]}</div> 
        <div class="student-card__info">
         
          <h3 class="student-card__name">${fullName}</h3>
            <p class="student-card__course">${course}</p>
          </div>
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
