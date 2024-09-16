document.addEventListener('DOMContentLoaded', () => {
    const scrollArea = document.querySelector('.custom-scrollbar');

    let timeout;

    // Show scrollbar on scroll
    scrollArea.addEventListener('scroll', () => {
        scrollArea.style.scrollbarWidth = 'thin'; // For Firefox
        scrollArea.style.setProperty('--scrollbar-width', 'auto'); // Custom property for WebKit

        // Clear the timeout every time you scroll
        clearTimeout(timeout);

        // Hide scrollbar after 2 seconds of inactivity
        timeout = setTimeout(() => {
            scrollArea.style.scrollbarWidth = 'none'; // Firefox
            scrollArea.style.setProperty('--scrollbar-width', 'none'); // WebKit
        }, 1000); // Adjust time as needed
    });
});
