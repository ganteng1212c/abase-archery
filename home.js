document.addEventListener('DOMContentLoaded', () => {
    const buttonSound = document.getElementById('buttonSound');
    const menuItems = document.querySelectorAll('.menu-item');

    // Add click sound effect to menu items
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            buttonSound.currentTime = 0;
            buttonSound.play();
        });
    });

    // Preload sound
    buttonSound.load();
});