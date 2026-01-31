import { events } from './data/events'
import '/src/styles/main.css'
import '/src/styles/events_v2.css'

// Get event ID from URL
const urlParams = new URLSearchParams(window.location.search)
const eventId = parseInt(urlParams.get('id'))
const event = events.find(e => e.id === eventId)

const contentEl = document.querySelector('#event-details-content')

if (!event) {
    contentEl.innerHTML = `
        <div class="container" style="padding: 10rem 0; text-align: center;">
            <h1 class="tech-font">Event Not Found</h1>
            <p>The event you are looking for does not exist or has been removed.</p>
            <a href="events.html" class="btn btn-primary" style="margin-top: 2rem;">Back to Events</a>
        </div>
    `
} else {
    renderEventDetails(event)
}

function renderEventDetails(e) {
    contentEl.innerHTML = `
        <section class="details-hero" style="background-image: linear-gradient(to bottom, rgba(5,5,5,0.4), #050505), url('${e.image}')">
            <div class="container hero-inner">
                <div class="details-badges">
                    <span class="v2-badge v2-badge-level">${e.level}</span>
                    <span class="v2-badge v2-badge-location">${e.location}</span>
                </div>
                <h1 class="tech-font">${e.title}</h1>
                <p class="details-theme">${e.theme}</p>
                <div class="details-cta-box">
                    <div class="meta-item">
                        <span class="label">DATE</span>
                        <span class="value">${e.date}</span>
                    </div>
                    <div class="meta-item">
                        <span class="label">TIME</span>
                        <span class="value">${e.time}</span>
                    </div>
                    <a href="#" class="btn btn-primary join-btn">JOIN NOW</a>
                </div>
            </div>
        </section>

        <section class="details-body container">
            <div class="details-grid">
                <div class="details-main">
                    <h2>About the Event</h2>
                    <p class="long-desc">${e.longDescription}</p>
                    
                    <div class="itinerary-section">
                        <h2>Event Schedule</h2>
                        <div class="itinerary-list">
                            ${e.itinerary.map(item => `
                                <div class="itinerary-item">
                                    <span class="i-time">${item.time}</span>
                                    <span class="i-task">${item.task}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                
                <aside class="details-sidebar">
                    <div class="sidebar-card glass-card">
                        <h3>Quick Tags</h3>
                        <div class="tags-group">
                            ${e.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                        </div>
                    </div>
                    <div class="sidebar-card glass-card">
                        <h3>Requirement</h3>
                        <ul>
                            <li>Laptop mandatory</li>
                            <li>Team of 4 (max)</li>
                            <li>Basic Coding Knowledge</li>
                        </ul>
                    </div>
                </aside>
            </div>
        </section>
    `

    // Animate everything in
    gsap.from('.hero-inner > *', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    })

    gsap.from('.details-grid > *', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.6,
        stagger: 0.3,
        ease: 'power3.out'
    })

    // Initialize Modal Logic
    initRegistrationModal(e)
}

function initRegistrationModal(eventData) {
    // 1. Inject Modal HTML if not present
    if (!document.querySelector('#registration-modal')) {
        const modalHTML = `
            <div id="registration-modal" class="modal-overlay">
                <div class="modal-content registration-content">
                    <button class="modal-close">&times;</button>
                    <div class="modal-header">
                        <h2 class="tech-font">Event Registration</h2>
                        <p class="modal-subtitle">Secure your spot for <span id="reg-event-title" class="accent-text"></span></p>
                    </div>
                    <form id="event-reg-form">
                        <!-- Web3Forms Config -->
                        <input type="hidden" name="access_key" value="d7000e6f-4c6b-45df-96e5-61703c23c2df">
                        <input type="hidden" name="subject" value="New Event Registration">
                        <input type="hidden" name="from_name" value="Bityug Event System">
                        <input type="hidden" name="event_name" id="form-event-name-input">

                        <div class="form-grid">
                            <div class="form-group">
                                <label>Full Name *</label>
                                <input type="text" name="name" required placeholder="Ex: Sarah Connor">
                            </div>
                            <div class="form-group">
                                <label>College / Organization *</label>
                                <input type="text" name="college" required placeholder="Ex: ADGIPS">
                            </div>
                            <div class="form-group">
                                <label>Email Address *</label>
                                <input type="email" name="email" required placeholder="Ex: sarah@skynet.com">
                            </div>
                            <div class="form-group">
                                <label>Phone Number *</label>
                                <input type="tel" name="phone" required placeholder="Ex: +91 9876543210">
                            </div>
                            <div class="form-group">
                                <label>GitHub Profile (Optional)</label>
                                <input type="url" name="github" placeholder="https://github.com/...">
                            </div>
                            <div class="form-group">
                                <label>LinkedIn Profile (Optional)</label>
                                <input type="url" name="linkedin" placeholder="https://linkedin.com/in/...">
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary btn-block" style="margin-top: 2rem;">
                            CONFIRM REGISTRATION
                        </button>
                    </form>
                </div>
            </div>
        `
        document.body.insertAdjacentHTML('beforeend', modalHTML)
    }

    // 2. Event Listeners
    const modal = document.querySelector('#registration-modal')
    const closeBtn = modal.querySelector('.modal-close')
    const joinBtn = document.querySelector('.join-btn')
    const form = document.querySelector('#event-reg-form')
    const regTitle = document.querySelector('#reg-event-title')
    const eventNameInput = document.querySelector('#form-event-name-input')

    // Open
    if (joinBtn) {
        joinBtn.addEventListener('click', (e) => {
            e.preventDefault()
            regTitle.textContent = eventData.title
            if (eventNameInput) eventNameInput.value = eventData.title

            modal.style.display = 'flex'
            gsap.to(modal, { opacity: 1, duration: 0.3 })
            gsap.fromTo('.registration-content',
                { scale: 0.9, y: 20 },
                { scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
            )
        })
    }

    // Close Functions
    const closeModal = () => {
        gsap.to(modal, {
            opacity: 0, duration: 0.3, onComplete: () => {
                modal.style.display = 'none'
            }
        })
    }

    closeBtn.addEventListener('click', closeModal)

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal()
    })

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') closeModal()
    })

    // Form Submit
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const btn = form.querySelector('button[type="submit"]')
        const originalText = btn.textContent

        // Show loading state
        btn.textContent = 'PROCESSING...'
        btn.style.opacity = '0.7'

        const formData = new FormData(form);

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        })
            .then(async (response) => {
                if (response.status === 200) {
                    btn.textContent = 'REGISTRATION SUCCESSFUL!'
                    btn.style.background = 'var(--accent-cyan)'
                    btn.style.color = '#000'

                    setTimeout(() => {
                        closeModal()
                        form.reset()
                        btn.textContent = originalText
                        btn.style.background = ''
                        btn.style.color = ''
                        btn.style.opacity = '1'
                        alert(`Successfully registered for ${eventData.title}! Check your email for details.`)
                    }, 1000)
                } else {
                    console.log(response);
                    alert("Something went wrong! Please try again.");
                    btn.textContent = originalText
                    btn.style.opacity = '1'
                }
            })
            .catch(error => {
                console.log(error);
                alert("Something went wrong! Please check your connection.");
                btn.textContent = originalText
                btn.style.opacity = '1'
            });
    })
}
