function goToApple() {
    window.location.href = "https://www.apple.com/app-store/";
}

function goToGoogle() {
    window.location.href = "https://play.google.com/store";
}
function openAuthModal() {
    const overlay = document.getElementById("authOverlay");
    if (overlay) {
        overlay.style.display = "flex";
    }
}

function closeAuthModal() {
    const overlay = document.getElementById("authOverlay");
    if (overlay) {
        overlay.style.display = "none";
    }
}

function createAccount() {
    alert("Account created successfully!");
    closeAuthModal();
}
function handleCreateAccount(event) {
    event.preventDefault(); // stop page reload

    // Browser will now ask to save password automatically

    alert("Account created successfully!");

    // Clear inputs
    document.getElementById("authForm").reset();

    // Close modal after short delay
    setTimeout(() => {
        closeAuthModal();
    }, 300);
}
