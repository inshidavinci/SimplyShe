// app.js
const safetyWords = JSON.parse(localStorage.getItem('safetyWords')) || [];
const emergencyContacts = JSON.parse(localStorage.getItem('emergencyContacts')) || [];
let playlist = [];

// Event listener for emergency alert
document.addEventListener('keypress', (event) => {
    if (safetyWords.includes(event.key)) {
        const message = "Emergency alert! Please check on me.";
        const token = "<DEVICE_FCM_TOKEN>"; // Replace with actual device token
        fetch('http://localhost:3000/sendNotification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token, message }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Notification sent:', data);
        })
        .catch((error) => {
            console.error('Error sending notification:', error);
        });
    }
});
