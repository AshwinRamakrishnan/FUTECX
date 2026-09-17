// email.js

// ====================
//  Firebase + Firestore
// ====================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

     // 🔹 TN-FUTECX Firebase Config
     const firebaseConfig = {
        apiKey: "AIzaSyDMj45IV8LXuOArD2DgtwvfB841dzcn620",
        authDomain: "tn-futecx.firebaseapp.com",
        projectId: "tn-futecx",
        storageBucket: "tn-futecx.firebasestorage.app",
        messagingSenderId: "884450104101",
        appId: "1:884450104101:web:eae68a54cdee6078f300cc",
        measurementId: "G-TNYE4ZSD3C"
      };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ====================
//  EmailJS Integration
// ====================
(function() {
  emailjs.init("YOUR_PUBLIC_KEY"); // From your EmailJS account
})();

async function subscribeEmail() {
  const emailInput = document.querySelector('input[type="email"]');
  const email = emailInput.value.trim();

  if (!email) {
    alert("Please enter a valid email.");
    return;
  }

  // 1️⃣ Save to Firestore
  try {
    await addDoc(collection(db, "subscribers"), { email });
    console.log("Saved to Firestore:", email);
  } catch (error) {
    console.error("Firestore error:", error);
  }

  // 2️⃣ Send EmailJS notification
  try {
    await emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", { email });
    alert("✅ Subscribed successfully! You’ll get FUTECX updates soon.");
    emailInput.value = "";
  } catch (error) {
    console.error("EmailJS error:", error);
    alert("Subscription saved, but mail sending failed. Try again later.");
  }
}

// ====================
//  Event Listener
// ====================
document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector("#subscribe-btn");
  if (button) {
    button.addEventListener("click", subscribeEmail);
  }
});
