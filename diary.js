// diary.js
const diaryEntriesDiv = document.getElementById('previousEntries');
let diaryEntries = JSON.parse(localStorage.getItem('diaryEntries')) || [];

function displayEntries() {
    diaryEntriesDiv.innerHTML = diaryEntries.map(entry => 
        `<div class="diary-entry">
            <p>${entry.entry}</p>
            <small>${new Date(entry.date).toLocaleDateString()}</small>
        </div>`
    ).join('');
}

document.getElementById('saveEntryButton').addEventListener('click', () => {
    const category = document.getElementById('entryCategory').value;
    const location = document.getElementById('entryLocation').value;
    const entryContent = document.getElementById('entryContent').value;

    if (entryContent) {
        diaryEntries.push({ entry: `${category}: ${entryContent}${location ? ' - Location: ' + location : ''}`, date: new Date() });
        localStorage.setItem('diaryEntries', JSON.stringify(diaryEntries));
        displayEntries();
        document.getElementById('entryContent').value = ''; // Clear the textarea
        document.getElementById('entryLocation').value = ''; // Clear the location input
    }
});

document.getElementById('showEntriesButton').addEventListener('click', displayEntries);

displayEntries();
