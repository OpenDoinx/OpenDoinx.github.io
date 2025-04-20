const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav__link'); // Get all nav links
const body = document.body; // Get the body element

navToggle.addEventListener('click', () => {
    // Toggle the 'nav-open' class on the body for hamburger animation and nav visibility
    body.classList.toggle('nav-open');
});

// Add event listener to each nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Remove 'nav-open' class from body when a link is clicked (to close the menu)
        // Check if the nav is actually open before removing the class
        if (body.classList.contains('nav-open')) {
            body.classList.remove('nav-open');
        }
    });
});