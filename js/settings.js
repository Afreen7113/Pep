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
  const chip = document.getElementById('twoFAChip');
  const isEnabled = chip.classList.contains('is-enabled');

  if (isEnabled) {
    // Turn OFF → Disabled (red)
    chip.classList.remove('is-enabled');
    chip.classList.add('is-disabled');
    chip.textContent = 'Disabled';
  } else {
    // Turn ON → Enabled (green)
    chip.classList.remove('is-disabled');
    chip.classList.add('is-enabled');
    chip.textContent = 'Enabled';
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
