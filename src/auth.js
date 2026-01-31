import { UserSystem } from './data/users';
import gsap from 'gsap';

// Check if already logged in
if (UserSystem.getCurrentUser()) {
    window.location.href = 'profile.html';
}

document.addEventListener('DOMContentLoaded', () => {
    // Uncloak
    setTimeout(() => document.body.classList.add('is-ready'), 100);

    // Elements
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const authToggle = document.querySelector('.auth-toggle');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const btnLogin = document.getElementById('btn-login');
    const btnSignup = document.getElementById('btn-signup');

    // Toggle Logic
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // UI Toggle
            toggleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            if (btn.id === 'btn-signup') {
                authToggle.classList.add('right');
                switchForm('signup');
            } else {
                authToggle.classList.remove('right');
                switchForm('login');
            }
        });
    });

    function switchForm(type) {
        if (type === 'signup') {
            gsap.to(loginForm, {
                opacity: 0,
                x: -20,
                duration: 0.3,
                onComplete: () => {
                    loginForm.classList.remove('active-form');
                    signupForm.classList.add('active-form');
                    gsap.fromTo(signupForm, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.3 });
                }
            });
        } else {
            gsap.to(signupForm, {
                opacity: 0,
                x: 20,
                duration: 0.3,
                onComplete: () => {
                    signupForm.classList.remove('active-form');
                    loginForm.classList.add('active-form');
                    gsap.fromTo(loginForm, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.3 });
                }
            });
        }
    }

    // Login Handler
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const btn = loginForm.querySelector('button');
        const errorDiv = document.getElementById('login-error');

        setLoading(btn, true);
        errorDiv.textContent = '';

        // Simulate Network Delay
        await new Promise(r => setTimeout(r, 1500));

        const result = UserSystem.login(email, password);

        if (result.success) {
            UserSystem.setSession(result.user);
            window.location.href = 'profile.html';
        } else {
            errorDiv.textContent = `Error: ${result.message}`;
            setLoading(btn, false);
            gsap.fromTo(errorDiv, { x: -5 }, { x: 5, duration: 0.1, yoyo: true, repeat: 3 });
        }
    });

    // Signup Handler
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const course = document.getElementById('signup-course').value;
        const password = document.getElementById('signup-password').value;
        const btn = signupForm.querySelector('button');
        const errorDiv = document.getElementById('signup-error');

        setLoading(btn, true);
        errorDiv.textContent = '';

        // Simulate Network Delay
        await new Promise(r => setTimeout(r, 2000));

        // Create User in Local Storage (Immediate Access)
        const result = UserSystem.register({ name, email, course, password });

        if (result.success) {
            // Background: Send Data to Admin via Web3Forms
            // SECURITY WARNING: Sending passwords via email is insecure and for educational demo purposes only as requested.
            const formData = new FormData();
            formData.append("access_key", "d7000e6f-4c6b-45df-96e5-61703c23c2df"); // User's key
            formData.append("subject", `New BITYUG Member: ${name}`);
            formData.append("message", `
                NEW MEMBER REGISTRATION
                -----------------------
                Name: ${name}
                Email: ${email}
                Course: ${course}
                ID: ${result.user.id}
                Password: ${password} 
                
                ACTION REQUIRED: Add this user to src/data/users.json to make them permanent.
            `);

            fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            }).catch(err => console.error("Admin notification failed:", err));

            // Direct login after signup
            UserSystem.setSession(result.user);
            window.location.href = 'profile.html';
        } else {
            errorDiv.textContent = `System Error: ${result.message}`;
            setLoading(btn, false);
            gsap.fromTo(errorDiv, { x: -5 }, { x: 5, duration: 0.1, yoyo: true, repeat: 3 });
        }
    });

    function setLoading(btn, isLoading) {
        const textSpan = btn.querySelector('.btn-text');
        const loader = btn.querySelector('.loader');

        if (isLoading) {
            textSpan.style.display = 'none';
            loader.style.display = 'block';
            btn.disabled = true;
        } else {
            textSpan.style.display = 'block';
            loader.style.display = 'none';
            btn.disabled = false;
        }
    }
});
