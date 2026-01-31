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

// Prevent FOUC - Uncloak body
document.body.classList.add('is-ready')

// Team Data
const teamMembers = [
  { name: 'Haider Ali', role: 'President' },
  { name: 'Deepesh Jain', role: 'Vice President' },
  { name: 'Palak Pachori', role: 'General Secretary' },
  { name: 'Satyam Raj', role: 'Management Head' },
  { name: 'Harshit Pathak', role: 'Public Relations Head' },
  { name: 'Vani Jain', role: 'Content Head' },
  { name: 'Mohd Adeeb', role: 'Technical Head' },
  { name: 'Nikhil Jha', role: 'Marketing Head' },
  { name: 'Ishita Bhargava', role: 'Photography Head' }
]

const teamGrid = document.querySelector('#team-grid')
if (teamGrid) {
  teamMembers.forEach(member => {
    const card = document.createElement('div')
    card.className = 'glass-card team-card'
    card.innerHTML = `
      <h3>${member.name}</h3>
      <p>${member.role}</p>
    `
    teamGrid.appendChild(card)
  })
}

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
