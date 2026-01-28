function getSession() {
  return JSON.parse(localStorage.getItem("pepSession"));
}

function renderFloatingProfile() {
  const user = getSession();
  const fp = document.getElementById("floatingProfile");

  if (!fp) return;

  if (!user || !user.loggedIn) {
    fp.style.display = "none";
    return;
  }

  document.querySelectorAll("#profileInitial").forEach(el => {
    el.innerText = user.name.charAt(0).toUpperCase();
  });

  document.getElementById("floatingName").innerText =
    `Welcome ${user.name}`;

  document.getElementById("floatingPlan").innerText =
    `${user.plan || "Free"} Plan`;

  fp.style.display = "flex";
}

document.addEventListener("DOMContentLoaded", renderFloatingProfile);

function openNotifications() {
  renderNotifications();
  document.getElementById("notificationModal").style.display = "flex";
}

function closeNotifications() {
  document.getElementById("notificationModal").style.display = "none";
}

function renderNotifications() {
  const list = document.getElementById("notificationList");

  // Default demo notifications (NOT fixed forever)
  const notifications = [
    { text: "Welcome to Pep 🎉", time: "Just now" },
    { text: "Your account was created", time: "Today" },
    { text: "Explore Settings to customize experience", time: "Today" }
  ];

  list.innerHTML = "";

  if (notifications.length === 0) {
    list.innerHTML = `
      <div class="empty-state">
        🎉 You’re all caught up<br>
        <small>No notifications yet</small>
      </div>
    `;
    return;
  }

  notifications.forEach(n => {
    const div = document.createElement("div");
    div.className = "notification-item";
    div.innerHTML = `
      <strong>${n.text}</strong>
      <span>${n.time}</span>
    `;
    list.appendChild(div);
  });
}