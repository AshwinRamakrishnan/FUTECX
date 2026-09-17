// main.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, updateProfile } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-storage.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMj45IV8LXuOArD2DgtwvfB841dzcn620",
  authDomain: "tn-futecx.firebaseapp.com",
  projectId: "tn-futecx",
  storageBucket: "tn-futecx.firebasestorage.app",
  messagingSenderId: "884450104101",
  appId: "1:884450104101:web:eae68a54cdee6078f300cc",
  measurementId: "G-TNYE4ZSD3C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

// Login function
const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const profilePicture = document.getElementById("profile-picture").files[0];

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    alert("Login successful!");

    // Handle profile picture upload if selected
    if (profilePicture) {
      const storageRef = ref(storage, `profile_pictures/${user.uid}/profile_picture.jpg`);
      await uploadBytes(storageRef, profilePicture);
      const downloadURL = await getDownloadURL(storageRef);
      
      await updateProfile(user, { photoURL: downloadURL });
      console.log("Profile picture updated successfully.");
      updateNavbarProfilePicture(downloadURL); // Update navbar with new profile picture
    }

    // Redirect to home.html after successful login
    window.location.href = 'home.html';
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert("Login failed: " + errorMessage);
  }
});

// Register function
const registerForm = document.getElementById("register-form");
registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("reg-password").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    alert("Registration successful!");
    // Redirect to home.html after successful registration
    window.location.href = 'home.html';
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert("Registration failed: " + errorMessage);
  }
});

// Forgot password function
const forgotPasswordForm = document.getElementById("forgot-password-form");
forgotPasswordForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.getElementById("reset-email").value;

  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset email sent!");
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert("Failed to send password reset email: " + errorMessage);
  }
});

// Toggle between forms
function toggleForms(formId) {
  const forms = document.querySelectorAll(".form-section");
  forms.forEach((form) => form.classList.remove("active"));
  document.getElementById(formId).classList.add("active");
}

// Toggle password visibility
function togglePasswordVisibility() {
  const passwordInput = document.getElementById('password');
  const eyeIcon = document.getElementById('eye-icon');
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    eyeIcon.classList.remove('fa-eye');
    eyeIcon.classList.add('fa-eye-slash');
  } else {
    passwordInput.type = 'password';
    eyeIcon.classList.remove('fa-eye-slash');
    eyeIcon.classList.add('fa-eye');
  }
}

// Update navbar with profile picture
function updateNavbarProfilePicture(photoURL) {
  const navbarImage = document.querySelector(".navbar-brand img");
  if (navbarImage) {
    navbarImage.src = photoURL;
  }
}
