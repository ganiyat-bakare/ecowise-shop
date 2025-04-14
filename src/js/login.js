// document.addEventListener('DOMContentLoaded', () => {  
//   // Elements for Login and Signup Forms  
//   const showSignupLink = document.getElementById('show-signup');  
//   const showLoginLink = document.querySelector('.login-link');  
//   const loginForm = document.querySelector('.form-box.login');  
//   const registerForm = document.querySelector('.form-box.register');  
//   const signupForm = document.getElementById('signup-form');  
//   const signupMessage = document.getElementById('signup-message');  
//   const loginFormElement = document.getElementById('login-form');  
//   const loginMessage = document.getElementById('login-message');  

//   // Show registration form  
//   showSignupLink.addEventListener('click', (e) => {  
//       e.preventDefault();  
//       loginForm.style.display = 'none';  
//       registerForm.style.display = 'block';  
//   });  

//   // Show login form  
//   showLoginLink.addEventListener('click', (e) => {  
//       e.preventDefault();  
//       registerForm.style.display = 'none';  
//       loginForm.style.display = 'block';  
//   });  

//   // Handle signup form submission  
//   signupForm.addEventListener('submit', (e) => {  
//       e.preventDefault(); // Prevent form submission  

//       const username = document.getElementById('username').value;  
//       const email = document.getElementById('email-signup').value;  
//       const password = document.getElementById('password-signup').value;  
//       const confirmPassword = document.getElementById('confirm-password').value;  

//       // Validate password confirmation  
//       if (password !== confirmPassword) {  
//           signupMessage.textContent = "Passwords do not match!";  
//           signupMessage.style.color = 'red'; // Make message red for error  
//           return;  
//       }  

//       // Simulate successful registration  
//       setTimeout(() => {  
//           signupMessage.textContent = `Registration successful! Welcome, ${username}!`;  
//           signupMessage.style.color = 'green'; // Make message green for success  
//           signupForm.reset(); // Reset the signup form fields  
//       }, 1000); // Simulate a delay for the "API" call  
//   });  

//   // Handle login form submission  
//   loginFormElement.addEventListener('submit', (e) => {  
//       e.preventDefault(); // Prevent default form submission  

//       const email = document.getElementById('email').value;  
//       const password = document.getElementById('password').value;  

//       // Simulate user authentication (replace with real API call)  
//       setTimeout(() => {  
//           if (email === "test@example.com" && password === "password123") {  
//               loginMessage.textContent = "Login successful! Welcome back!";  
//               loginMessage.style.color = 'green'; // Make message green for success  
//           } else {  
//               loginMessage.textContent = "Login failed! Incorrect email or password.";  
//               loginMessage.style.color = 'red';             // Make message red for failure  
//             }  
//             loginFormElement.reset(); // Reset the login form fields  
//         }, 1000); // Simulate a delay for the "API" call  
//     });
    

// login.js  
document.addEventListener('DOMContentLoaded', () => {  
  // Elements for Login and Signup Forms  
  const showSignupLink = document.getElementById('show-signup');  
  const showLoginLink = document.querySelector('.login-link');  
  const loginForm = document.querySelector('.form-box.login');  
  const registerForm = document.querySelector('.form-box.register');  
  const signupForm = document.getElementById('signup-form');  
  const signupMessage = document.getElementById('signup-message');  
  const loginFormElement = document.getElementById('login-form');  
  const loginMessage = document.getElementById('login-message');  

  // Show registration form  
  showSignupLink.addEventListener('click', (e) => {  
      e.preventDefault();  
      loginForm.style.display = 'none';  
      registerForm.style.display = 'block';  
  });  

  // Show login form  
  showLoginLink.addEventListener('click', (e) => {  
      e.preventDefault();  
      registerForm.style.display = 'none';  
      loginForm.style.display = 'block';  
  });  

  // Handle signup form submission  
  signupForm.addEventListener('submit', async (event) => {  
      event.preventDefault(); // Prevent form submission  

      const username = document.getElementById('username').value;  
      const email = document.getElementById('email-signup').value;  
      const password = document.getElementById('password-signup').value;  
      const confirmPassword = document.getElementById('confirm-password').value;  

      // Validate password confirmation  
      if (password !== confirmPassword) {  
          signupMessage.textContent = "Passwords do not match!";  
          signupMessage.style.color = 'red'; // Make message red for error  
          return;  
      }  

      const payload = { username, email, password };  

      try {  
          const response = await fetch("https://api.example.com/signup", { // Replace with actual signup URL  
              method: "POST",  
              headers: {  
                  "Content-Type": "application/json",  
              },  
              body: JSON.stringify(payload),  
          });  

          const data = await response.json();  

          if (response.ok) {  
              signupMessage.textContent = "Account created successfully! Redirecting...";  
              signupMessage.style.color = 'green'; // Make message green for success  
              // Redirect to login form after a success message  
              setTimeout(() => {  
                  loginForm.style.display = 'block';  
                  registerForm.style.display = 'none';  
                  signupForm.reset();  
              }, 2000);  
          } else {  
              signupMessage.textContent = data.message || "Sign up failed. Please try again.";  
              signupMessage.style.color = 'red';  
          }  
      } catch (error) {  
          console.error("Error signing up:", error);  
          signupMessage.textContent = "An error occurred. Please try again.";  
          signupMessage.style.color = 'red';  
      }  
  });  

  // Handle login form submission  
  loginFormElement.addEventListener('submit', async (event) => {  
      event.preventDefault(); // Prevent default form submission  

      const email = document.getElementById('email').value;  
      const password = document.getElementById('password').value;  

      const payload = { email, password };  

      try {  
          const response = await fetch("https://api.example.com/login", { // Replace with the actual login URL  
              method: "POST",  
              headers: {  
                  "Content-Type": "application/json",  
              },  
              body: JSON.stringify(payload),  
          });  

          const data = await response.json();  

          if (response.ok) {  
              localStorage.setItem("authToken", data.token); // Assuming the API returns a token  
              window.location.href = "orders.html"; // Redirect to a protected orders page  
          } else {  
              loginMessage.textContent = data.message || "Login failed. Please try again.";  
              loginMessage.style.color = 'red';                 // Make message red for failure  
            }  
        } catch (error) {  
            console.error("Error logging in:", error);  
            loginMessage.textContent = "An error occurred. Please try again.";  
            loginMessage.style.color = 'red';  
        }  
    });  

    // Password visibility toggle for Signup  
    document.getElementById("show-password-signup").addEventListener("change", function() {  
        const passwordField = document.getElementById("password-signup");  
        passwordField.type = this.checked ? "text" : "password"; // Toggle password type  
    });  

    // Show Confirm Password Checkbox  
    document.getElementById("show-confirm-password").addEventListener("change", function() {  
        const confirmPasswordField = document.getElementById("confirm-password");  
        confirmPasswordField.type = this.checked ? "text" : "password"; // Toggle password type  
    });  

    // Password visibility toggle for Login  
    document.getElementById("show-password-login").addEventListener("change", function() {  
        const passwordField = document.getElementById("password");  
        passwordField.type = this.checked ? "text" : "password"; // Toggle password type  
    });  

    // Initial setup: Only show the login form on load  
    registerForm.style.display = 'none'; // Hide registration form by default  
});  