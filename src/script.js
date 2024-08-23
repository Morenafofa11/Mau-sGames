let player;
let currentSongIndex = 0;
let playerName = '';
let score = 0;

const songs = [
    { title: "Song 1", videoId: "3JZ4pnNtyxQ", startSeconds: 30, endSeconds: 45, correctLyric: "hello" },
    { title: "Song 2", videoId: "5NV6Rdv1a3I", startSeconds: 60, endSeconds: 75, correctLyric: "party" },
    { title: "Song 3", videoId: "RgKAFK5djSk", startSeconds: 45, endSeconds: 60, correctLyric: "believe" },
    { title: "Song 4", videoId: "CevxZvSJLk8", startSeconds: 90, endSeconds: 105, correctLyric: "roar" },
    { title: "Song 5", videoId: "9bZkp7q19f0", startSeconds: 120, endSeconds: 135, correctLyric: "gangnam" },
    // Add 10 more songs here with their details
];

function startGame() {
    playerName = document.getElementById('playerName').value;
    if (playerName === '') {
        alert("Please enter your name!");
        return;
    }

    document.querySelector('.game-setup').style.display = 'none';
    document.querySelector('.game-area').style.display = 'block';
    document.getElementById('playerGreeting').innerText = `Welcome, ${playerName}!`;

    loadSong();
}

function loadSong() {
    if (currentSongIndex >= songs.length) {
        alert("Game over! Your final score is: " + score);
        resetGame();
        return;
    }

    const song = songs[currentSongIndex];
    
    if (player) {
        player.loadVideoById({
            videoId: song.videoId,
            startSeconds: song.startSeconds,
            endSeconds: song.endSeconds,
        });
    } else {
        player = new YT.Player('player', {
            height: '390',
            width: '640',
            videoId: song.videoId,
            playerVars: {
                'start': song.startSeconds,
                'end': song.endSeconds,
                'autoplay': 1,
                'controls': 0
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }
}

function onPlayerReady(event) {
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        // Wait for the player to finish playing the clip
        document.getElementById('lyricInput').focus();
    }
}

function submitAnswer() {
    const userInput = document.getElementById('lyricInput').value.trim().toLowerCase();
    const song = songs[currentSongIndex];
    
    if (userInput === song.correctLyric.toLowerCase()) {
        score += 1000;
        alert(`Correct! You've earned 1000 points. Your score is now ${score}.`);
    } else {
        score -= 500;
        alert(`Incorrect! The correct lyric was "${song.correctLyric}". Your score is now ${score}.`);
    }

    currentSongIndex++;
    document.getElementById('lyricInput').value = '';
    updateScores();
    loadSong();
}

function updateScores() {
    document.getElementById('scores').innerText = `${playerName}: ${score} points`;
}

function resetGame() {
    currentSongIndex = 0;
    score = 0;
    document.querySelector('.game-setup').style.display = 'block';
    document.querySelector('.game-area').style.display = 'none';
    document.getElementById('playerName').value = '';
    document.getElementById('scores').innerText = '';
}
