// Data for portfolio items
const portfolioItems = [
    {
        id: 1,
        title: "Campagne Été",
        category: "photo",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
        description: "Shooting mode en extérieur"
    },
    {
        id: 2,
        title: "Interview Artiste",
        category: "video",
        image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop",
        description: "Réalisation et montage"
    },
    {
        id: 3,
        title: "Identité Visuelle",
        category: "comm",
        image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1000&auto=format&fit=crop",
        description: "Création de charte graphique"
    },
    {
        id: 4,
        title: "Portrait Studio",
        category: "photo",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
        description: "Série de portraits N&B"
    },
    {
        id: 5,
        title: "Teaser Événement",
        category: "video",
        image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=1000&auto=format&fit=crop",
        description: "Montage dynamique"
    },
    {
        id: 6,
        title: "Stratégie Social Media",
        category: "comm",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
        description: "Planning et création de contenu"
    }
];

// DOM Elements
const galleryGrid = document.getElementById('gallery-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');
const header = document.getElementById('header');

// Initialize Gallery
function initGallery(items) {
    galleryGrid.innerHTML = '';
    items.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('gallery-item');
        // Add fade-in animation to new items
        element.classList.add('fade-in-up');

        element.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="item-overlay">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `;
        galleryGrid.appendChild(element);

        // Trigger reflow to enable transition if needed, or observe it
        observer.observe(element);
    });
}

// Filter Functionality
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        if (filterValue === 'all') {
            initGallery(portfolioItems);
        } else {
            const filteredItems = portfolioItems.filter(item => item.category === filterValue);
            initGallery(filteredItems);
        }
    });
});

// Mobile Navigation
burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('nav-active');
        burger.classList.remove('toggle');
    });
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

// Observe all elements with .fade-in-up class
document.querySelectorAll('.fade-in-up').forEach(el => {
    observer.observe(el);
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Initialize with all items
initGallery(portfolioItems);
