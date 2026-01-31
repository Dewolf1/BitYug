// Simulated User Database utilizing LocalStorage
import initialUsers from './users.json'; // Seed data from file

const DB_KEY = 'bityug_users_v1';

// Seed DB from JSON file if LocalStorage is empty
if (!localStorage.getItem(DB_KEY)) {
    console.log('Seeding database from users.json...');
    localStorage.setItem(DB_KEY, JSON.stringify(initialUsers));
}

export const UserSystem = {
    // Fetch all users
    getAllUsers: () => {
        try {
            return JSON.parse(localStorage.getItem(DB_KEY)) || [];
        } catch (e) {
            return [];
        }
    },

    // Find user by email
    findUser: (email) => {
        const users = UserSystem.getAllUsers();
        return users.find(u => u.email.toLowerCase() === email.toLowerCase());
    },

    // Authenticate user
    login: (email, password) => {
        const user = UserSystem.findUser(email);
        if (user && user.password === password) { // In a real app, hash passwords!
            return { success: true, user };
        }
        return { success: false, message: 'Invalid credentials' };
    },

    // Generate next BIT ID
    generateNextId: () => {
        const users = UserSystem.getAllUsers();
        const count = users.length + 1;
        return `BIT${String(count).padStart(3, '0')}`;
    },

    // Register new user
    register: (userData) => {
        const users = UserSystem.getAllUsers();

        // Check if email exists
        if (UserSystem.findUser(userData.email)) {
            return { success: false, message: 'Email already registered' };
        }

        const newUser = {
            ...userData,
            id: UserSystem.generateNextId(),
            joinedAt: new Date().toISOString(),
            role: 'member' // Default role
        };

        users.push(newUser);
        localStorage.setItem(DB_KEY, JSON.stringify(users));

        return { success: true, user: newUser };
    },

    // Get current session
    getCurrentUser: () => {
        const session = sessionStorage.getItem('bityug_session');
        return session ? JSON.parse(session) : null;
    },

    // Set session
    setSession: (user) => {
        sessionStorage.setItem('bityug_session', JSON.stringify(user));
    },

    // Logout
    logout: () => {
        sessionStorage.removeItem('bityug_session');
    }
};
