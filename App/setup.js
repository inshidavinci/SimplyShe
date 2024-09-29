// setup.js
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
});
