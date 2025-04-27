document.addEventListener('DOMContentLoaded', function() {
    // Set current date
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        dateElement.textContent = currentDate.toLocaleDateString('en-US', options);
    }
    
    // News ticker animation
    setupTicker();
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Dropdown menu for mobile
    const dropdownLinks = document.querySelectorAll('.has-dropdown > a');
    
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                this.parentElement.classList.toggle('active');
            }
        });
    });
    
    // Handle window resize for menu
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu) {
            navMenu.classList.remove('active');
            document.querySelectorAll('.has-dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
    
    // Newsletter subscription form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                // In a real implementation, this would send the data to a server
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            }
        });
    }
    
    // Search form
    const searchBox = document.querySelector('.search-box');
    if (searchBox) {
        const searchBtn = searchBox.querySelector('button');
        const searchInput = searchBox.querySelector('input');
        
        if (searchBtn && searchInput) {
            searchBtn.addEventListener('click', function(e) {
                e.preventDefault();
                if (searchInput.value.trim() !== '') {
                    // In a real implementation, this would redirect to a search results page
                    alert('Search functionality would be implemented in a production environment.');
                }
            });
            
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' && this.value.trim() !== '') {
                    e.preventDefault();
                    // In a real implementation, this would redirect to a search results page
                    alert('Search functionality would be implemented in a production environment.');
                }
            });
        }
    }
    
    // Comments form
    const commentForm = document.querySelector('.comment-form form');
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Comment submission would be processed in a production environment.');
            this.reset();
        });
    }
    
    // Add structured data for Google News
    addStructuredData();
});

// Function to setup the news ticker
function setupTicker() {
    const ticker = document.getElementById('news-ticker');
    if (!ticker) return;
    
    // Clone the ticker items to create a continuous effect
    const tickerItems = ticker.querySelectorAll('li');
    tickerItems.forEach(item => {
        const clone = item.cloneNode(true);
        ticker.appendChild(clone);
    });
}

// Add structured data for Google News
function addStructuredData() {
    // This function is now redundant since we're adding structured data directly in HTML
    // But kept for potential future dynamic additions
}