// Sample recipe data
const recipes = [
    {
        title: "Molecular Gastronomy Spheres",
        description: "Transform liquids into perfectly spherical caviar-like pearls using sodium alginate and calcium chloride."
    },
    {
        title: "Sous Vide Perfect Steak",
        description: "Precision cooking at exact temperatures for perfectly consistent results every time."
    },
    {
        title: "Liquid Nitrogen Ice Cream",
        description: "Flash-freeze ice cream base with liquid nitrogen for ultra-smooth texture and theatrical presentation."
    },
    {
        title: "Emulsification Mastery",
        description: "Learn the chemistry behind creating stable emulsions like mayonnaise and hollandaise sauce."
    },
    {
        title: "pH-Controlled Color Changes",
        description: "Use natural pH indicators like red cabbage to create color-changing dishes."
    },
    {
        title: "Fermentation Science",
        description: "Harness beneficial microorganisms to create complex flavors in foods and beverages."
    }
];

// Load recipes when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadRecipes();
    setupEventListeners();
});

// Function to load recipes into the grid
function loadRecipes() {
    const recipeGrid = document.getElementById('recipeGrid');
    
    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';
        recipeCard.innerHTML = `
            <h3>${recipe.title}</h3>
            <p>${recipe.description}</p>
        `;
        recipeGrid.appendChild(recipeCard);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Explore button smooth scroll
    const exploreBtn = document.getElementById('exploreBtn');
    exploreBtn.addEventListener('click', function() {
        document.getElementById('recipes').scrollIntoView({ 
            behavior: 'smooth' 
        });
    });

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmit();
    });
}

// Handle contact form submission
function handleFormSubmit() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const formMessage = document.getElementById('formMessage');

    // Simple validation
    if (name && email && message) {
        // In a real application, you would send this data to a server
        formMessage.className = 'form-message success';
        formMessage.textContent = `Thank you, ${name}! Your message has been received. We'll get back to you at ${email} soon.`;
        
        // Clear form
        document.getElementById('contactForm').reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.className = 'form-message';
            formMessage.textContent = '';
        }, 5000);
    } else {
        formMessage.className = 'form-message error';
        formMessage.textContent = 'Please fill in all fields.';
    }
}

// Add animation to recipe cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe recipe cards when they're created
window.addEventListener('load', function() {
    const recipeCards = document.querySelectorAll('.recipe-card');
    recipeCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s, transform 0.5s';
        observer.observe(card);
    });
});
