'use strict';

(function() {
    // Navigation functionality
    const Navigation = (function() {
        const init = function() {
            setupSmoothScrolling();
            setupScrollSpy();
        };

        const setupSmoothScrolling = function() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', handleSmoothScroll);
            });
        };

        const handleSmoothScroll = function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            scrollToElement(targetElement);
        };

        const scrollToElement = function(element) {
            element.scrollIntoView({
                behavior: 'smooth'
            });
        };

        const setupScrollSpy = function() {
            window.addEventListener('scroll', handleScrollSpy);
        };

        const handleScrollSpy = function() {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('nav ul li a');
            const currentSection = getCurrentSection(sections);
            updateActiveNavLink(navLinks, currentSection);
        };

        const getCurrentSection = function(sections) {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= sectionTop - 60) {
                    current = section.getAttribute('id');
                }
            });
            return current;
        };

        const updateActiveNavLink = function(navLinks, currentSection) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === currentSection) {
                    link.classList.add('active');
                }
            });
        };

        return {
            init: init
        };
    })();

    // Initialize all modules
    document.addEventListener('DOMContentLoaded', function() {
        Navigation.init();
    });
})(); 