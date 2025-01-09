document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('enquiryForm');
    const submitButton = document.getElementById('submitButton');

    // Store the original button text
    const originalButtonText = submitButton.textContent;

    // Listen for the request being sent
    form.addEventListener('htmx:beforeRequest', function(event) {
      submitButton.textContent = 'Submitting...';
      submitButton.disabled = true;
    });

    // Listen for the request to complete (success or error)
    form.addEventListener('htmx:afterRequest', function(event) {
      submitButton.textContent = originalButtonText;
      submitButton.disabled = false;
    });

    // (Optional) Handle errors specifically if you want different behavior
    form.addEventListener('htmx:error', function(event) {
      // You can display an error message here if desired
      // Reset the button state
      submitButton.textContent = originalButtonText;
      submitButton.disabled = false;
    });
  });