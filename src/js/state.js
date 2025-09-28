// Global state management for Travel Explorer

// Application state
const AppState = {
    currentPage: 'home',
    isDarkMode: false,
    isAuthenticated: false,
    user: null,
    currentTripData: null,
    
    // Initialize state from localStorage
    init() {
        // Check for saved theme preference
        const savedTheme = getStorage('travelExplorerTheme');
        if (savedTheme === 'dark') {
            this.isDarkMode = true;
            document.documentElement.classList.add('dark');
        }

        // Check for authentication
        const authStatus = getStorage('travelExplorerAuth');
        const userData = getStorage('travelExplorerUser');
        
        if (authStatus === true && userData) {
            this.isAuthenticated = true;
            this.user = userData;
        }
        
        // Load current trip data if exists
        const tripData = getStorage('travelExplorerCurrentTrip');
        if (tripData) {
            this.currentTripData = tripData;
        }
    },
    
    // Theme management
    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        if (this.isDarkMode) {
            document.documentElement.classList.add('dark');
            setStorage('travelExplorerTheme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            setStorage('travelExplorerTheme', 'light');
        }
        this.notifyStateChange();
    },
    
    // Authentication management
    login(userData) {
        this.isAuthenticated = true;
        this.user = userData;
        setStorage('travelExplorerAuth', true);
        setStorage('travelExplorerUser', userData);
        this.notifyStateChange();
    },
    
    logout() {
        this.isAuthenticated = false;
        this.user = null;
        this.currentTripData = null;
        removeStorage('travelExplorerAuth');
        removeStorage('travelExplorerUser');
        removeStorage('travelExplorerCurrentTrip');
        this.navigateTo('home');
        this.notifyStateChange();
    },
    
    // Navigation management
    navigateTo(page) {
        // Redirect unauthenticated users trying to access protected pages
        if (!this.isAuthenticated && ['planner', 'timeline', 'booking', 'profile'].includes(page)) {
            this.currentPage = 'login';
        } else {
            this.currentPage = page;
        }
        this.notifyStateChange();
        this.updateURL();
    },
    
    // Trip data management
    setTripData(tripData) {
        this.currentTripData = tripData;
        setStorage('travelExplorerCurrentTrip', tripData);
        this.notifyStateChange();
    },
    
    // URL management
    updateURL() {
        const url = this.currentPage === 'home' ? '/' : `/${this.currentPage}`;
        window.history.pushState({ page: this.currentPage }, '', url);
    },
    
    // State change notification system
    listeners: [],
    
    addListener(callback) {
        this.listeners.push(callback);
    },
    
    removeListener(callback) {
        this.listeners = this.listeners.filter(listener => listener !== callback);
    },
    
    notifyStateChange() {
        this.listeners.forEach(callback => callback(this));
    }
};

// User data management
const UserData = {
    // Save user profile updates
    updateProfile(profileData) {
        if (AppState.user) {
            AppState.user = { ...AppState.user, ...profileData };
            setStorage('travelExplorerUser', AppState.user);
            AppState.notifyStateChange();
        }
    },
    
    // Get saved trips
    getSavedTrips() {
        return getStorage('travelExplorerSavedTrips', []);
    },
    
    // Save a trip
    saveTrip(tripData) {
        const savedTrips = this.getSavedTrips();
        const tripWithId = {
            id: generateId(),
            ...tripData,
            savedAt: new Date().toISOString()
        };
        savedTrips.push(tripWithId);
        setStorage('travelExplorerSavedTrips', savedTrips);
        return tripWithId;
    },
    
    // Get saved bookings
    getSavedBookings() {
        return getStorage('travelExplorerBookings', []);
    },
    
    // Save a booking
    saveBooking(bookingData) {
        const savedBookings = this.getSavedBookings();
        const bookingWithId = {
            id: generateId(),
            ...bookingData,
            bookedAt: new Date().toISOString(),
            status: 'confirmed'
        };
        savedBookings.push(bookingWithId);
        setStorage('travelExplorerBookings', savedBookings);
        return bookingWithId;
    }
};

// Initialize state when script loads
document.addEventListener('DOMContentLoaded', () => {
    AppState.init();
});

// Handle browser back/forward buttons
window.addEventListener('popstate', (event) => {
    if (event.state && event.state.page) {
        AppState.currentPage = event.state.page;
        AppState.notifyStateChange();
    }
});