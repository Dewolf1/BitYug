# BITYUG ⚡

**The Official Tech Society of ADGIPS**

BITYUG is a modern, responsive, and interactive website designed to showcase the technical prowess of our society. Built with performance and aesthetics in mind, it features smooth animations, glassmorphic UI, and a seamless user experience across all devices.

## 🚀 Key Features

*   **Immersive Design**: A "Dark Mode" first aesthetic with neon accents (`--accent-cyan`, `--accent-purple`) and glassmorphism.
*   **Fully Responsive**: optimized for Mobile, Tablet, and Desktop.
    *   Custom Hamburger Menu with staggered animations.
    *   Responsive Grids for Events and Contact pages.
*   **Interactive Animations**:
    *   Powered by **GSAP** (GreenSock) for scroll triggers and entrance animations.
    *   **Lenis** for buttery smooth scrolling.
*   **Event Management**:
    *   Dynamic Event Feed with filtering and search.
    *   **Registration Modal** with validation and simulated processing.
    *   **Web3Forms Integration** for real-time email registration submissions.
*   **Member Area**: Dedicated profile views with barcode generation.

## 🛠️ Tech Stack

*   **Core**: HTML5, CSS3 (Modern Features), JavaScript (ES6+)
*   **Build Tool**: [Vite](https://vitejs.dev/) - Super fast frontend tooling.
*   **Animations**: [GSAP](https://greensock.com/gsap/) + ScrollTrigger.
*   **Smooth Scroll**: [Lenis](https://lenis.studiofreight.com/).
*   **Forms**: [Web3Forms](https://web3forms.com/) (Serverless form handling).

## 💻 Local Development Guide

Follow these steps to run the project locally on your machine.

### Prerequisites

*   [Node.js](https://nodejs.org/) (v16 or higher recommended)
*   [Git](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/bityug.git
cd bityug
```

### 2. Install Dependencies

We use `npm` to manage dependencies.

```bash
npm install
```

### 3. Run Development Server

Start the local development server with hot-reload.

```bash
npm run dev
```

> The site will be available at `http://localhost:5173/` (or similar).

### 4. Build for Production

To create an optimized build for deployment (minified HTML/CSS/JS):

```bash
npm run build
```

The output will be in the `dist/` folder.

### 5. Preview Production Build

To test the production build locally:

```bash
npm run preview
```

## 📂 Project Structure

```
bityug/
├── public/              # Static assets (favicons, etc.)
├── src/
│   ├── assets/          # Images and media
│   ├── data/            # Data files (team.js, events.js)
│   ├── styles/          # CSS files (modularized)
│   ├── main.js          # Main entry point & global logic
│   ├── navbar.js        # Shared responsive navbar logic
│   ├── events.js        # Logic for Events Feed
│   ├── event-details.js # Logic for Event Page & Modal
│   └── contact.js       # Logic for Contact Form
├── index.html           # Landing Page
├── events.html          # Events Listing Page
├── event-details.html   # Single Event Template
├── contact.html         # Contact Page
├── package.json         # Dependencies & Scripts
└── README.md            # You are here
```

## 🤝 Contributing

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

---

**© 2025 BITYUG. All Rights Reserved.**
