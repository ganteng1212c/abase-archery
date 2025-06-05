document.addEventListener('DOMContentLoaded', () => {
    const introVideo = document.getElementById('introVideo');
    const loadingScreen = document.getElementById('loadingScreen');

    // Play intro video
    introVideo.play();

    // When intro video ends, show loading screen and redirect
    introVideo.addEventListener('ended', () => {
        loadingScreen.classList.add('active');
        
        // Redirect to home after a short delay
        setTimeout(() => {
            window.location.href = 'home.html';
        }, 2000);
    });

    // Handle video playback errors
    introVideo.addEventListener('error', () => {
        console.error('Error playing intro video');
        window.location.href = 'home.html';
    });
});