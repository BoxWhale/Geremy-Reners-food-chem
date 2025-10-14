// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Website loaded successfully!');

    // Button click event
    const button = document.getElementById('clickMe');
    if (button) {
        button.addEventListener('click', () => {
            alert('Hello! You clicked the button!');
            console.log('Button was clicked');
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add interactive hover effect to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.addEventListener('mouseenter', () => {
            section.style.transform = 'translateY(-2px)';
            section.style.transition = 'transform 0.3s ease';
        });

        section.addEventListener('mouseleave', () => {
            section.style.transform = 'translateY(0)';
        });
    });
});
