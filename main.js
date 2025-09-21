/*
    Pencil Paper AI - Interaction Logic
    Developer: This script handles the sophisticated user experience enhancements,
    including the bespoke cursor and staggered, performant animations.
*/

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Bespoke Cursor Logic ---
    const cursor = document.querySelector('.custom-cursor');
    const interactiveElements = document.querySelectorAll('a, button');

    document.addEventListener('mousemove', e => {
        cursor.setAttribute("style", "top: " + (e.pageY - scrollY) + "px; left: " + e.pageX + "px;");
    });

    document.addEventListener('mousedown', () => {
        cursor.classList.add('clicked');
    });

    document.addEventListener('mouseup', () => {
        cursor.classList.remove('clicked');
    });

    interactiveElements.forEach(el => {
        el.addEventListener('mouseover', () => cursor.classList.add('hovered'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
    });

    // --- 2. Intentional, Staggered Reveals on Scroll ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Stagger animations for elements within a grid or section
                const elements = entry.target.querySelectorAll ? entry.target.querySelectorAll('.fade-in') : [entry.target];
                elements.forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add('is-visible');
                    }, index * 150); // Stagger delay
                });
                 // If the target itself is a fade-in element, make it visible
                if (entry.target.classList.contains('fade-in')) {
                     entry.target.classList.add('is-visible');
                }
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all elements with the .fade-in class directly or sections containing them
    const targets = document.querySelectorAll('.fade-in, .process-grid, .engagements-section');
    targets.forEach(target => {
        observer.observe(target);
    });

    // --- 3. Mobile Navigation Toggle ---
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');

    navToggle.addEventListener('click', () => {
        mobileNav.classList.toggle('open');
    });

    // Close mobile nav when a link is clicked
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('open');
        });
    });

});
