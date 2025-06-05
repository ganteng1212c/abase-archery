document.addEventListener('DOMContentLoaded', () => {
    const buttonSound = document.getElementById('buttonSound');
    const scoreGrid = document.querySelector('.score-grid');
    const playerNameElement = document.querySelector('.player-name');

    // Get player data from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const playerName = urlParams.get('name');
    const playerSchool = urlParams.get('school');

    // Update player name display
    playerNameElement.textContent = playerName;

    // Create score input fields
    for (let i = 1; i <= 6; i++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.min = '0';
        input.max = '10';
        input.className = 'score-input';
        input.placeholder = `#${i}`;
        scoreGrid.appendChild(input);
    }

    // Play sound on button click
    document.querySelector('.action-button').addEventListener('click', () => {
        buttonSound.currentTime = 0;
        buttonSound.play();
    });

    // Handle score input validation
    document.querySelectorAll('.score-input').forEach(input => {
        input.addEventListener('input', (e) => {
            let value = parseInt(e.target.value);
            if (isNaN(value) || value < 0) {
                e.target.value = '';
            } else if (value > 10) {
                e.target.value = '10';
            }
        });
    });
});

// Save scores and redirect
function saveScores() {
    const scores = [];
    document.querySelectorAll('.score-input').forEach(input => {
        scores.push(input.value ? parseInt(input.value) : 0);
    });

    const urlParams = new URLSearchParams(window.location.search);
    const playerName = urlParams.get('name');
    const playerSchool = urlParams.get('school');

    // Save to session storage
    const sessionData = {
        playerName,
        playerSchool,
        scores
    };
    sessionStorage.setItem('currentSession', JSON.stringify(sessionData));

    // Redirect to score sheet
    window.location.href = 'score-sheet.html';
}