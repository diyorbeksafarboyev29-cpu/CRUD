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
    id: users.length == 0 ? 1 : users.at(-1).id + 1,
    name: name,
    email: formData.get("email"),
    role: formData.get("role"),
    isActive: formData.get("isActive") ? true : false,
  };
  users.push(userData);
  updateUi(users);
  console.log(userData);

  formEl.reset();
  modalEl.classList.add("hidden");
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modalEl.classList.add("hidden");
  }
});

function updateUi(arr) {
  usersWrapperEL.innerHTML = "";
  arr.forEach((item) => {
    let { id, name, email, role, isActive } = item;
    usersWrapperEL.innerHTML += `<div class="user-card">
  <div class="user-card__header">
    <div class="user-card__avatar">AV</div>
    <div class="user-card__info">
      <h3 class="user-card__name">${name}</h3>
      <p class="user-card__email">${email}</p>
    </div>
    <button onclick="deleteUser(${id})" class="user-card__delete-btn" title="O'chirish">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        <line x1="10" y1="11" x2="10" y2="17"></line>
        <line x1="14" y1="11" x2="14" y2="17"></line>
      </svg>
    </button>
  </div>

  <div class="user-card__footer">
    <span class="user-card__role">${role}</span>
    <span class="user-card__status user-card__status--active">
      ${isActive ? "Faol" : "No faol"}
    </span>
  </div>
</div>`;
  });
}

let usersList = users; // o'chirganda shu o'zgaradi

function deleteUser(id) {
  usersList = usersList.filter((user) => user.id !== id);

  usersWrapperEL.innerHTML = ""; // eski kartalarni tozalaymiz
  updateUi(usersList); // qolganlarini qayta chizamiz
}

window.deleteUser = deleteUser; // onclick ko'rishi uchun

updateUi(users);
