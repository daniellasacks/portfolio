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

    // Project functionality
    const Projects = (function() {
        const init = function() {
            setupProjectSearch();
        };

        const setupProjectSearch = function() {
            const searchInput = document.querySelector('.project-search');
            if (searchInput) {
                searchInput.addEventListener('input', handleProjectSearch);
            }
        };

        const handleProjectSearch = function(e) {
            const searchTerm = e.target.value.toLowerCase();
            filterProjects(searchTerm);
        };

        const filterProjects = function(searchTerm) {
            const projects = document.querySelectorAll('.project-card');
            projects.forEach(project => {
                const title = project.querySelector('h3').textContent.toLowerCase();
                const description = project.querySelector('p').textContent.toLowerCase();
                const isVisible = title.includes(searchTerm) || description.includes(searchTerm);
                project.style.display = isVisible ? 'block' : 'none';
            });
        };

        return {
            init: init
        };
    })();

    // Initialize all modules
    document.addEventListener('DOMContentLoaded', function() {
        Navigation.init();
        Projects.init();
    });
})(); 