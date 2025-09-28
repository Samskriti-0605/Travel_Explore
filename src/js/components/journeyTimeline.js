// Journey Timeline component

function createJourneyTimeline() {
    const { currentTripData } = AppState;
    
    if (!currentTripData) {
        return `
            <div class="container py-12">
                <div class="max-w-4xl mx-auto text-center">
                    <div class="animate-fade-in-up">
                        <i data-lucide="calendar-x" size="64" class="text-muted mx-auto mb-4"></i>
                        <h2>No Trip Planned</h2>
                        <p class="text-muted mb-6">You haven't planned any trips yet. Start by creating your first itinerary!</p>
                        <button class="btn btn-primary" data-page="planner">
                            <i data-lucide="plus"></i>
                            Plan a Trip
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    return `
        <div class="container py-12">
            <div class="max-w-4xl mx-auto">
                <div class="text-center mb-12 animate-fade-in-up">
                    <h1>Journey Timeline</h1>
                    <p class="text-muted">Your day-by-day travel itinerary for ${currentTripData.destination}</p>
                </div>
                
                <!-- Trip Overview -->
                <div class="card mb-8 animate-fade-in-up">
                    <div class="grid grid-cols-3 gap-6">
                        <div class="text-center">
                            <i data-lucide="map-pin" size="24" class="text-accent mx-auto mb-2"></i>
                            <div class="font-medium">${currentTripData.destination}</div>
                            <div class="text-sm text-muted">Destination</div>
                        </div>
                        <div class="text-center">
                            <i data-lucide="calendar" size="24" class="text-accent mx-auto mb-2"></i>
                            <div class="font-medium">${calculateTripDuration(currentTripData)} days</div>
                            <div class="text-sm text-muted">${formatDate(currentTripData.startDate)} - ${formatDate(currentTripData.endDate)}</div>
                        </div>
                        <div class="text-center">
                            <i data-lucide="users" size="24" class="text-accent mx-auto mb-2"></i>
                            <div class="font-medium">${currentTripData.travelers} ${parseInt(currentTripData.travelers) === 1 ? 'traveler' : 'travelers'}</div>
                            <div class="text-sm text-muted">Group size</div>
                        </div>
                    </div>
                </div>
                
                <!-- Timeline -->
                <div class="timeline animate-fade-in-up" style="animation-delay: 0.2s">
                    ${currentTripData.itinerary.map((day, index) => `
                        <div class="timeline-item" style="animation-delay: ${0.3 + index * 0.1}s">
                            <div class="card hover-scale">
                                <div class="flex items-center justify-between mb-4">
                                    <h3>Day ${day.day} - ${formatDate(day.date)}</h3>
                                    <div class="flex gap-2">
                                        <button class="btn btn-secondary btn-sm edit-day-btn" data-day="${day.day}">
                                            <i data-lucide="edit-2" size="14"></i>
                                            Edit
                                        </button>
                                        <button class="btn btn-secondary btn-sm weather-btn" data-day="${day.day}">
                                            <i data-lucide="cloud-sun" size="14"></i>
                                            Weather
                                        </button>
                                    </div>
                                </div>
                                
                                <div class="space-y-3">
                                    ${day.activities.map((activity, actIndex) => `
                                        <div class="flex items-center gap-3 p-3 bg-secondary rounded">
                                            <div class="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white text-sm font-medium">
                                                ${actIndex + 1}
                                            </div>
                                            <div class="flex-1">
                                                <div class="font-medium">${activity}</div>
                                                <div class="text-sm text-muted">${generateActivityTime(actIndex)}</div>
                                            </div>
                                            <div class="flex gap-1">
                                                <button class="btn btn-secondary btn-sm map-btn" data-activity="${activity}">
                                                    <i data-lucide="map" size="12"></i>
                                                </button>
                                                <button class="btn btn-secondary btn-sm notes-btn" data-day="${day.day}" data-activity="${actIndex}">
                                                    <i data-lucide="sticky-note" size="12"></i>
                                                </button>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                                
                                <!-- Add Activity Button -->
                                <div class="mt-4 pt-4 border-t">
                                    <button class="btn btn-secondary btn-sm add-activity-btn" data-day="${day.day}">
                                        <i data-lucide="plus" size="14"></i>
                                        Add Activity
                                    </button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <!-- Action Buttons -->
                <div class="text-center mt-12 animate-fade-in-up" style="animation-delay: 0.5s">
                    <div class="flex gap-4 justify-center">
                        <button class="btn btn-secondary" id="export-timeline-btn">
                            <i data-lucide="download"></i>
                            Export Timeline
                        </button>
                        <button class="btn btn-accent" id="share-timeline-btn">
                            <i data-lucide="share-2"></i>
                            Share Timeline
                        </button>
                        <button class="btn btn-primary" data-page="booking">
                            <i data-lucide="credit-card"></i>
                            Book This Trip
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Modals will be inserted here -->
        <div id="modal-container"></div>
    `;
}

function initializeJourneyTimeline() {
    const mainContent = $('#main-content');
    
    function renderJourneyTimeline() {
        mainContent.innerHTML = createJourneyTimeline();
        
        // Re-initialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        addTimelineEventListeners();
    }
    
    function addTimelineEventListeners() {
        // Navigation buttons
        $$('[data-page]').forEach(button => {
            addEvent(button, 'click', (e) => {
                e.preventDefault();
                const page = button.getAttribute('data-page');
                AppState.navigateTo(page);
            });
        });
        
        // Edit day buttons
        $$('.edit-day-btn').forEach(button => {
            addEvent(button, 'click', () => {
                const day = button.getAttribute('data-day');
                openEditDayModal(day);
            });
        });
        
        // Weather buttons
        $$('.weather-btn').forEach(button => {
            addEvent(button, 'click', () => {
                const day = button.getAttribute('data-day');
                showWeatherInfo(day);
            });
        });
        
        // Map buttons
        $$('.map-btn').forEach(button => {
            addEvent(button, 'click', () => {
                const activity = button.getAttribute('data-activity');
                showActivityMap(activity);
            });
        });
        
        // Notes buttons
        $$('.notes-btn').forEach(button => {
            addEvent(button, 'click', () => {
                const day = button.getAttribute('data-day');
                const activity = button.getAttribute('data-activity');
                openNotesModal(day, activity);
            });
        });
        
        // Add activity buttons
        $$('.add-activity-btn').forEach(button => {
            addEvent(button, 'click', () => {
                const day = button.getAttribute('data-day');
                openAddActivityModal(day);
            });
        });
        
        // Export timeline
        const exportBtn = $('#export-timeline-btn');
        if (exportBtn) {
            addEvent(exportBtn, 'click', exportTimeline);
        }
        
        // Share timeline
        const shareBtn = $('#share-timeline-btn');
        if (shareBtn) {
            addEvent(shareBtn, 'click', shareTimeline);
        }
    }
    
    function calculateTripDuration(tripData) {
        const startDate = new Date(tripData.startDate);
        const endDate = new Date(tripData.endDate);
        return Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    }
    
    function generateActivityTime(index) {
        const baseTimes = ['9:00 AM', '1:00 PM', '6:00 PM'];
        return baseTimes[index] || `${9 + index * 2}:00 ${index * 2 < 3 ? 'AM' : 'PM'}`;
    }
    
    function openEditDayModal(day) {
        const modal = createModal('Edit Day ' + day, `
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium mb-2">Activities for Day ${day}</label>
                    <div id="edit-activities-list">
                        <!-- Activities will be populated here -->
                    </div>
                    <button class="btn btn-secondary btn-sm mt-2" id="add-edit-activity">
                        <i data-lucide="plus" size="14"></i>
                        Add Activity
                    </button>
                </div>
                <div class="flex gap-2 justify-end">
                    <button class="btn btn-secondary" id="cancel-edit">Cancel</button>
                    <button class="btn btn-primary" id="save-edit">Save Changes</button>
                </div>
            </div>
        `);
        
        showModal(modal);
        populateEditActivities(day);
    }
    
    function populateEditActivities(day) {
        const { currentTripData } = AppState;
        const dayData = currentTripData.itinerary.find(d => d.day == day);
        const container = $('#edit-activities-list');
        
        if (!container || !dayData) return;
        
        container.innerHTML = dayData.activities.map((activity, index) => `
            <div class="flex gap-2 mb-2 edit-activity-item">
                <input type="text" class="input flex-1" value="${activity}" data-index="${index}">
                <button class="btn btn-secondary btn-sm remove-activity" data-index="${index}">
                    <i data-lucide="trash-2" size="14"></i>
                </button>
            </div>
        `).join('');
        
        // Re-initialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        // Add event listeners for remove buttons
        $$('.remove-activity').forEach(button => {
            addEvent(button, 'click', () => {
                button.closest('.edit-activity-item').remove();
            });
        });
        
        // Add activity button
        addEvent($('#add-edit-activity'), 'click', () => {
            const newActivityHtml = `
                <div class="flex gap-2 mb-2 edit-activity-item">
                    <input type="text" class="input flex-1" placeholder="Enter activity" data-index="new">
                    <button class="btn btn-secondary btn-sm remove-activity" data-index="new">
                        <i data-lucide="trash-2" size="14"></i>
                    </button>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', newActivityHtml);
            
            // Re-initialize icons and event listeners
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
            
            const newRemoveBtn = container.querySelector('.edit-activity-item:last-child .remove-activity');
            addEvent(newRemoveBtn, 'click', () => {
                newRemoveBtn.closest('.edit-activity-item').remove();
            });
        });
        
        // Save changes
        addEvent($('#save-edit'), 'click', () => {
            const activities = Array.from($$('#edit-activities-list input')).map(input => input.value.trim()).filter(val => val);
            
            if (activities.length === 0) {
                showNotification('Please add at least one activity', 'error');
                return;
            }
            
            // Update trip data
            dayData.activities = activities;
            AppState.setTripData(currentTripData);
            
            closeModal();
            showNotification('Day updated successfully!', 'success');
            renderJourneyTimeline();
        });
        
        // Cancel edit
        addEvent($('#cancel-edit'), 'click', closeModal);
    }
    
    async function showWeatherInfo(day) {
        const { currentTripData } = AppState;
        const dayData = currentTripData.itinerary.find(d => d.day == day);
        
        try {
            const weatherData = await fetchWeatherData(currentTripData.destination);
            
            const modal = createModal(`Weather for Day ${day}`, `
                <div class="text-center">
                    <div class="weather-card mb-4">
                        <div class="text-3xl font-bold mb-2">${Math.round(weatherData.main.temp)}°C</div>
                        <div class="text-lg mb-2">${weatherData.weather[0].main}</div>
                        <div class="text-sm opacity-90">Feels like ${Math.round(weatherData.main.feels_like)}°C</div>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <div class="font-medium">Humidity</div>
                            <div>${weatherData.main.humidity}%</div>
                        </div>
                        <div>
                            <div class="font-medium">Wind Speed</div>
                            <div>${weatherData.wind.speed} m/s</div>
                        </div>
                    </div>
                    
                    <button class="btn btn-primary mt-4" id="close-weather">Close</button>
                </div>
            `);
            
            showModal(modal);
            addEvent($('#close-weather'), 'click', closeModal);
        } catch (error) {
            showNotification('Unable to fetch weather data', 'error');
        }
    }
    
    function showActivityMap(activity) {
        const modal = createModal('Activity Location', `
            <div class="text-center">
                <div class="bg-secondary rounded-lg p-8 mb-4">
                    <i data-lucide="map-pin" size="48" class="text-accent mx-auto mb-4"></i>
                    <h3>${activity}</h3>
                    <p class="text-muted">Interactive map would be displayed here</p>
                    <div class="text-sm text-muted mt-4">
                        In a real implementation, this would show:<br>
                        • Interactive map with location markers<br>
                        • Nearby restaurants and amenities<br>
                        • Transportation options<br>
                        • User reviews and ratings
                    </div>
                </div>
                <button class="btn btn-primary" id="close-map">Close</button>
            </div>
        `);
        
        showModal(modal);
        
        // Re-initialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        addEvent($('#close-map'), 'click', closeModal);
    }
    
    function openNotesModal(day, activityIndex) {
        const notesKey = `timeline-notes-${day}-${activityIndex}`;
        const existingNotes = getStorage(notesKey, '');
        
        const modal = createModal('Activity Notes', `
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium mb-2">Add your notes for this activity</label>
                    <textarea 
                        id="activity-notes" 
                        class="input" 
                        rows="4" 
                        placeholder="Enter your thoughts, tips, or reminders..."
                    >${existingNotes}</textarea>
                </div>
                <div class="flex gap-2 justify-end">
                    <button class="btn btn-secondary" id="cancel-notes">Cancel</button>
                    <button class="btn btn-primary" id="save-notes">Save Notes</button>
                </div>
            </div>
        `);
        
        showModal(modal);
        
        addEvent($('#save-notes'), 'click', () => {
            const notes = $('#activity-notes').value;
            setStorage(notesKey, notes);
            closeModal();
            showNotification('Notes saved successfully!', 'success');
        });
        
        addEvent($('#cancel-notes'), 'click', closeModal);
    }
    
    function openAddActivityModal(day) {
        const modal = createModal('Add Activity', `
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium mb-2">Activity Name</label>
                    <input type="text" id="new-activity-name" class="input" placeholder="Enter activity name">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Time</label>
                    <input type="time" id="new-activity-time" class="input">
                </div>
                <div class="flex gap-2 justify-end">
                    <button class="btn btn-secondary" id="cancel-add">Cancel</button>
                    <button class="btn btn-primary" id="save-add">Add Activity</button>
                </div>
            </div>
        `);
        
        showModal(modal);
        
        addEvent($('#save-add'), 'click', () => {
            const activityName = $('#new-activity-name').value.trim();
            
            if (!activityName) {
                showNotification('Please enter an activity name', 'error');
                return;
            }
            
            // Add activity to trip data
            const { currentTripData } = AppState;
            const dayData = currentTripData.itinerary.find(d => d.day == day);
            
            if (dayData) {
                dayData.activities.push(activityName);
                AppState.setTripData(currentTripData);
                
                closeModal();
                showNotification('Activity added successfully!', 'success');
                renderJourneyTimeline();
            }
        });
        
        addEvent($('#cancel-add'), 'click', closeModal);
    }
    
    function createModal(title, content) {
        return `
            <div class="modal-overlay" id="modal-overlay">
                <div class="modal-content animate-fade-in">
                    <div class="modal-header">
                        <h3>${title}</h3>
                        <button class="modal-close" id="modal-close">
                            <i data-lucide="x"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        ${content}
                    </div>
                </div>
            </div>
        `;
    }
    
    function showModal(modalHtml) {
        const modalContainer = $('#modal-container');
        modalContainer.innerHTML = modalHtml;
        
        // Re-initialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        // Add close functionality
        addEvent($('#modal-close'), 'click', closeModal);
        addEvent($('#modal-overlay'), 'click', (e) => {
            if (e.target.id === 'modal-overlay') {
                closeModal();
            }
        });
        
        // Add modal styles
        if (!$('#modal-styles')) {
            const styles = createElement('style', '', `
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                }
                
                .modal-content {
                    background: var(--card);
                    border-radius: var(--radius);
                    max-width: 500px;
                    width: 90%;
                    max-height: 80vh;
                    overflow-y: auto;
                }
                
                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1.5rem 1.5rem 0;
                    border-bottom: 1px solid var(--border);
                    margin-bottom: 1.5rem;
                    padding-bottom: 1rem;
                }
                
                .modal-close {
                    background: none;
                    border: none;
                    color: var(--foreground);
                    cursor: pointer;
                    padding: 0.25rem;
                }
                
                .modal-body {
                    padding: 0 1.5rem 1.5rem;
                }
                
                .btn-sm {
                    padding: 0.25rem 0.5rem;
                    font-size: 0.75rem;
                }
            `);
            styles.id = 'modal-styles';
            document.head.appendChild(styles);
        }
    }
    
    function closeModal() {
        const modalContainer = $('#modal-container');
        if (modalContainer) {
            modalContainer.innerHTML = '';
        }
    }
    
    function exportTimeline() {
        const { currentTripData } = AppState;
        
        // Create exportable content
        const exportContent = `
TRAVEL ITINERARY - ${currentTripData.destination}
Date: ${formatDate(currentTripData.startDate)} - ${formatDate(currentTripData.endDate)}
Travelers: ${currentTripData.travelers}

${currentTripData.itinerary.map(day => `
DAY ${day.day} - ${formatDate(day.date)}
${day.activities.map((activity, index) => `  ${index + 1}. ${activity}`).join('\n')}
`).join('\n')}

Generated by Travel Explorer
        `.trim();
        
        // Create and download file
        const blob = new Blob([exportContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = createElement('a');
        a.href = url;
        a.download = `${currentTripData.destination.replace(/[^a-z0-9]/gi, '_')}_itinerary.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showNotification('Timeline exported successfully!', 'success');
    }
    
    function shareTimeline() {
        const { currentTripData } = AppState;
        
        const shareText = `Check out my upcoming trip to ${currentTripData.destination}! ${calculateTripDuration(currentTripData)} days of adventure from ${formatDate(currentTripData.startDate)} to ${formatDate(currentTripData.endDate)}.`;
        
        if (navigator.share) {
            navigator.share({
                title: `Trip to ${currentTripData.destination}`,
                text: shareText,
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(shareText).then(() => {
                showNotification('Trip details copied to clipboard!', 'success');
            }).catch(() => {
                showNotification('Unable to share timeline', 'error');
            });
        }
    }
    
    // Only render if we're on the timeline page
    if (AppState.currentPage === 'timeline') {
        renderJourneyTimeline();
    }
}