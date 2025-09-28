// Profile component

function createProfilePage() {
    const { user } = AppState;
    
    if (!user) {
        return `
            <div class="container py-12">
                <div class="max-w-4xl mx-auto text-center">
                    <div class="animate-fade-in-up">
                        <i data-lucide="user-x" size="64" class="text-muted mx-auto mb-4"></i>
                        <h2>Please Log In</h2>
                        <p class="text-muted mb-6">You need to be logged in to view your profile.</p>
                        <button class="btn btn-primary" data-page="login">
                            <i data-lucide="log-in"></i>
                            Log In
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    const savedTrips = UserData.getSavedTrips();
    const savedBookings = UserData.getSavedBookings();
    
    return `
        <div class="container py-12">
            <div class="max-w-4xl mx-auto">
                <div class="text-center mb-12 animate-fade-in-up">
                    <h1>My Profile</h1>
                    <p class="text-muted">Manage your account and view your travel history</p>
                </div>
                
                <!-- Profile Tabs -->
                <div class="card mb-8 animate-fade-in-up">
                    <div class="profile-tabs">
                        <button class="tab-button active" data-tab="overview">Overview</button>
                        <button class="tab-button" data-tab="trips">My Trips</button>
                        <button class="tab-button" data-tab="bookings">My Bookings</button>
                        <button class="tab-button" data-tab="settings">Settings</button>
                    </div>
                </div>
                
                <!-- Tab Content -->
                <div class="tab-content">
                    <!-- Overview Tab -->
                    <div class="tab-panel active" id="overview-panel">
                        <div class="grid grid-cols-2 gap-8">
                            <!-- Profile Info -->
                            <div class="card animate-fade-in-up">
                                <h2 class="mb-6">Profile Information</h2>
                                
                                <div class="flex items-center gap-4 mb-6">
                                    <div class="w-16 h-16 bg-accent rounded-full flex items-center justify-center text-2xl font-bold text-white">
                                        ${(user.name || user.email).charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <div class="font-medium text-lg">${user.name || 'Traveler'}</div>
                                        <div class="text-muted">${user.email}</div>
                                    </div>
                                </div>
                                
                                <div class="space-y-3">
                                    <div class="flex justify-between">
                                        <span class="text-muted">Member since:</span>
                                        <span>${formatDate(user.registeredAt || user.loginAt)}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-muted">Total trips:</span>
                                        <span>${savedTrips.length}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-muted">Total bookings:</span>
                                        <span>${savedBookings.length}</span>
                                    </div>
                                </div>
                                
                                <button class="btn btn-secondary w-full mt-6" id="edit-profile-btn">
                                    <i data-lucide="edit-2"></i>
                                    Edit Profile
                                </button>
                            </div>
                            
                            <!-- Travel Stats -->
                            <div class="space-y-6">
                                <div class="card animate-fade-in-up" style="animation-delay: 0.1s">
                                    <h3 class="mb-4">Travel Statistics</h3>
                                    
                                    <div class="grid grid-cols-2 gap-4">
                                        <div class="text-center p-4 bg-secondary rounded">
                                            <div class="text-2xl font-bold text-primary">${savedBookings.length}</div>
                                            <div class="text-sm text-muted">Trips Booked</div>
                                        </div>
                                        <div class="text-center p-4 bg-secondary rounded">
                                            <div class="text-2xl font-bold text-accent">${savedTrips.length}</div>
                                            <div class="text-sm text-muted">Plans Created</div>
                                        </div>
                                        <div class="text-center p-4 bg-secondary rounded">
                                            <div class="text-2xl font-bold text-primary">${calculateTotalSpent(savedBookings)}</div>
                                            <div class="text-sm text-muted">Total Spent</div>
                                        </div>
                                        <div class="text-center p-4 bg-secondary rounded">
                                            <div class="text-2xl font-bold text-accent">${getUniqueDestinations(savedTrips, savedBookings).length}</div>
                                            <div class="text-sm text-muted">Destinations</div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="card animate-fade-in-up" style="animation-delay: 0.2s">
                                    <h3 class="mb-4">Recent Activity</h3>
                                    
                                    <div class="space-y-3">
                                        ${getRecentActivity(savedTrips, savedBookings).map(activity => `
                                            <div class="flex items-center gap-3 p-3 bg-secondary rounded">
                                                <i data-lucide="${activity.icon}" size="16" class="text-accent"></i>
                                                <div class="flex-1">
                                                    <div class="font-medium">${activity.title}</div>
                                                    <div class="text-sm text-muted">${activity.date}</div>
                                                </div>
                                            </div>
                                        `).join('')}
                                        
                                        ${getRecentActivity(savedTrips, savedBookings).length === 0 ? `
                                            <div class="text-center text-muted py-4">
                                                <i data-lucide="calendar-x" size="24" class="mx-auto mb-2"></i>
                                                <div>No recent activity</div>
                                            </div>
                                        ` : ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- My Trips Tab -->
                    <div class="tab-panel hidden" id="trips-panel">
                        <div class="card animate-fade-in-up">
                            <div class="flex items-center justify-between mb-6">
                                <h2>My Trip Plans</h2>
                                <button class="btn btn-primary" data-page="planner">
                                    <i data-lucide="plus"></i>
                                    Plan New Trip
                                </button>
                            </div>
                            
                            ${savedTrips.length > 0 ? `
                                <div class="grid gap-6">
                                    ${savedTrips.map(trip => `
                                        <div class="border rounded-lg p-6 hover-scale">
                                            <div class="flex items-center justify-between mb-4">
                                                <h3>${trip.destination}</h3>
                                                <div class="flex gap-2">
                                                    <button class="btn btn-secondary btn-sm view-trip-btn" data-trip-id="${trip.id}">
                                                        <i data-lucide="eye"></i>
                                                        View
                                                    </button>
                                                    <button class="btn btn-secondary btn-sm edit-trip-btn" data-trip-id="${trip.id}">
                                                        <i data-lucide="edit-2"></i>
                                                        Edit
                                                    </button>
                                                    <button class="btn btn-destructive btn-sm delete-trip-btn" data-trip-id="${trip.id}">
                                                        <i data-lucide="trash-2"></i>
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                            
                                            <div class="grid grid-cols-3 gap-4 text-sm">
                                                <div>
                                                    <div class="text-muted">Dates</div>
                                                    <div>${formatDate(trip.startDate)} - ${formatDate(trip.endDate)}</div>
                                                </div>
                                                <div>
                                                    <div class="text-muted">Duration</div>
                                                    <div>${calculateTripDuration(trip)} days</div>
                                                </div>
                                                <div>
                                                    <div class="text-muted">Estimated Cost</div>
                                                    <div>$${trip.estimatedCost?.total || 'N/A'}</div>
                                                </div>
                                            </div>
                                            
                                            <div class="mt-4">
                                                <div class="text-sm text-muted mb-2">Planned Activities:</div>
                                                <div class="flex flex-wrap gap-2">
                                                    ${trip.itinerary?.slice(0, 3).map(day => 
                                                        day.activities.slice(0, 2).map(activity => 
                                                            `<span class="px-2 py-1 bg-accent/10 text-accent text-xs rounded">${activity}</span>`
                                                        ).join('')
                                                    ).join('')}
                                                    ${trip.itinerary?.length > 3 ? '<span class="px-2 py-1 bg-secondary text-muted text-xs rounded">+more</span>' : ''}
                                                </div>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            ` : `
                                <div class="text-center py-12">
                                    <i data-lucide="map" size="48" class="text-muted mx-auto mb-4"></i>
                                    <h3>No Trip Plans Yet</h3>
                                    <p class="text-muted mb-6">Start planning your first adventure!</p>
                                    <button class="btn btn-primary" data-page="planner">
                                        <i data-lucide="plus"></i>
                                        Plan Your First Trip
                                    </button>
                                </div>
                            `}
                        </div>
                    </div>
                    
                    <!-- My Bookings Tab -->
                    <div class="tab-panel hidden" id="bookings-panel">
                        <div class="card animate-fade-in-up">
                            <h2 class="mb-6">My Bookings</h2>
                            
                            ${savedBookings.length > 0 ? `
                                <div class="space-y-6">
                                    ${savedBookings.map(booking => `
                                        <div class="border rounded-lg p-6">
                                            <div class="flex items-center justify-between mb-4">
                                                <div>
                                                    <h3>${booking.tripData?.destination || 'Unknown Destination'}</h3>
                                                    <div class="text-sm text-muted">Booking ID: ${booking.id}</div>
                                                </div>
                                                <div class="text-right">
                                                    <div class="font-bold text-primary">$${booking.paymentInfo?.amount || 'N/A'}</div>
                                                    <div class="text-sm ${booking.status === 'confirmed' ? 'text-accent' : 'text-muted'}">${booking.status?.toUpperCase()}</div>
                                                </div>
                                            </div>
                                            
                                            <div class="grid grid-cols-3 gap-4 text-sm mb-4">
                                                <div>
                                                    <div class="text-muted">Travel Dates</div>
                                                    <div>${booking.tripData ? `${formatDate(booking.tripData.startDate)} - ${formatDate(booking.tripData.endDate)}` : 'N/A'}</div>
                                                </div>
                                                <div>
                                                    <div class="text-muted">Travelers</div>
                                                    <div>${booking.tripData?.travelers || 'N/A'}</div>
                                                </div>
                                                <div>
                                                    <div class="text-muted">Booked</div>
                                                    <div>${formatDate(booking.bookedAt)}</div>
                                                </div>
                                            </div>
                                            
                                            <div class="flex gap-2">
                                                <button class="btn btn-secondary btn-sm view-booking-btn" data-booking-id="${booking.id}">
                                                    <i data-lucide="eye"></i>
                                                    View Details
                                                </button>
                                                <button class="btn btn-secondary btn-sm download-booking-btn" data-booking-id="${booking.id}">
                                                    <i data-lucide="download"></i>
                                                    Download Ticket
                                                </button>
                                                ${booking.status === 'confirmed' ? `
                                                    <button class="btn btn-destructive btn-sm cancel-booking-btn" data-booking-id="${booking.id}">
                                                        <i data-lucide="x-circle"></i>
                                                        Cancel
                                                    </button>
                                                ` : ''}
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            ` : `
                                <div class="text-center py-12">
                                    <i data-lucide="ticket" size="48" class="text-muted mx-auto mb-4"></i>
                                    <h3>No Bookings Yet</h3>
                                    <p class="text-muted mb-6">Your booked trips will appear here.</p>
                                    <button class="btn btn-primary" data-page="planner">
                                        <i data-lucide="plus"></i>
                                        Plan & Book a Trip
                                    </button>
                                </div>
                            `}
                        </div>
                    </div>
                    
                    <!-- Settings Tab -->
                    <div class="tab-panel hidden" id="settings-panel">
                        <div class="space-y-6">
                            <div class="card animate-fade-in-up">
                                <h2 class="mb-6">Account Settings</h2>
                                
                                <form id="settings-form" class="space-y-6">
                                    <div class="grid grid-cols-2 gap-4">
                                        <div>
                                            <label for="setting-name" class="block text-sm font-medium mb-2">Full Name</label>
                                            <input type="text" id="setting-name" name="name" class="input" value="${user.name || ''}">
                                        </div>
                                        <div>
                                            <label for="setting-email" class="block text-sm font-medium mb-2">Email Address</label>
                                            <input type="email" id="setting-email" name="email" class="input" value="${user.email || ''}" readonly>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label for="setting-phone" class="block text-sm font-medium mb-2">Phone Number</label>
                                        <input type="tel" id="setting-phone" name="phone" class="input" value="${user.phone || ''}">
                                    </div>
                                    
                                    <div>
                                        <label for="setting-bio" class="block text-sm font-medium mb-2">Bio</label>
                                        <textarea id="setting-bio" name="bio" class="input" rows="3" placeholder="Tell us about yourself...">${user.bio || ''}</textarea>
                                    </div>
                                    
                                    <button type="submit" class="btn btn-primary">
                                        <i data-lucide="save"></i>
                                        Save Changes
                                    </button>
                                </form>
                            </div>
                            
                            <div class="card animate-fade-in-up" style="animation-delay: 0.1s">
                                <h2 class="mb-6">Preferences</h2>
                                
                                <div class="space-y-4">
                                    <div class="flex items-center justify-between">
                                        <div>
                                            <div class="font-medium">Email Notifications</div>
                                            <div class="text-sm text-muted">Receive email updates about your trips</div>
                                        </div>
                                        <label class="switch">
                                            <input type="checkbox" id="email-notifications" checked>
                                            <span class="slider"></span>
                                        </label>
                                    </div>
                                    
                                    <div class="flex items-center justify-between">
                                        <div>
                                            <div class="font-medium">Marketing Emails</div>
                                            <div class="text-sm text-muted">Receive promotional offers and deals</div>
                                        </div>
                                        <label class="switch">
                                            <input type="checkbox" id="marketing-emails">
                                            <span class="slider"></span>
                                        </label>
                                    </div>
                                    
                                    <div class="flex items-center justify-between">
                                        <div>
                                            <div class="font-medium">Dark Mode</div>
                                            <div class="text-sm text-muted">Use dark theme</div>
                                        </div>
                                        <label class="switch">
                                            <input type="checkbox" id="dark-mode-setting" ${AppState.isDarkMode ? 'checked' : ''}>
                                            <span class="slider"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="card animate-fade-in-up" style="animation-delay: 0.2s">
                                <h2 class="mb-6">Danger Zone</h2>
                                
                                <div class="space-y-4">
                                    <button class="btn btn-secondary w-full" id="clear-data-btn">
                                        <i data-lucide="trash-2"></i>
                                        Clear All Data
                                    </button>
                                    
                                    <button class="btn btn-destructive w-full" id="delete-account-btn">
                                        <i data-lucide="user-x"></i>
                                        Delete Account
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function initializeProfilePage() {
    const mainContent = $('#main-content');
    
    function renderProfilePage() {
        mainContent.innerHTML = createProfilePage();
        
        // Re-initialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        addProfileEventListeners();
        addProfileStyles();
    }
    
    function addProfileEventListeners() {
        // Navigation buttons
        $$('[data-page]').forEach(button => {
            addEvent(button, 'click', (e) => {
                e.preventDefault();
                const page = button.getAttribute('data-page');
                AppState.navigateTo(page);
            });
        });
        
        // Tab navigation
        $$('.tab-button').forEach(button => {
            addEvent(button, 'click', () => {
                const tab = button.getAttribute('data-tab');
                switchTab(tab);
            });
        });
        
        // Settings form
        const settingsForm = $('#settings-form');
        if (settingsForm) {
            addEvent(settingsForm, 'submit', handleSettingsSubmit);
        }
        
        // Trip actions
        $$('.view-trip-btn').forEach(button => {
            addEvent(button, 'click', () => {
                const tripId = button.getAttribute('data-trip-id');
                viewTrip(tripId);
            });
        });
        
        $$('.edit-trip-btn').forEach(button => {
            addEvent(button, 'click', () => {
                const tripId = button.getAttribute('data-trip-id');
                editTrip(tripId);
            });
        });
        
        $$('.delete-trip-btn').forEach(button => {
            addEvent(button, 'click', () => {
                const tripId = button.getAttribute('data-trip-id');
                deleteTrip(tripId);
            });
        });
        
        // Booking actions
        $$('.view-booking-btn').forEach(button => {
            addEvent(button, 'click', () => {
                const bookingId = button.getAttribute('data-booking-id');
                viewBooking(bookingId);
            });
        });
        
        $$('.download-booking-btn').forEach(button => {
            addEvent(button, 'click', () => {
                const bookingId = button.getAttribute('data-booking-id');
                downloadBookingTicket(bookingId);
            });
        });
        
        $$('.cancel-booking-btn').forEach(button => {
            addEvent(button, 'click', () => {
                const bookingId = button.getAttribute('data-booking-id');
                cancelBooking(bookingId);
            });
        });
        
        // Settings toggles
        const darkModeToggle = $('#dark-mode-setting');
        if (darkModeToggle) {
            addEvent(darkModeToggle, 'change', () => {
                if (darkModeToggle.checked !== AppState.isDarkMode) {
                    AppState.toggleTheme();
                }
            });
        }
        
        // Danger zone actions
        addEvent($('#clear-data-btn'), 'click', clearAllData);
        addEvent($('#delete-account-btn'), 'click', deleteAccount);
    }
    
    function switchTab(tabName) {
        // Remove active class from all tabs and panels
        $$('.tab-button').forEach(tab => tab.classList.remove('active'));
        $$('.tab-panel').forEach(panel => panel.classList.add('hidden'));
        
        // Add active class to selected tab and panel
        const tabButton = $(`.tab-button[data-tab="${tabName}"]`);
        const tabPanel = $(`#${tabName}-panel`);
        
        if (tabButton) tabButton.classList.add('active');
        if (tabPanel) {
            tabPanel.classList.remove('hidden');
            tabPanel.classList.add('animate-fade-in-up');
        }
    }
    
    function handleSettingsSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const settingsData = Object.fromEntries(formData.entries());
        
        // Update user profile
        UserData.updateProfile(settingsData);
        
        showNotification('Settings saved successfully!', 'success');
        
        // Re-render to show updated data
        renderProfilePage();
    }
    
    function viewTrip(tripId) {
        const savedTrips = UserData.getSavedTrips();
        const trip = savedTrips.find(t => t.id === tripId);
        
        if (trip) {
            AppState.setTripData(trip);
            AppState.navigateTo('timeline');
        }
    }
    
    function editTrip(tripId) {
        const savedTrips = UserData.getSavedTrips();
        const trip = savedTrips.find(t => t.id === tripId);
        
        if (trip) {
            AppState.setTripData(trip);
            AppState.navigateTo('planner');
        }
    }
    
    function deleteTrip(tripId) {
        if (confirm('Are you sure you want to delete this trip plan? This action cannot be undone.')) {
            const savedTrips = UserData.getSavedTrips();
            const updatedTrips = savedTrips.filter(t => t.id !== tripId);
            setStorage('travelExplorerSavedTrips', updatedTrips);
            
            showNotification('Trip deleted successfully!', 'success');
            renderProfilePage();
        }
    }
    
    function viewBooking(bookingId) {
        const savedBookings = UserData.getSavedBookings();
        const booking = savedBookings.find(b => b.id === bookingId);
        
        if (booking) {
            // Create a modal with booking details
            const modal = createBookingModal(booking);
            showBookingModal(modal);
        }
    }
    
    function downloadBookingTicket(bookingId) {
        const savedBookings = UserData.getSavedBookings();
        const booking = savedBookings.find(b => b.id === bookingId);
        
        if (booking && booking.tripData) {
            const ticketContent = generateTicketContent(booking);
            
            const blob = new Blob([ticketContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = createElement('a');
            a.href = url;
            a.download = `ticket_${booking.id}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            showNotification('Ticket downloaded successfully!', 'success');
        }
    }
    
    function cancelBooking(bookingId) {
        if (confirm('Are you sure you want to cancel this booking? Cancellation fees may apply.')) {
            const savedBookings = UserData.getSavedBookings();
            const booking = savedBookings.find(b => b.id === bookingId);
            
            if (booking) {
                booking.status = 'cancelled';
                booking.cancelledAt = new Date().toISOString();
                setStorage('travelExplorerBookings', savedBookings);
                
                showNotification('Booking cancelled successfully!', 'success');
                renderProfilePage();
            }
        }
    }
    
    function clearAllData() {
        if (confirm('Are you sure you want to clear all your data? This will remove all saved trips, bookings, and preferences. This action cannot be undone.')) {
            removeStorage('travelExplorerSavedTrips');
            removeStorage('travelExplorerBookings');
            removeStorage('travelExplorerCurrentTrip');
            
            showNotification('All data cleared successfully!', 'success');
            renderProfilePage();
        }
    }
    
    function deleteAccount() {
        if (confirm('Are you sure you want to delete your account? This will permanently remove all your data and cannot be undone.')) {
            // Clear all user data
            removeStorage('travelExplorerAuth');
            removeStorage('travelExplorerUser');
            removeStorage('travelExplorerSavedTrips');
            removeStorage('travelExplorerBookings');
            removeStorage('travelExplorerCurrentTrip');
            
            // Log out user
            AppState.logout();
            
            showNotification('Account deleted successfully!', 'success');
        }
    }
    
    function calculateTripDuration(trip) {
        const startDate = new Date(trip.startDate);
        const endDate = new Date(trip.endDate);
        return Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    }
    
    function calculateTotalSpent(bookings) {
        const total = bookings.reduce((sum, booking) => {
            return sum + (booking.paymentInfo?.amount || 0);
        }, 0);
        return `$${total.toLocaleString()}`;
    }
    
    function getUniqueDestinations(trips, bookings) {
        const destinations = new Set();
        
        trips.forEach(trip => {
            if (trip.destination) destinations.add(trip.destination);
        });
        
        bookings.forEach(booking => {
            if (booking.tripData?.destination) destinations.add(booking.tripData.destination);
        });
        
        return Array.from(destinations);
    }
    
    function getRecentActivity(trips, bookings) {
        const activities = [];
        
        trips.slice(-3).forEach(trip => {
            activities.push({
                icon: 'map',
                title: `Created trip plan for ${trip.destination}`,
                date: formatDate(trip.savedAt || trip.createdAt)
            });
        });
        
        bookings.slice(-3).forEach(booking => {
            activities.push({
                icon: 'ticket',
                title: `Booked trip to ${booking.tripData?.destination || 'destination'}`,
                date: formatDate(booking.bookedAt)
            });
        });
        
        return activities.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
    }
    
    function createBookingModal(booking) {
        return `
            <div class="modal-overlay" id="booking-modal-overlay">
                <div class="modal-content animate-fade-in">
                    <div class="modal-header">
                        <h3>Booking Details</h3>
                        <button class="modal-close" id="booking-modal-close">
                            <i data-lucide="x"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="space-y-4">
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <div class="text-sm text-muted">Booking ID</div>
                                    <div class="font-medium">${booking.id}</div>
                                </div>
                                <div>
                                    <div class="text-sm text-muted">Status</div>
                                    <div class="font-medium ${booking.status === 'confirmed' ? 'text-accent' : 'text-destructive'}">${booking.status?.toUpperCase()}</div>
                                </div>
                            </div>
                            
                            <div>
                                <div class="text-sm text-muted">Destination</div>
                                <div class="font-medium">${booking.tripData?.destination || 'N/A'}</div>
                            </div>
                            
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <div class="text-sm text-muted">Check-in</div>
                                    <div class="font-medium">${booking.tripData ? formatDate(booking.tripData.startDate) : 'N/A'}</div>
                                </div>
                                <div>
                                    <div class="text-sm text-muted">Check-out</div>
                                    <div class="font-medium">${booking.tripData ? formatDate(booking.tripData.endDate) : 'N/A'}</div>
                                </div>
                            </div>
                            
                            <div>
                                <div class="text-sm text-muted">Total Amount</div>
                                <div class="font-bold text-primary text-lg">$${booking.paymentInfo?.amount || 'N/A'}</div>
                            </div>
                            
                            ${booking.travelerInfo ? `
                                <div>
                                    <div class="text-sm text-muted">Traveler Information</div>
                                    <div class="font-medium">${booking.travelerInfo.firstName} ${booking.travelerInfo.lastName}</div>
                                    <div class="text-sm">${booking.travelerInfo.email}</div>
                                </div>
                            ` : ''}
                        </div>
                        
                        <div class="flex gap-2 justify-end mt-6">
                            <button class="btn btn-secondary" id="close-booking-modal">Close</button>
                            <button class="btn btn-primary" onclick="downloadBookingTicket('${booking.id}')">
                                <i data-lucide="download"></i>
                                Download Ticket
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    function showBookingModal(modalHtml) {
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        
        // Re-initialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        // Add close functionality
        addEvent($('#booking-modal-close'), 'click', closeBookingModal);
        addEvent($('#close-booking-modal'), 'click', closeBookingModal);
        addEvent($('#booking-modal-overlay'), 'click', (e) => {
            if (e.target.id === 'booking-modal-overlay') {
                closeBookingModal();
            }
        });
    }
    
    function closeBookingModal() {
        const modal = $('#booking-modal-overlay');
        if (modal) {
            modal.remove();
        }
    }
    
    function generateTicketContent(booking) {
        return `
╔══════════════════════════════════════════════════════════════╗
║                       TRAVEL TICKET                          ║
║                     Travel Explorer                          ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║ Booking Reference: ${booking.id.padEnd(40, ' ')} ║
║ Destination: ${(booking.tripData?.destination || 'N/A').padEnd(46, ' ')} ║
║ Status: ${(booking.status?.toUpperCase() || 'N/A').padEnd(55, ' ')} ║
║ Amount: $${(booking.paymentInfo?.amount || 'N/A').toString().padEnd(51, ' ')} ║
║                                                              ║
║ Booked: ${formatDate(booking.bookedAt).padEnd(53, ' ')} ║
║                                                              ║
║ Thank you for choosing Travel Explorer!                     ║
╚══════════════════════════════════════════════════════════════╝
        `.trim();
    }
    
    function addProfileStyles() {
        if (!$('#profile-styles')) {
            const styles = createElement('style', '', `
                .profile-tabs {
                    display: flex;
                    border-bottom: 1px solid var(--border);
                }
                
                .tab-button {
                    padding: 1rem 1.5rem;
                    background: none;
                    border: none;
                    color: var(--muted-foreground);
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border-bottom: 2px solid transparent;
                }
                
                .tab-button:hover {
                    color: var(--foreground);
                    background-color: var(--secondary);
                }
                
                .tab-button.active {
                    color: var(--accent);
                    border-bottom-color: var(--accent);
                }
                
                .tab-content {
                    margin-top: 2rem;
                }
                
                .tab-panel {
                    display: block;
                }
                
                .tab-panel.hidden {
                    display: none;
                }
                
                .switch {
                    position: relative;
                    display: inline-block;
                    width: 50px;
                    height: 24px;
                }
                
                .switch input {
                    opacity: 0;
                    width: 0;
                    height: 0;
                }
                
                .slider {
                    position: absolute;
                    cursor: pointer;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: var(--muted);
                    transition: 0.3s;
                    border-radius: 24px;
                }
                
                .slider:before {
                    position: absolute;
                    content: "";
                    height: 18px;
                    width: 18px;
                    left: 3px;
                    bottom: 3px;
                    background-color: white;
                    transition: 0.3s;
                    border-radius: 50%;
                }
                
                input:checked + .slider {
                    background-color: var(--accent);
                }
                
                input:checked + .slider:before {
                    transform: translateX(26px);
                }
                
                .btn-destructive {
                    background-color: var(--destructive);
                    color: var(--destructive-foreground);
                }
                
                .btn-destructive:hover {
                    background-color: #b91c3c;
                }
            `);
            styles.id = 'profile-styles';
            document.head.appendChild(styles);
        }
    }
    
    // Only render if we're on the profile page
    if (AppState.currentPage === 'profile') {
        renderProfilePage();
    }
}