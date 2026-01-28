const AppState = {
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get(key, fallback = null) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  },
  remove(key) {
    localStorage.removeItem(key);
  }
};
function isNotificationsRead() {
  return localStorage.getItem("pepNotificationsRead") === "true";
}

function markNotificationsRead() {
  localStorage.setItem("pepNotificationsRead", "true");
}
document.addEventListener("DOMContentLoaded", updateNotificationBadge);
function openHelpCenter() {
  document.getElementById("helpCenterModal").style.display = "flex";
}

function closeHelpCenter() {
  document.getElementById("helpCenterModal").style.display = "none";
}
function closeActiveModal() {
  document.querySelectorAll(".modal").forEach(m => {
    m.style.display = "none";
  });
}
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeActiveModal();
});