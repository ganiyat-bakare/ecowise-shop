function handleFormSubmission(email) {  
    // Simulate an API call for subscription (this can be any form submission)  
    // In a real-world scenario, you would send the `email` to your server here.  
    setTimeout(() => {  
        // Navigate to confirmation page on success  
        window.location.href = 'subscription-confirmation.html';  
    }, 1000);  
}  

// Newsletter Sign-Up  
document.addEventListener("DOMContentLoaded", function () {  
    const newsletterSubmit = document.getElementById("newsletterSubmit");  
    const newsletterEmailInput = document.getElementById("newsletterEmail");  
    const newsletterMessage = document.getElementById("newsletterMessage");  

    newsletterSubmit.addEventListener("click", function () {  
        const email = newsletterEmailInput.value.trim();  

        if (email === "") {  
            newsletterMessage.innerText = "Please enter a valid email address.";  
            newsletterMessage.classList.remove("hidden");  
            return;  
        }  

        handleFormSubmission(email); // Call the general function  
        
        newsletterEmailInput.value = ""; // Clear the input after submit  
    });  
});  

// Registration Form (Example)  
document.addEventListener("DOMContentLoaded", function () {  
    const signupSubmit = document.getElementById("signup-form");  

    if (signupSubmit) {  
        signupSubmit.addEventListener("submit", function (event) {  
            event.preventDefault(); // Prevent the default form submission  

            const email = document.getElementById("email-signup").value.trim();  
            if (email === "") {  
                // Handle error if necessary (e.g., display message)  
                alert("Please enter a valid email address.");  
                return;  
            }  

            handleFormSubmission(email); // Call the general function  
        });  
    }  
});  