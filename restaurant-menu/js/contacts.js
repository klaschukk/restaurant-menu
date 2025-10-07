document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formGroups = document.querySelectorAll('.form-group');

    // Add floating label functionality
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('label');

        if (input && label) {
            // Check if input has value on load
            if (input.value) {
                label.classList.add('active');
            }

            // Handle input focus
            input.addEventListener('focus', () => {
                label.classList.add('active');
            });

            // Handle input blur
            input.addEventListener('blur', () => {
                if (!input.value) {
                    label.classList.remove('active');
                }
            });
        }
    });

    // Handle form submission
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            try {
                // Show loading state
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;

                // Simulate API call (replace with actual API endpoint)
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Show success message
                alert('Thank you for your message! We will get back to you soon.');
                
                // Reset form
                contactForm.reset();

                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;

            } catch (error) {
                console.error('Error sending message:', error);
                alert('Sorry, there was an error sending your message. Please try again.');
            }
        });
    }

    // Initialize Google Maps (if needed)
    // Replace YOUR_GOOGLE_MAPS_API_KEY with actual API key
    const loadGoogleMaps = () => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&callback=initMap`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
    };

    // Google Maps initialization function
    window.initMap = () => {
        const restaurantLocation = { lat: YOUR_LATITUDE, lng: YOUR_LONGITUDE };
        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: restaurantLocation,
        });
        
        new google.maps.Marker({
            position: restaurantLocation,
            map: map,
            title: 'Klaschuk Restaurant'
        });
    };

    // Uncomment the following line if you want to load Google Maps
    // loadGoogleMaps();
});