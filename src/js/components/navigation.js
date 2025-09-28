// Navigation component

function createNavigation() {
    const { currentPage, isDarkMode, isAuthenticated, user } = AppState;
    
    return `
        <div class="navbar">
            <div class="container">
                <div class="flex justify-between items-center">
                    <div class="flex items-center gap-8">
                        <h2 class="text-primary font-bold">Travel Explorer</h2>
                        <nav class="flex gap-4">
                            <a href="#" class="nav-link ${currentPage === 'home' ? 'active' : ''}" data-page="home">Home</a>
                            ${isAuthenticated ? `
                                <a href="#" class="nav-link ${currentPage === 'planner' ? 'active' : ''}" data-page="planner">Trip Planner</a>
                                <a href="#" class="nav-link ${currentPage === 'timeline' ? 'active' : ''}" data-page="timeline">Timeline</a>
                                <a href="#" class="nav-link ${currentPage === 'booking' ? 'active' : ''}" data-page="booking">Booking</a>
                            ` : ''}
                        </nav>
                    </div>
                    
                    <div class="flex items-center gap-4">
                        <button class="theme-toggle" id="theme-toggle" title="Toggle theme">
                            <i data-lucide="${isDarkMode ? 'sun' : 'moon'}"></i>
                        </button>
                        
                        ${isAuthenticated ? `
                            <div class="flex items-center gap-4">
                                <a href="#" class="nav-link ${currentPage === 'profile' ? 'active' : ''}" data-page="profile">
                                    <i data-lucide="user"></i>
                                    ${user?.name || 'Profile'}
                                </a>
                                <button class="btn btn-secondary" id="logout-btn">
                                    <i data-lucide="log-out"></i>
                                    Logout
                                </button>
                            </div>
                        ` : `
                            <div class="flex gap-2">
                                <a href="#" class="btn btn-secondary" data-page="login">Login</a>
                                <a href="#" class="btn btn-primary" data-page="register">Sign Up</a>
                            </div>
                        `}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function initializeNavigation() {
    const navigationContainer = $('#navigation');
    
    function renderNavigation() {
        navigationContainer.innerHTML = createNavigation();
        
        // Re-initialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        // Add event listeners
        addNavigationEventListeners();
    }
    
    function addNavigationEventListeners() {
        // Navigation links
        $$('[data-page]').forEach(link => {
            addEvent(link, 'click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                AppState.navigateTo(page);
            });
        });
        
        // Theme toggle
        const themeToggle = $('#theme-toggle');
        if (themeToggle) {
            addEvent(themeToggle, 'click', () => {
                AppState.toggleTheme();
            });
        }
        
        // Logout button
        const logoutBtn = $('#logout-btn');
        if (logoutBtn) {
            addEvent(logoutBtn, 'click', () => {
                AppState.logout();
            });
        }
    }
    
    // Listen for state changes
    AppState.addListener(renderNavigation);
    
    // Initial render
    renderNavigation();
}