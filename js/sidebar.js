function openSidebar() {
  const user = getSession();
  if (!user || !user.loggedIn) {
    openAuthModal();
    return;
  }

  document.querySelectorAll("#profileInitial").forEach(el => {
    el.innerText = user.name.charAt(0).toUpperCase();
  });

  document.getElementById("sidebarName").innerText = user.name;
  document.getElementById("sidebarEmail").innerText = user.email;

  document.getElementById("userSidebar").classList.add("active");
  document.getElementById("sidebarOverlay").classList.add("active");

  const floating = document.getElementById("floatingProfile");
  if (floating) floating.style.display = "none";
}

function closeSidebar() {
  document.getElementById("userSidebar").classList.remove("active");
  document.getElementById("sidebarOverlay").classList.remove("active");

  const floating = document.getElementById("floatingProfile");
  if (floating) floating.style.display = "flex";
}

function openTicketHistory() {
  const user = getSession();
  if (!user || !user.loggedIn) {
    openAuthModal();
    return;
  }

  // Always go to support page
  window.location.href = "dashboard.html";
}


function openSupport() {
  window.location.href = "support.html";
}

function openSettings() {
  const user = getSession();
  if (!user || !user.loggedIn) {
    openAuthModal();
    return;
  }
  window.location.href = "settings.html";
}

function openProfile() {
  const user = getSession();
  if (!user || !user.loggedIn) {
    openAuthModal();
    return;
  }

  document.getElementById("editName").value = user.name || "";
  document.getElementById("editEmail").value = user.email || "";
  document.getElementById("editPhone").value = user.phone || "";

  document.getElementById("profileModal").style.display = "flex";
}

function closeProfile() {
  document.getElementById("profileModal").style.display = "none";
}

function saveProfile() {
  const user = getSession();
  if (!user) return;

  user.name = document.getElementById("editName").value.trim();
  user.email = document.getElementById("editEmail").value.trim();
  user.phone = document.getElementById("editPhone").value.trim();

  localStorage.setItem("pepSession", JSON.stringify(user));

  closeProfile();
  closeSidebar();
  location.reload();
}
function toggleTheme() {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "pepTheme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
}

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("pepTheme") === "dark") {
    document.body.classList.add("dark");
  }
});


function openNotifications() {
  AppState.set("pep.notifications.open", true);
  AppState.set("pep.notifications.read", true);

  renderNotifications();
  document.getElementById("notificationModal").style.display = "flex";

  updateNotificationBadge();
}

function closeNotifications() {
  AppState.set("pep.notifications.open", false);
  document.getElementById("notificationModal").style.display = "none";
}

function openHelp() {
  window.open("https://example.com/help", "_blank");
}
document.getElementById("sidebarSearch").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  document.querySelectorAll(".sidebar-nav a").forEach(item => {
    const text = item.innerText.toLowerCase();
    item.style.display = text.includes(query) ? "flex" : "none";
  });
});
function loadNotifications() {
  const count = JSON.parse(localStorage.getItem("pepNotifications"))?.length || 0;
  document.getElementById("notifCount").innerText = count;
}

document.addEventListener("DOMContentLoaded", loadNotifications);
function toggleTheme() {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "pepTheme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
}

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("pepTheme") === "dark") {
    document.body.classList.add("dark");
  }
});
let startX = 0;

document.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

document.addEventListener("touchend", e => {
  const endX = e.changedTouches[0].clientX;

  if (startX < 40 && endX > 120) openSidebar();   // swipe right
  if (startX > 120 && endX < 40) closeSidebar();  // swipe left
});
document.addEventListener("DOMContentLoaded", () => {
  if (AppState.get("pep.notifications.open")) {
    openNotifications();
  }
});
function updateNotificationBadge() {
  const badge = document.getElementById("notifCount");
  if (!badge) return;

  const read = AppState.get("pep.notifications.read", false);

  if (read) {
    badge.style.display = "none";
  } else {
    badge.style.display = "inline-flex";
    badge.innerText = notifications.length;
  }
}
function renderUserPlan() {
  const user = JSON.parse(localStorage.getItem("pepSession"));
  if (!user) return;

  const plan = user.plan || "Free";

  const floatingPlan = document.getElementById("floatingPlan");
  const planBadge = document.getElementById("planBadge"); 
  if (floatingPlan) {
const plan = user.plan ? user.plan : "Free";
floatingPlan.innerText = plan + " Plan";
  }
  if (planBadge) {
    planBadge.classList.remove("free", "pro", "team");
    if (plan === "Pro") planBadge.classList.add("pro");
    if (plan === "Team") planBadge.classList.add("team");
    if (plan === "Free") planBadge.classList.add("free");
  }
}

document.addEventListener("DOMContentLoaded", renderUserPlan);
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("sidebarSearch");

  if (!searchInput) return;

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();

    const links = document.querySelectorAll(
      ".sidebar-nav a, .sidebar-link"
    );

    links.forEach(link => {
      const text = link.innerText.toLowerCase();

      if (text.includes(query)) {
        link.style.display = "flex";
      } else {
        link.style.display = "none";
      }
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("sidebarSearch");
  const sidebar = document.getElementById("userSidebar");

  if (!searchInput || !sidebar) {
    console.warn("Sidebar search not initialized");
    return;
  }

  // collect ALL clickable items inside sidebar
  const items = Array.from(
    sidebar.querySelectorAll("a, button")
  ).filter(el => el.innerText.trim().length > 0);

  // 🔍 FILTER ON TYPE
  searchInput.addEventListener("input", () => {
    const q = searchInput.value.toLowerCase().trim();

    items.forEach(item => {
      const text = item.innerText.toLowerCase();
      item.style.display = text.includes(q) ? "flex" : "none";
    });
  });

  // ⏎ ENTER → AUTO OPEN IF SINGLE RESULT
  searchInput.addEventListener("keydown", e => {
    if (e.key !== "Enter") return;

    e.preventDefault();

    const visible = items.filter(
      item => item.style.display !== "none"
    );

    if (visible.length === 1) {
      visible[0].click();
      searchInput.value = "";
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelectorAll("#userSidebar a, #userSidebar button")
    .forEach(el => {
      el.addEventListener("click", () => {
        closeSidebar();
      });
    });
});
document.addEventListener("click", (e) => {
  const modal = document.getElementById("profileModal");
  if (e.target === modal) {
    closeProfile();
  }
});
function handleSidebarSearch(e) {
  if (e.key !== "Enter") return;

  const query = e.target.value.trim().toLowerCase();
  if (!query) return;

  // 🔍 GLOBAL SEARCH MAP
  const routes = {
    "profile": "index.html",
    "edit profile": "index.html",
    "settings": "settings.html",
    "ticket": "support.html",
    "tickets": "support.html",
    "support": "support.html",
    "help": "help.html",
    "help center": "help.html",
    "pricing": "pricing.html",
    "plan": "pricing.html",
    "plans": "pricing.html",
    "features": "features.html",
    "notification": "index.html",
    "notifications": "index.html"
  };

  for (const key in routes) {
    if (query.includes(key)) {
      window.location.href = routes[key];
      return;
    }
  }

  alert("No results found for \"" + query + "\"");
}
