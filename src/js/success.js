// Define a function to handle successful form submissions
function handleFormSubmission(email, username = null) {
  // Simulate an API call for form submission (can be adjusted based on actual implementation)
  setTimeout(() => {
    // Create a success message
    let message;
    if (username) {
      message = `Registration successful! Welcome, ${username}!`;
    } else {
      message = `Success! A confirmation email has been sent to ${email}.`;
    }

    // Show the success message
    alert(message); // Replace with your preferred way of displaying messages
    // Optionally redirect user
    // window.location.href = 'some-confirmation-page.html';
  }, 1000); // Simulated delay for the "API" call
}

// Common function to handle form submission for signup
function initializeSignup() {
  const signupForm = document.getElementById("signup-form");
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Prevent default form submission
      const username = document.getElementById("username").value;
      const email = document.getElementById("email-signup").value;
      const password = document.getElementById("password-signup").value;

      // Validate inputs
      if (!email || !username || !password) {
        alert("Please fill in all fields.");
        return;
      }

      handleFormSubmission(email, username); // Call with username included
      signupForm.reset(); // Reset fields
    });
  }
}

// Common function to handle newsletter submission
function initializeNewsletter() {
  const newsletterSubmit = document.getElementById("newsletterSubmit");
  const newsletterEmailInput = document.getElementById("newsletterEmail");
  const newsletterMessage = document.getElementById("newsletterMessage");

  if (newsletterSubmit) {
    newsletterSubmit.addEventListener("click", () => {
      const email = newsletterEmailInput.value.trim();
      if (email === "") {
        newsletterMessage.innerText = "Please enter a valid email address.";
        newsletterMessage.classList.remove("hidden");
        return;
      }
      handleFormSubmission(email); // Call the general function
      newsletterEmailInput.value = ""; // Clear the input after submit
    });
  }
}

// Initialization function to run the respective form setups
document.addEventListener("DOMContentLoaded", () => {
  initializeSignup(); // Initialize signup form handling
  initializeNewsletter(); // Initialize newsletter form handling
});
