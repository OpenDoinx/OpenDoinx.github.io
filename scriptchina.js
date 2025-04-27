document.addEventListener('DOMContentLoaded', function() {
    // Set current date
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date').textContent = currentDate.toLocaleDateString('en-US', options);
    
    // News ticker animation
    setupTicker();
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
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
        if (window.innerWidth > 768) {
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
    
    // Lazy load images (simple implementation)
    lazyLoadImages();
    
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

// Simple lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src;
                    image.removeAttribute('data-src');
                    imageObserver.unobserve(image);
                }
            });
        });
        
        images.forEach(image => {
            imageObserver.observe(image);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        images.forEach(image => {
            image.src = image.dataset.src;
            image.removeAttribute('data-src');
        });
    }
}

// Add structured data for Google News
function addStructuredData() {
    // Get the first article on the page
    const featuredArticle = document.querySelector('.featured-article.main');
    if (!featuredArticle) return;
    
    const headline = featuredArticle.querySelector('h2 a').textContent;
    const datePublished = new Date().toISOString(); // In a real site, this would come from the article data
    const image = featuredArticle.querySelector('img').src;
    const author = featuredArticle.querySelector('.author a').textContent;
    const authorUrl = featuredArticle.querySelector('.author a').href;
    const description = featuredArticle.querySelector('.excerpt').textContent;
    const articleUrl = featuredArticle.querySelector('h2 a').href;
    
    const articleStructuredData = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": headline,
        "image": [image],
        "datePublished": datePublished,
        "dateModified": datePublished,
        "author": {
            "@type": "Person",
            "name": author,
            "url": authorUrl
        },
        "publisher": {
            "@type": "Organization",
            "name": "Trade Currents",
            "logo": {
                "@type": "ImageObject",
                "url": "https://chinahondurastradenetwork.netlify.app/images/logo.png"
            }
        },
        "description": description,
        "isAccessibleForFree": "True",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": articleUrl
        }
    };
    
    // Add the structured data to the page
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(articleStructuredData);
    document.head.appendChild(script);
}
