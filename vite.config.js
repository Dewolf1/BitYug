import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                events: resolve(__dirname, 'events.html'),
                contact: resolve(__dirname, 'contact.html'),
                auth: resolve(__dirname, 'auth.html'),
                profile: resolve(__dirname, 'profile.html'),
                eventDetails: resolve(__dirname, 'event-details.html'),
            },
        },
    },
})
