import { users } from "../data/data.js";

const usersWrapperEL = document.querySelector(".users-container");
const modalEl = document.querySelector(".modal-overlay");
const btnEl = document.querySelector(".add-user");
const closeBtnEl = document.querySelector(".modal__close");
const formEl = document.querySelector("#addUserForm");
closeBtnEl.addEventListener("click", () => {
  modalEl.classList.add("hidden");
});

modalEl.addEventListener("click", (e) => {
  if (e.target === modalEl) {
    modalEl.classList.add("hidden");
  }
});

btnEl.addEventListener("click", () => {
  modalEl.classList.remove("hidden");
});

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  let formData = new FormData(e.target);

  let name = formData.get("name").trim();

  if (name === "") {
    alert("Ism va familiyani kiriting!");
    return;
  }

  let userData = {
    name: name,
    email: formData.get("email"),
    role: formData.get("role"),
    isActive: formData.get("isActive") ? true : false,
  };

  console.log(userData);
  updateUi([userData]);

  formEl.reset();
  modalEl.classList.add("hidden");
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modalEl.classList.add("hidden");
  }
});

function updateUi(arr) {
  arr.forEach((item) => {
    let { id, name, email, role, isActive } = item;
    usersWrapperEL.innerHTML += `
      <div class="user-card">
        <div class="user-card__header">
          <div class="user-card__avatar">AV</div>
          <div class="user-card__info">
            <h3 class="user-card__name">${name}</h3>
            <p class="user-card__email">${email}</p>
          </div>
        </div>

        <div class="user-card__footer">
          <span class="user-card__role">${role}</span>
          <span class="user-card__status user-card__status--active"
            >${isActive ? "faol" : "faol emas"}</span
          >
        </div>
      </div>
    `;
  });
}

updateUi(users);
