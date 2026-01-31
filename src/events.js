import '/src/styles/main.css'
import '/src/styles/events_v2.css'
import { events } from './data/events'

// DOM Elements
const eventsFeed = document.querySelector('#v2-events-feed')
const resultCountEl = document.querySelector('#v2-result-count')
const searchInput = document.querySelector('#v2-event-search')
const sortSelect = document.querySelector('#v2-sort-select')
const clearFiltersBtn = document.querySelector('#v2-clear-filters')
const emptyState = document.querySelector('#v2-empty-state')

// Filter Sidebar Containers
const filterContainers = {
    type: document.querySelector('[data-filter-type="type"]'),
    location: document.querySelector('[data-filter-type="location"]'),
    level: document.querySelector('[data-filter-type="level"]'),
}

// State
let activeFilters = {
    type: [],
    location: [],
    level: [],
    status: ['upcoming', 'past'],
    search: '',
    sort: 'newest'
}

/**
 * Initialize the Filter Sidebar with dynamic counts
 */
function initFilters() {
    Object.keys(filterContainers).forEach(key => {
        const container = filterContainers[key]
        const uniqueValues = [...new Set(events.map(event => event[key]))]

        container.innerHTML = uniqueValues.map(val => {
            const count = events.filter(e => e[key] === val).length
            return `
                <label class="v2-check-item">
                    <input type="checkbox" name="${key}" value="${val}">
                    <span class="v2-check-text">${val}</span>
                    <span class="v2-count">(${count})</span>
                </label>
            `
        }).join('')
    })

    // Listen for changes in the sidebar
    document.querySelector('.v2-filter-sidebar').addEventListener('change', (e) => {
        if (e.target.type === 'checkbox') {
            updateActiveFilters()
        }
    })
}

/**
 * Update the state object based on UI state
 */
function updateActiveFilters() {
    activeFilters.type = Array.from(document.querySelectorAll('input[name="type"]:checked')).map(i => i.value)
    activeFilters.location = Array.from(document.querySelectorAll('input[name="location"]:checked')).map(i => i.value)
    activeFilters.level = Array.from(document.querySelectorAll('input[name="level"]:checked')).map(i => i.value)
    activeFilters.status = Array.from(document.querySelectorAll('input[name="status"]:checked')).map(i => i.value)
    activeFilters.search = searchInput.value.toLowerCase()
    activeFilters.sort = sortSelect.value

    applyFilters()
}

/**
 * The Core Filtering Engine
 */
function applyFilters() {
    let filtered = events.filter(event => {
        const matchesType = activeFilters.type.length === 0 || activeFilters.type.includes(event.type)
        const matchesLocation = activeFilters.location.length === 0 || activeFilters.location.includes(event.location)
        const matchesLevel = activeFilters.level.length === 0 || activeFilters.level.includes(event.level)

        const eventDate = new Date(event.date)
        const now = new Date()
        const isUpcoming = eventDate >= now
        const isPast = eventDate < now
        const matchesStatus = (activeFilters.status.includes('upcoming') && isUpcoming) ||
            (activeFilters.status.includes('past') && isPast)

        const searchVal = activeFilters.search
        const matchesSearch = !searchVal ||
            event.title.toLowerCase().includes(searchVal) ||
            event.description.toLowerCase().includes(searchVal) ||
            event.tags.some(t => t.toLowerCase().includes(searchVal))

        return matchesType && matchesLocation && matchesLevel && matchesStatus && matchesSearch
    })

    // Sorting
    if (activeFilters.sort === 'newest') {
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
    } else if (activeFilters.sort === 'oldest') {
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date))
    } else if (activeFilters.sort === 'alpha') {
        filtered.sort((a, b) => a.title.localeCompare(b.title))
    }

    renderFeed(filtered)
}

/**
 * Render the results to the feed
 */
function renderFeed(items) {
    eventsFeed.innerHTML = ''
    resultCountEl.innerText = `Showing ${items.length} event${items.length === 1 ? '' : 's'}`

    if (items.length === 0) {
        emptyState.style.display = 'block'
        return
    }
    emptyState.style.display = 'none'

    items.forEach((event, index) => {
        const card = document.createElement('div')
        card.className = 'v2-event-card'
        card.innerHTML = `
            <div class="v2-card-image-wrap">
                <img src="${event.image}" class="v2-card-image" alt="${event.title}">
            </div>
            <div class="v2-card-info">
                <span class="v2-card-type">${event.type}</span>
                <h3>${event.title}</h3>
                <p class="v2-card-desc">${event.description}</p>
                <div class="v2-card-footer">
                    <div class="v2-card-meta">
                        <span>📅 ${event.date}</span>
                        <span>🕒 ${event.time}</span>
                    </div>
                    <div class="v2-badge-group">
                        <span class="v2-badge v2-badge-level">${event.level}</span>
                        <span class="v2-badge v2-badge-location">${event.location}</span>
                    </div>
                    <a href="event-details.html?id=${event.id}" class="btn-link">View Details →</a>
                </div>
            </div>
        `
        eventsFeed.appendChild(card)

        // Animate in
        gsap.from(card, {
            opacity: 0,
            x: -20,
            duration: 0.4,
            delay: index * 0.05,
            ease: 'power2.out'
        })
    })
}

// Listeners
searchInput.addEventListener('input', () => updateActiveFilters())
sortSelect.addEventListener('change', () => updateActiveFilters())

clearFiltersBtn.addEventListener('click', () => {
    document.querySelectorAll('.v2-checkbox-list input[type="checkbox"]').forEach(i => {
        if (i.name === 'status') i.checked = true
        else i.checked = false
    })
    searchInput.value = ''
    updateActiveFilters()
})

// Kickoff
initFilters()
updateActiveFilters()
