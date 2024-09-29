// diary.js
const diaryEntriesDiv = document.getElementById('previousEntries');
let diaryEntries = JSON.parse(localStorage.getItem('diaryEntries')) || [];

function displayEntries() {
    diaryEntriesDiv.innerHTML = diaryEntries.map(entry => `
        <div class="diary-entry">
            <p>${entry.entry}</p>
            <small>${new Date(entry.date).toLocaleDateString()}</small>
        </div>
    `).join('');
}

document.getElementById('saveEntryButton').addEventListener('click', () => {
    const newEntry = prompt("Write your diary entry:");
    if (newEntry) {
        diaryEntries.push({ entry: newEntry, date: new Date() });
        localStorage.setItem('diaryEntries', JSON.stringify(diaryEntries));
        displayEntries();
    }
});

displayEntries();
