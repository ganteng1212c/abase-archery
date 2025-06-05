document.addEventListener('DOMContentLoaded', () => {
    const buttonSound = document.getElementById('buttonSound');
    const scoreTableBody = document.getElementById('scoreTableBody');
    const playerNameElement = document.querySelector('.player-name');

    // Get session data
    const sessionData = JSON.parse(sessionStorage.getItem('currentSession'));
    if (!sessionData) {
        alert('No session data found!');
        window.location.href = 'home.html';
        return;
    }

    // Update player name
    playerNameElement.textContent = sessionData.playerName;

    // Display scores
    sessionData.scores.forEach((score, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${score}</td>
        `;
        scoreTableBody.appendChild(row);
    });

    // Play sound on button click
    document.querySelectorAll('.action-button').forEach(button => {
        button.addEventListener('click', () => {
            buttonSound.currentTime = 0;
            buttonSound.play();
        });
    });
});

// Save session to database
function saveScores() {
    const sessionData = JSON.parse(sessionStorage.getItem('currentSession'));
    if (!sessionData) return;

    // Calculate total score
    const totalScore = sessionData.scores.reduce((a, b) => a + b, 0);

    // Get existing database or create new one
    let database = JSON.parse(localStorage.getItem('archeryDatabase')) || [];

    // Add new session
    database.push({
        id: Date.now().toString(),
        date: new Date().toISOString(),
        playerName: sessionData.playerName,
        playerSchool: sessionData.playerSchool || 'Tidak ada sekolah',
        scores: sessionData.scores,
        totalScore
    });

    // Save to local storage
    localStorage.setItem('archeryDatabase', JSON.stringify(database));

    // Clear session data
    sessionStorage.removeItem('currentSession');

    // Redirect to database view
    window.location.href = 'database.html';
}

// Navigate back
function goBack() {
    window.location.href = 'player-setup.html';
}