import { UserSystem } from './data/users';
import gsap from 'gsap';

document.addEventListener('DOMContentLoaded', () => {
    // Check Authentication
    const user = UserSystem.getCurrentUser();

    if (!user) {
        window.location.href = 'auth.html';
        return;
    }

    // Uncloak Body
    setTimeout(() => document.body.classList.add('is-ready'), 100);

    // Populate Data
    document.getElementById('user-name').textContent = user.name;
    document.getElementById('welcome-name').textContent = user.name.split(' ')[0];
    document.getElementById('user-id').textContent = user.id;
    document.getElementById('user-email').textContent = user.email;
    document.getElementById('user-course').textContent = user.course || 'N/A';

    // Generate Barcode
    if (window.JsBarcode) {
        JsBarcode("#barcode", user.id, {
            format: "CODE128",
            lineColor: "#00f2ff",
            background: "transparent",
            width: 2,
            height: 50,
            displayValue: true,
            font: "Orbitron",
            textMargin: 8,
            fontSize: 14,
            fontOptions: "bold",
            textColor: "#ffffff"
        });
    }

    // Animate Entrance
    gsap.from('.profile-card', {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });

    gsap.from('.dashboard-area > *', {
        x: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.2
    });

    // Logout Logic
    const logoutBtn = document.getElementById('nav-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            UserSystem.logout();
            window.location.href = 'auth.html';
        });
    }
});
