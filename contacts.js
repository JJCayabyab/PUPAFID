document.addEventListener("DOMContentLoaded", function() {
    // Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyCv_lJDALzLQT-DeZ6xjxJSsJveWE4MhF4",
        authDomain: "pupfafidform.firebaseapp.com",
        databaseURL: "https://pupfafidform-default-rtdb.firebaseio.com",
        projectId: "pupfafidform",
        storageBucket: "pupfafidform.appspot.com",
        messagingSenderId: "193013345972",
        appId: "1:193013345972:web:141b18da5638ecd152f1e1"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const contactsDB = firebase.database().ref('contactForm');

    // Utility function to get form values
    const getElementVal = (id) => {
        return document.getElementById(id).value.trim();
    };

    // Event listener for form submission
    const form = document.getElementById('contact-form');
    const modal = document.getElementById('popup');
    const closeButton = document.querySelector('.close-button');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const firstName = getElementVal('first-name');
        const lastName = getElementVal('last-name');
        const email = getElementVal('email');
        const message = getElementVal('message');

        if (firstName === '' || lastName === '' || email === '' || message === '') {
            alert('All fields are required!');
        } else {
            saveMessages(firstName, lastName, email, message);
            modal.style.display = 'block';
        }
    });

    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
        form.reset();
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    const saveMessages = (firstName, lastName, email, message) => {
        const newcontactsDB = contactsDB.push();
        newcontactsDB.set({
            firstName: firstName,
            lastName: lastName,
            email: email,
            message: message
        });
    };
});