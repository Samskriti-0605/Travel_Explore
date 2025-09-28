// Main application entry point

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize state
    AppState.init();
    
    // Initialize components
    initializeNavigation();
    
    // Set up route handling
    setupRouting();
    
    // Listen for state changes to render the appropriate page
    AppState.addListener(handleStateChange);
    
    // Initial page render
    handleStateChange(AppState);
    
    // Add global styles for notifications
    addGlobalStyles();
    
    console.log('Travel Explorer initialized successfully!');
});

// Handle application state changes
function handleStateChange(state) {
    renderCurrentPage(state.currentPage);
}

// Render the current page based on the route
function renderCurrentPage(page) {
    switch (page) {
        case 'home':
            initializeLandingPage();
            break;
        case 'login':
        case 'register':
            initializeAuthPage();
            break;
        case 'planner':
            initializeTripPlanner();
            break;
        case 'timeline':
            initializeJourneyTimeline();
            break;
        case 'booking':
            initializeBookingPage();
            break;
        case 'profile':
            initializeProfilePage();
            break;
        default:
            initializeLandingPage();
            break;
    }
}

// Set up routing for browser navigation
function setupRouting() {
    // Handle initial URL
    const path = window.location.pathname;
    const page = path === '/' ? 'home' : path.substring(1);
    
    if (['home', 'login', 'register', 'planner', 'timeline', 'booking', 'profile'].includes(page)) {
        AppState.currentPage = page;
    }
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', (event) => {
        if (event.state && event.state.page) {
            AppState.currentPage = event.state.page;
            AppState.notifyStateChange();
        } else {
            // Handle manual URL changes
            const currentPath = window.location.pathname;
            const currentPage = currentPath === '/' ? 'home' : currentPath.substring(1);
            
            if (['home', 'login', 'register', 'planner', 'timeline', 'booking', 'profile'].includes(currentPage)) {
                AppState.currentPage = currentPage;
                AppState.notifyStateChange();
            }
        }
    });
}

// Add global styles for the application
function addGlobalStyles() {
    if (!$('#global-app-styles')) {
        const styles = createElement('style', '', `
            /* Notification styles */
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: var(--radius);
                color: white;
                font-weight: 500;
                z-index: 1000;
                animation: slideInFromRight 0.3s ease-out;
                max-width: 400px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }
            
            .notification-success {
                background-color: var(--accent);
            }
            
            .notification-error {
                background-color: var(--destructive);
            }
            
            .notification-info {
                background-color: var(--primary);
            }
            
            /* Loading spinner */
            .loading-spinner {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 3rem;
                text-align: center;
            }
            
            .spinner {
                width: 40px;
                height: 40px;
                border: 4px solid var(--muted);
                border-top: 4px solid var(--accent);
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin-bottom: 1rem;
            }
            
            /* Button variations */
            .btn-large {
                padding: 0.75rem 2rem;
                font-size: 1.125rem;
            }
            
            .btn-sm {
                padding: 0.375rem 0.75rem;
                font-size: 0.875rem;
            }
            
            /* Destination card styling */
            .destination-card {
                height: 200px;
                border-radius: var(--radius);
                display: flex;
                align-items: end;
                color: white;
                overflow: hidden;
                position: relative;
            }
            
            /* Responsive adjustments */
            @media (max-width: 768px) {
                .container {
                    padding: 0 1rem;
                }
                
                .grid-cols-2 {
                    grid-template-columns: 1fr;
                }
                
                .grid-cols-3 {
                    grid-template-columns: 1fr;
                }
                
                .hero h1 {
                    font-size: 2rem;
                }
                
                .notification {
                    top: 10px;
                    right: 10px;
                    left: 10px;
                    max-width: none;
                }
                
                .flex {
                    flex-direction: column;
                    gap: 0.5rem;
                }
                
                .justify-between {
                    justify-content: center;
                }
                
                .text-center {
                    text-align: center;
                }
            }
            
            @media (max-width: 480px) {
                .card {
                    padding: 1rem;
                }
                
                .hero {
                    padding: 3rem 0;
                }
                
                .py-20 {
                    padding-top: 3rem;
                    padding-bottom: 3rem;
                }
                
                .py-12 {
                    padding-top: 2rem;
                    padding-bottom: 2rem;
                }
            }
            
            /* Animations */
            @keyframes slideInFromRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            
            /* Smooth scrolling */
            html {
                scroll-behavior: smooth;
            }
            
            /* Focus styles for accessibility */
            *:focus {
                outline: 2px solid var(--accent);
                outline-offset: 2px;
            }
            
            /* Smooth transitions for theme changes */
            * {
                transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
            }
            
            /* Print styles */
            @media print {
                .navbar,
                .btn,
                .theme-toggle {
                    display: none !important;
                }
                
                .card {
                    box-shadow: none;
                    border: 1px solid #ccc;
                }
            }
        `);
        styles.id = 'global-app-styles';
        document.head.appendChild(styles);
    }
}

// Error handling
window.addEventListener('error', (event) => {
    console.error('Application error:', event.error);
    showNotification('An unexpected error occurred. Please refresh the page.', 'error');
});

// Unhandled promise rejection handling
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    showNotification('Something went wrong. Please try again.', 'error');
});

// Service worker registration for PWA (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment the following lines if you want to implement PWA functionality
        // navigator.serviceWorker.register('/service-worker.js')
        //     .then(registration => {
        //         console.log('SW registered: ', registration);
        //     })
        //     .catch(registrationError => {
        //         console.log('SW registration failed: ', registrationError);
        //     });
    });
}

// Export for testing purposes (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AppState,
        UserData,
        renderCurrentPage,
        handleStateChange
    };
}