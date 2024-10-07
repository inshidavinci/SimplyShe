const songs = [
    { name: "Brave Heart", cover: "imagesforsongs/braveheart.png" },
    { name: "Break-Free", cover: "imagesforsongs/breakfree.jpg" },
    { name: "Safe Haven", cover: "imagesforsongs/safehaven.jpeg" },
    { name: "Shielded", cover: "imagesforsongs/shielded.png" },
    { name: "Silent Scream", cover: "imagesforsongs/silentscream.png" },
    { name: "Whispers of Steel", cover: "imagesforsongs/whispersofsteel.png" },
];

const albumCoversDiv = document.getElementById('albumCovers');
const playlistDiv = document.getElementById('playlist');
let playlist = [];

// Function to display songs
function displaySongs() {
    albumCoversDiv.innerHTML = ''; // Clear existing songs
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.classList.add('song-item');
        
        songDiv.innerHTML = `
            <img src="${song.cover}" alt="${song.name} Cover" class="song-cover" />
            <span>${song.name}</span>
            <button class="add-to-playlist">Add to Playlist</button>
        `;
        
        albumCoversDiv.appendChild(songDiv);

        // Add event listener to add to playlist
        songDiv.querySelector('.add-to-playlist').addEventListener('click', () => {
            addToPlaylist(song.name);
        });
    });
}

// Function to add song to the playlist
function addToPlaylist(songName) {
    if (!playlist.includes(songName)) {
        playlist.push(songName);
        alert(`${songName} has been added to your playlist!`);
        displayPlaylist();
    } else {
        alert(`${songName} is already in your playlist.`);
    }
}

// Function to display the playlist
function displayPlaylist() {
    playlistDiv.innerHTML = playlist.map(song => `
        <div class="playlist-item">${song}</div>
    `).join('');
}

// Initial display
displaySongs();
