document.addEventListener('DOMContentLoaded', function() {
    const openInviteBtn = document.getElementById('open-invite');
    const mainContent = document.getElementById('main-content');
    const guestNameElement = document.querySelector('.hero .guest-name');
    const backgroundMusic = document.getElementById('background-music'); // Ambil elemen audio

    // Function to get guest name from URL parameter
    function getGuestNameFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        const guest = urlParams.get('to') || urlParams.get('name');
        return guest ? decodeURIComponent(guest.replace(/\+/g, ' ')) : 'Tamu Undangan';
    }

    // Set guest name
    guestNameElement.textContent = getGuestNameFromUrl();

    // Smooth scroll to main content and show it when button is clicked
    openInviteBtn.addEventListener('click', function() {
        mainContent.classList.remove('hidden'); // Show the content
        mainContent.scrollIntoView({
            behavior: 'smooth'
        });

        openInviteBtn.style.display = 'none';
        document.querySelector('.hero .to-guest').style.display = 'none';
        guestNameElement.style.display = 'none';

        // Coba putar musik setelah interaksi pengguna
        if (backgroundMusic) {
            backgroundMusic.play().catch(error => {
                console.log("Autoplay failed:", error);
                // Handle case where autoplay might still be blocked even after interaction
                // (e.g., if user had muted browser tab before clicking)
            });
        }
    });


    // Countdown Timer
    // Perbarui tanggal ini ke tanggal dan waktu pernikahan Anda yang sebenarnya!
    const weddingDate = new Date('2025-08-15T09:00:00').getTime(); // Contoh: 15 Agustus 2025, 09:00 pagi WIB

    const countdownFunction = setInterval(function() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            clearInterval(countdownFunction);
            document.getElementById("countdown").innerHTML = "Kami Telah Sah!";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerHTML = days;
        document.getElementById("hours").innerHTML = hours;
        document.getElementById("minutes").innerHTML = minutes;
        document.getElementById("seconds").innerHTML = seconds;
    }, 1000);
});