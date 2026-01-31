import './styles/main.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { events } from './data/events'

gsap.registerPlugin(ScrollTrigger)

// Initialize Smooth Scrolling (Lenis)
const lenis = new Lenis()
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})
gsap.ticker.lagSmoothing(0)

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle')
const navLinks = document.querySelector('.nav-links')
const navItems = document.querySelectorAll('.nav-links li')

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    // Toggle Nav
    navLinks.classList.toggle('nav-active')
    menuToggle.classList.toggle('toggle')

    // Animate Links
    navItems.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = ''
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`
      }
    })
  })

  // Close menu when a link is clicked
  navItems.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('nav-active')
      menuToggle.classList.remove('toggle')
      navItems.forEach(item => item.style.animation = '')
    })
  })
}

// Add keyframes for link animation dynamically
const styleSheet = document.createElement("style")
styleSheet.innerText = `
@keyframes navLinkFade {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
`
document.head.appendChild(styleSheet)

// Prevent FOUC - Uncloak body
document.body.classList.add('is-ready')

// Team Data
import { teamMembers } from './data/team'

const teamGrid = document.querySelector('#team-grid')
const modalOverlay = document.querySelector('.modal-overlay')
const modalContent = document.querySelector('.modal-content')
const modalClose = document.querySelector('.modal-close')

// Elements to populate
const modalImage = document.querySelector('#modal-image')
const modalName = document.querySelector('#modal-name')
const modalRole = document.querySelector('#modal-role')
const modalYear = document.querySelector('#modal-year')
const modalGithub = document.querySelector('#modal-github')
const modalLinkedin = document.querySelector('#modal-linkedin')
const modalInstagram = document.querySelector('#modal-instagram')

if (teamGrid) {
  teamMembers.forEach(member => {
    const card = document.createElement('div')
    card.className = 'glass-card team-card'
    card.setAttribute('data-id', member.id)
    card.style.cursor = 'pointer'
    card.innerHTML = `
      <h3>${member.name}</h3>
      <p>${member.role}</p>
    `
    // Click Handler for Modal
    card.addEventListener('click', () => openModal(member))
    teamGrid.appendChild(card)
  })
}

function openModal(member) {
  // Populate Data
  modalImage.src = member.image
  modalName.textContent = member.name
  modalRole.textContent = member.role
  modalYear.textContent = member.year
  modalGithub.href = member.socials.github
  modalLinkedin.href = member.socials.linkedin
  modalInstagram.href = member.socials.instagram

  // Animation
  modalOverlay.style.display = 'flex'
  gsap.to(modalOverlay, { opacity: 1, duration: 0.3 })
  gsap.fromTo(modalContent,
    { scale: 0.8, opacity: 0, y: 50 },
    { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' }
  )
}

function closeModal() {
  gsap.to(modalContent, {
    scale: 0.8,
    opacity: 0,
    y: 50,
    duration: 0.3,
    ease: 'power2.in',
    onComplete: () => {
      gsap.to(modalOverlay, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          modalOverlay.style.display = 'none'
        }
      })
    }
  })
}

// Close Events
if (modalClose) {
  modalClose.addEventListener('click', closeModal)
}

if (modalOverlay) {
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal()
  })
}

// Escape key to close
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalOverlay.style.display === 'flex') {
    closeModal()
  }
})

// Render Events on Homepage (Top 3)
const homeEventsGrid = document.querySelector('#home-events-grid')
if (homeEventsGrid) {
  const topEvents = events.slice(0, 3)
  topEvents.forEach(event => {
    const card = document.createElement('div')
    card.className = 'glass-card event-card'
    card.innerHTML = `
      <div class="event-date-time">${event.date} | ${event.time}</div>
      <h3>${event.title}</h3>
      <p>${event.description}</p>
      <a href="${event.link}" class="btn btn-primary">Learn More</a>
    `
    homeEventsGrid.appendChild(card)
  })
}

// Hero Animation (Canvas Particles)
const canvas = document.querySelector('#hero-canvas')
const ctx = canvas.getContext('2d')
let particles = []

function resize() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

window.addEventListener('resize', resize)
resize()

class Particle {
  constructor() {
    this.reset()
  }
  reset() {
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height
    this.size = Math.random() * 2
    this.speedX = (Math.random() - 0.5) * 0.5
    this.speedY = (Math.random() - 0.5) * 0.5
    this.opacity = Math.random() * 0.5
  }
  update() {
    this.x += this.speedX
    this.y += this.speedY
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.reset()
    }
  }
  draw() {
    ctx.fillStyle = `rgba(0, 242, 255, ${this.opacity})`
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

for (let i = 0; i < 150; i++) {
  particles.push(new Particle())
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  particles.forEach(p => {
    p.update()
    p.draw()
  })
  requestAnimationFrame(animate)
}
animate()

// GSAP Animations
gsap.from('.hero-content > *', {
  y: 100,
  opacity: 0,
  duration: 1.2,
  stagger: 0.2,
  ease: 'power4.out'
})

gsap.utils.toArray('.section-title').forEach(title => {
  gsap.from(title, {
    scrollTrigger: {
      trigger: title,
      start: 'top 80%',
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  })
})

gsap.utils.toArray('.glass-card').forEach(card => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: 'top 90%',
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    scale: 0.95,
    ease: 'power2.out'
  })
})
