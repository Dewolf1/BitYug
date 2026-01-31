import '/src/styles/main.css'
import '/src/styles/contact.css'

const contactForm = document.querySelector('#contact-form')
const successOverlay = document.querySelector('#form-success')
const closeSuccess = document.querySelector('#close-success')

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    // Animate button
    const submitBtn = contactForm.querySelector('.submit-btn')
    const originalText = submitBtn.innerHTML
    submitBtn.innerHTML = 'SYNCHRONIZING...'
    submitBtn.disabled = true

    // Real API call to Web3Forms
    const formData = new FormData(contactForm)

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            // Show success animation
            successOverlay.style.display = 'flex'
            gsap.from('.success-content > *', {
                opacity: 0,
                y: 30,
                stagger: 0.1,
                duration: 0.5,
                ease: 'power2.out'
            })
            contactForm.reset()
        } else {
            throw new Error(data.message || 'Submission failed');
        }

    } catch (err) {
        alert('Transmission Error: ' + err.message)
        console.error("Web3Forms Error:", err)
    } finally {
        submitBtn.innerHTML = originalText
        submitBtn.disabled = false
    }
})

closeSuccess.addEventListener('click', () => {
    gsap.to('.success-content', {
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        onComplete: () => {
            successOverlay.style.display = 'none'
            gsap.set('.success-content', { opacity: 1, scale: 1 })
        }
    })
})

// Entrance Animations
// Entrance Animations - Fixed Scoping
gsap.from('.info-card', {
    scrollTrigger: {
        trigger: '.contact-grid',
        start: 'top 80%',
        toggleActions: 'play none none reverse' // Re-play on scroll back up
    },
    opacity: 0,
    x: 50,
    stagger: 0.2,
    duration: 0.8,
    ease: 'power2.out'
})

// Initial reveal
gsap.from('.contact-header > *', {
    opacity: 0,
    y: 30,
    stagger: 0.2,
    duration: 1,
    ease: 'power3.out'
})

gsap.from('.contact-form-section', {
    opacity: 0,
    scale: 0.95,
    duration: 1.2,
    delay: 0.5,
    ease: 'expo.out'
})
