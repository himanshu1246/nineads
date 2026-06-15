document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('enquiry-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const spinner = submitBtn.querySelector('.spinner');
    const formMessage = document.getElementById('form-message');

    // User provided Google Apps Script URL
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwQ3lf1Gf4dpdYYmvUB3RG63C7XucRdf2Bir5rk74U4RjSgjB7Xnb7y95vWDt3HNRkt/exec';

    form.addEventListener('submit', e => {
        e.preventDefault();
        
        // Show loading state
        submitBtn.disabled = true;
        btnText.classList.add('hidden');
        spinner.classList.remove('hidden');
        formMessage.className = 'form-message hidden';
        
        // Collect form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        data.Timestamp = new Date().toLocaleString();

        fetch(scriptURL, { 
            method: 'POST', 
            mode: 'no-cors', // Essential for Google Apps Script to bypass CORS block on redirect
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify(data)
        })
            .then(() => {
                // Since mode is no-cors, the response is opaque and we cannot parse JSON.
                // If it reaches here without a network error, it successfully reached the server.
                submitBtn.disabled = false;
                btnText.classList.remove('hidden');
                spinner.classList.add('hidden');
                
                formMessage.textContent = 'Thank you!';
                formMessage.className = 'form-message msg-success';
                
                form.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    formMessage.classList.add('hidden');
                }, 5000);
            })
            .catch(error => {
                // Error
                console.error('Error!', error.message);
                
                submitBtn.disabled = false;
                btnText.classList.remove('hidden');
                spinner.classList.add('hidden');
                
                formMessage.textContent = '❌ Something went wrong. Please try WhatsApp instead.';
                formMessage.className = 'form-message msg-error';
            });
    });
});
