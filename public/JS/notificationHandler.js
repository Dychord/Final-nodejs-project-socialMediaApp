// JavaScript to handle popup visibility
const notifyBtn = document.getElementById('notifyBtn');
const notificationPopup = document.getElementById('notificationPopup');
const closeBtn = document.getElementById('closeBtn');

notifyBtn.addEventListener('click', () => {
    notificationPopup.classList.toggle('show');
});

// Close notification on click of close button
closeBtn.addEventListener('click', () => {
    notificationPopup.classList.remove('show');
});

document.addEventListener('click', (event) => {
        if (!notificationPopup.contains(event.target) && !notifyBtn.contains(event.target)) {
            notificationPopup.classList.remove('show');
        }
});