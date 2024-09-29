// music.js
const songs = [
    { name: "Brave Heart", cover: "imagesforsongs/braveheart.png" },
    { name: "Break-Free", cover: "imagesforsongs/breakfree.jpg" },
    { name: "Safe Haven", cover: "imagesforsongs/safehaven.jpeg" },
    { name: "Shielded", cover: "imagesforsongs/shielded.png" },
    { name: "Silent Scream", cover: "imagesforsongs/silentscream.png" },
    { name: "Whispers of Steel", cover: "imagesforsongs/whispersofsteel.png" },
];

const albumCoversDiv = document.getElementById('albumCovers');

songs.forEach(song => {
    const songDiv = document.createElement('div');
    songDiv.classList.add('song-item');
    
    songDiv.innerHTML = `
        <img src="${song.cover}" alt="${song.name} Cover" class="song-cover" />
        <span>${song.name}</span>
        <button class="add-to-playlist">Add to Playlist</button>
    `;
    
    albumCoversDiv.appendChild(songDiv);
});

// Handle adding songs to playlist
const playlist = [];

document.querySelectorAll('.add-to-playlist').forEach(button => {
    button.addEventListener('click', function() {
        const songName = this.previousElementSibling.innerText;
        playlist.push(songName);
        alert(`${songName} has been added to your playlist!`);
    });
});
