function getSession() {
  return JSON.parse(localStorage.getItem("pepSession"));
}

function goBack() {
  history.back();
}

function openLoginActivity() {
  document.getElementById("loginActivityModal").style.display = "flex";
}

function closeLoginActivity() {
  document.getElementById("loginActivityModal").style.display = "none";
}

function toggle2FA() {
  const chip = document.querySelector(".status-chip");
  if (!chip) return;

  if (chip.innerText === "Disabled") {
    chip.innerText = "Enabled";
    chip.classList.remove("warning");
    chip.classList.add("success");
  } else {
    chip.innerText = "Disabled";
    chip.classList.remove("success");
    chip.classList.add("warning");
  }
}

function openInvite() {
  const btn = event.currentTarget;
  btn.disabled = true;
  const original = btn.innerHTML;

  btn.innerHTML = "Loading...";

  setTimeout(() => {
    btn.innerHTML = original;
    btn.disabled = false;
    document.getElementById("inviteModal").style.display = "flex";
  }, 700);
}

function closeInvite() {
  document.getElementById("inviteModal").style.display = "none";
}

function inviteWhatsApp() {
  const user = getSession();
  if (!user) return;

  const text = encodeURIComponent(
    `Join my Pep workspace.\nUser: ${user.name}\n`
  );

  window.open(`https://wa.me/?text=${text}`, "_blank");
}

function inviteLink() {
  alert("Invite link copied (demo)");
}

function logoutUser() {
  localStorage.removeItem("pepSession");
  window.location.href = "index.html";
}

function enforceInviteAccess() {
  const user = getSession();
  if (!user) return;

  const inviteBtn = document.querySelector(".invite-btn");
  if (!inviteBtn) return;

  if ((user.plan || "Free") === "Free") {
    inviteBtn.disabled = true;
    inviteBtn.style.opacity = "0.6";
    inviteBtn.style.cursor = "not-allowed";
  }
}

document.addEventListener("DOMContentLoaded", enforceInviteAccess);
