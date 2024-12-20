// Wait until the content is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get references to the button and the "more-info" paragraph
    const moreInfoButton = document.getElementById('more-info-button');
    const moreInfoParagraph = document.querySelector('.more-info');

    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('nav');

    const filterButtons = document.querySelectorAll('.filter-button');
    const projectCards = document.querySelectorAll('.project-card');
    const defaultFilter = document.querySelector('.filter-button.active').getAttribute('data-filter');

    moreInfoButton.addEventListener('click', function() {
        // Check if the paragraph is currently hidden
        if (moreInfoParagraph.style.display === 'none') {
            moreInfoParagraph.style.display = 'block';
            moreInfoButton.textContent = 'Hide Info';
        } else {
            moreInfoParagraph.style.display = 'none';
            moreInfoButton.textContent = 'Show More Info';
        }
    });

    menuToggle.addEventListener('click', function() {
        // check if nav already has the 'open' class
        if (nav.classList.contains('open')) {
            nav.classList.remove('open');
            menuToggle.textContent = '☰'; // return to hamburger icon
        } else {
            nav.classList.add('open');
            menuToggle.textContent = '✕'; // change to an X icon when opened
        }
    });

    projectCards.forEach(card => {
        const categoryContainer = card.querySelector('.project-categories');
        const categories = card.getAttribute('data-category').split(' ');

        if (defaultFilter === 'all' || categories.includes(defaultFilter)) {
            card.style.display = 'block';
            card.style.opacity = '1';
        } else {
            card.style.display = 'none';
            card.style.opacity = '0';
        }

        categories.forEach(category => {
            const categoryElement = document.createElement('span');
            categoryElement.classList.add('project-category');
            categoryElement.setAttribute('data-category', category);
            categoryElement.textContent = category.replace('-', ' '); // replaces dashes with spaces as needed
            categoryContainer.appendChild(categoryElement);
        });
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter');
            
            // Highlight the selected button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');

                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'block'
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 300);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
});