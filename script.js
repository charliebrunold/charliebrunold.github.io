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
    const carousel = document.querySelector('.carousel');
    const icons = carousel.querySelectorAll('.icon');
    const angle_from_center = (2 * Math.PI) / icons.length;
    const radius_x = 300; // adjust the horizontal radius
    const radius_y = 100; // adjust the vertical radius
    const x_offset = -60;
    let angle = 0;
    
    let is_dragging = false;
    let previous_x = 0;
    let animationFrame; // Store animation frame for resuming
    
    /**
     * Handles the drag start event
     */
    function handleMouseDown(event) {
      is_dragging = true;
      previous_x = event.clientX;
      carousel.style.cursor = 'grabbing';
      cancelAnimationFrame(animationFrame); // Stop the rotation animation
    }
    
    /**
     * Handles the drag move event
     */
    function handleMouseMove(event) {
      if (!is_dragging) return;
      const x_diff = event.clientX - previous_x;
      previous_x = event.clientX;
      angle += x_diff * 0.01; // Adjust drag sensitivity
      updateCarousel();
    }
    
    /**
     * Handles the drag end event
     */
    function handleMouseUp() {
      is_dragging = false;
      carousel.style.cursor = 'grab';
      startAnimation(); // Restart the animation after dragging ends
    }
    
    /**
     * Updates the carousel positions
     */
    function updateCarousel() {
      icons.forEach((icon, index) => {
        const x = x_offset + Math.cos(angle + index * angle_from_center) * radius_x;
        const y = Math.sin(angle + index * angle_from_center) * radius_y;
        const z_index = Math.round(y) + radius_y; // calculate z-index based on y position
    
        // determines blur amount based on z-index
        const blur = (200 - z_index) / 30;
    
        icon.style.transform = `translate(${x}%, ${y}%)`;
        icon.style.zIndex = z_index;
    
        const size = z_index / 5 + 50;
    
        icon.style.filter = `blur(${blur}px)`; // Blurring effect
        const iconify_icon = icon.querySelector('iconify-icon');
        if (iconify_icon) {
          iconify_icon.width = `${size}px`; // Adjust width
          iconify_icon.height = `${size}px`; // Adjust height
        }
      });
    
      icons.forEach((icon) => icon.classList.remove('active'));
      icons[Math.floor(angle / angle_from_center) % icons.length].classList.add('active');
    }
    
    /**
     * Starts the rotation animation
     */
    function startAnimation() {
      animationFrame = requestAnimationFrame(() => {
        angle += 0.005; // Adjust speed of rotation
        updateCarousel();
        startAnimation(); // Continuously call for the next frame
      });
    }
    
    // Event listeners for dragging
    carousel.addEventListener('mousedown', handleMouseDown);
    carousel.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    
    // Start the animation initially
    startAnimation();
});