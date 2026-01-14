document.addEventListener("DOMContentLoaded", function () {

  const paymentModal = document.getElementById("paymentModal");
  const freeModal = document.getElementById("freeModal");
  const planTitle = document.getElementById("planTitle");

  /* PRICE TOGGLE */
  const toggle = document.getElementById("priceToggle");
  const prices = document.querySelectorAll(".price");

  if (toggle) {
    toggle.addEventListener("change", () => {
      prices.forEach(p => {
        p.textContent = toggle.checked
          ? p.dataset.year
          : p.dataset.month;
      });
    });
  }

  /* PLAN BUTTON HANDLING */
  document.querySelectorAll("[data-plan]").forEach(button => {
    button.addEventListener("click", () => {
      const plan = button.dataset.plan;

      if (plan === "Free") {
        freeModal.style.display = "flex";
      } else {
        planTitle.textContent = plan + " Plan – Payment";
        paymentModal.style.display = "flex";
      }
    });
  });

});

/* PAYMENT METHOD SELECTION */
function selectPayment(type) {
  const area = document.getElementById("paymentArea");

  if (type === "upi") {
    area.innerHTML = `
      <p>Enter UPI ID</p>
      <input class="pay-input" placeholder="example@upi">
      <button class="mini-btn" onclick="processPayment()">Pay Now</button>
    `;
  }

  if (type === "card") {
    area.innerHTML = `
      <p>Enter Card Details</p>
      <input class="pay-input" placeholder="Card Number">
      <input class="pay-input" placeholder="MM / YY">
      <input class="pay-input" type="password" placeholder="CVV">
      <button class="mini-btn" onclick="processPayment()">Pay Now</button>
    `;
  }

  if (type === "qr") {
    area.innerHTML = `
      <p>Scan QR to Pay</p>
      <img src="assets/images/qr.png" class="qr-img">
      <p>Waiting for payment...</p>
      <button class="mini-btn" onclick="processPayment()">I Have Paid</button>
    `;
  }
}

/* PAYMENT PROCESS */
function processPayment() {
  const area = document.getElementById("paymentArea");

  area.innerHTML = `<p>Processing payment...</p>`;

  setTimeout(() => {
    alert(
      "Payment Successful!\nTransaction ID: TXN" +
      Math.floor(Math.random() * 1000000)
    );
    closePayment();
  }, 2000);
}

/* CLOSE MODALS */
function closePayment() {
  document.getElementById("paymentModal").style.display = "none";
}

function closeFree() {
  document.getElementById("freeModal").style.display = "none";
}
