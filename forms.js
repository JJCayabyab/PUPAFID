document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('applicationForm');
    const fieldsets = form.querySelectorAll('fieldset');
    const nextButtons = form.querySelectorAll('.nextButton');
    const prevButtons = form.querySelectorAll('.prevButton');
    const modal = document.getElementById('popup');
    const closeButton = document.querySelector('.close-button');
    let currentStep = 0;

    // Disable built-in form validation
    form.setAttribute('novalidate', true);

    function showStep(step) {
        fieldsets.forEach((fieldset, index) => {
            if (index === step) {
                fieldset.style.display = 'block';
            } else {
                fieldset.style.display = 'none';
            }
        });
    }

    function validateForm(step) {
        const currentFieldset = fieldsets[step];
        const inputs = currentFieldset.querySelectorAll('input, textarea, select');

        for (let i = 0; i < inputs.length; i++) {
            const input = inputs[i];
            if (input.hasAttribute('required') && input.value.trim() === '') {
                alert('Please fill out all required fields.');
                return false;
            }

            // Email validation
            if (input.type === 'email' && !validateEmail(input.value.trim())) {
                alert('Please enter a valid email address.');
                return false;
            }

            // Phone number validation
            if (input.type === 'tel' && !/^\d{10,11}$/.test(input.value.trim())) { // Adjusted for 10-11 digits
                alert('Please enter a valid phone number.');
                return false;
            }
        }

        return true;
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function nextStep() {
        if (validateForm(currentStep)) {
            currentStep++;
            if (currentStep >= fieldsets.length) {
                currentStep = fieldsets.length - 1;
            }
            showStep(currentStep);
        }
    }

    function prevStep() {
        currentStep--;
        if (currentStep < 0) {
            currentStep = 0;
        }
        showStep(currentStep);
    }

    function showSuccessModal() {
        modal.style.display = 'block';
    }

    function hideSuccessModal() {
        modal.style.display = 'none';
    }

    nextButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            nextStep();
        });
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            prevStep();
        });
    });

    closeButton.addEventListener('click', function() {
        hideSuccessModal();
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            hideSuccessModal();
        }
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm(currentStep)) {
            showSuccessModal();
            form.reset();
            currentStep = 0;
            showStep(currentStep);
        }
    });
});
