// Setup
document.getElementById('setupButton').addEventListener('click', function() {
    document.getElementById('mainContainer').style.display = 'none';
    document.getElementById('setupContainer').classList.remove('hidden');
});

document.getElementById('setupForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const routine = document.getElementById('routine').value;
    const transport = document.getElementById('transport').value;
    const safetyWords = document.getElementById('safetyWords').value.split(',').map(word => word.trim());
    const emergencyContacts = document.getElementById('emergencyContacts').value.split(',').map(contact => contact.trim());

    localStorage.setItem('routine', routine);
    localStorage.setItem('transport', transport);
    localStorage.setItem('safetyWords', JSON.stringify(safetyWords));
    localStorage.setItem('emergencyContacts', JSON.stringify(emergencyContacts));

    alert("Setup completed! You can now use the diary feature.");
    document.getElementById('setupContainer').classList.add('hidden');
    document.querySelector('.diary-container').classList.remove('hidden'); // Show diary container
    document.getElementById('tabs').classList.remove('hidden'); // Show tabs after setup
});

// Diary entry functionality
document.getElementById('saveEntryButton').addEventListener('click', function() {
    const category = document.getElementById('entryCategory').value;
    const location = document.getElementById('entryLocation').value;
    const content = document.getElementById('entryContent').value;

    if (content.trim() === '') {
        alert('Please write something in the diary entry.');
        return;
    }

    const previousEntries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
    previousEntries.push({ category, location, content, date: new Date().toLocaleString() });
    localStorage.setItem('diaryEntries', JSON.stringify(previousEntries));
    displayEntries();
    document.getElementById('entryContent').value = ''; // Clear the text area
});

// Show previous entries functionality
document.getElementById('showEntriesButton').addEventListener('click', function() {
    const previousEntries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
    const entriesContainer = document.getElementById('previousEntries');
    entriesContainer.classList.toggle('hidden'); // Toggle visibility
    entriesContainer.innerHTML = previousEntries.map(entry => 
        `<div class="diary-entry">
            <strong>${entry.date}</strong>: <em>${entry.category}</em> ${entry.location ? ' - ' + entry.location : ''}<br>${entry.content}
            <hr>
        </div>`
    ).join('');
});

// Music Tab Functionality
document.getElementById('musicTab').addEventListener('click', function() {
    document.querySelector('.diary-container').classList.add('hidden');
    document.getElementById('musicContainer').classList.remove('hidden');
    document.getElementById('mapContainer').classList.add('hidden'); // Hide map container
});

// Map Tab Functionality
document.getElementById('mapTab').addEventListener('click', function() {
    document.querySelector('.diary-container').classList.add('hidden');
    document.getElementById('musicContainer').classList.add('hidden'); // Hide music container
    document.getElementById('mapContainer').classList.remove('hidden');
});

// Diary Tab Functionality
document.getElementById('diaryTab').addEventListener('click', function() {
    document.querySelector('.diary-container').classList.remove('hidden'); // Show diary container
    document.getElementById('musicContainer').classList.add('hidden'); // Hide music container
    document.getElementById('mapContainer').classList.add('hidden'); // Hide map container
});

// Initialize Leaflet Map
function initializeMap() {
    const map = L.map('map').setView([51.505, -0.09], 13); // Default location

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);
}

// Manual Location Submission
document.getElementById('submitLocationButton').addEventListener('click', function() {
    const location = document.getElementById('manualLocation').value;
    if (location) {
        alert(`Navigating to ${location}...`); // Placeholder for actual geocoding
    }
});

// Live Tracking (Implementation)
document.getElementById('startTrackingButton').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            // Save location to local storage or use it as needed
            localStorage.setItem('currentLocation', JSON.stringify({ latitude, longitude }));
            // Redirect to shared.html to confirm location sharing
            window.location.href = 'shared.html'; // Redirecting to the shared page
        }, error => {
            console.error(error);
            alert('Error getting location. Please ensure location services are enabled.');
        }, {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 5000
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});

// Function to update map position
function updateMapPosition(lat, lon) {
    const map = L.map('map').setView([lat, lon], 13); // Center map at the user's location

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    L.marker([lat, lon]).addTo(map) // Add a marker for the user's current location
        .bindPopup('You are here!')
        .openPopup();
}

// Display Entries Function
function displayEntries() {
    const previousEntries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
    const entriesContainer = document.getElementById('previousEntries');
    entriesContainer.innerHTML = previousEntries.map(entry => 
        `<div class="diary-entry">
            <strong>${entry.date}</strong>: <em>${entry.category}</em> ${entry.location ? ' - ' + entry.location : ''}<br>${entry.content}
            <hr>
        </div>`
    ).join('');
}
