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
                    <a href="${e.registrationLink}" target="_blank" class="btn btn-primary join-btn">JOIN NOW</a>
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
}
