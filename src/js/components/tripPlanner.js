// Trip Planner component

function createTripPlanner() {
    return `
        <div class="container py-12">
            <div class="max-w-4xl mx-auto">
                <div class="text-center mb-12 animate-fade-in-up">
                    <h1>Plan Your Perfect Trip</h1>
                    <p class="text-muted">Tell us about your dream destination and we'll create a personalized itinerary</p>
                </div>
                
                <div class="grid grid-cols-2 gap-8">
                    <!-- Trip Planning Form -->
                    <div class="card animate-fade-in-up">
                        <h2 class="mb-6">Trip Details</h2>
                        
                        <form id="trip-form" class="space-y-6">
                            <div>
                                <label for="destination" class="block text-sm font-medium mb-2">Destination</label>
                                <input 
                                    type="text" 
                                    id="destination" 
                                    name="destination" 
                                    class="input" 
                                    placeholder="Where do you want to go?"
                                    required
                                >
                            </div>
                            
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label for="startDate" class="block text-sm font-medium mb-2">Start Date</label>
                                    <input 
                                        type="date" 
                                        id="startDate" 
                                        name="startDate" 
                                        class="input"
                                        required
                                    >
                                </div>
                                <div>
                                    <label for="endDate" class="block text-sm font-medium mb-2">End Date</label>
                                    <input 
                                        type="date" 
                                        id="endDate" 
                                        name="endDate" 
                                        class="input"
                                        required
                                    >
                                </div>
                            </div>
                            
                            <div>
                                <label for="travelers" class="block text-sm font-medium mb-2">Number of Travelers</label>
                                <select id="travelers" name="travelers" class="select">
                                    <option value="1">1 Traveler</option>
                                    <option value="2">2 Travelers</option>
                                    <option value="3">3 Travelers</option>
                                    <option value="4">4 Travelers</option>
                                    <option value="5+">5+ Travelers</option>
                                </select>
                            </div>
                            
                            <div>
                                <label for="budget" class="block text-sm font-medium mb-2">Budget Range</label>
                                <select id="budget" name="budget" class="select">
                                    <option value="budget">Budget ($500 - $1,000)</option>
                                    <option value="moderate">Moderate ($1,000 - $3,000)</option>
                                    <option value="luxury">Luxury ($3,000+)</option>
                                </select>
                            </div>
                            
                            <div>
                                <label for="interests" class="block text-sm font-medium mb-2">Interests</label>
                                <div class="grid grid-cols-2 gap-2 mt-2">
                                    <label class="flex items-center">
                                        <input type="checkbox" name="interests" value="culture" class="mr-2">
                                        Culture & History
                                    </label>
                                    <label class="flex items-center">
                                        <input type="checkbox" name="interests" value="adventure" class="mr-2">
                                        Adventure
                                    </label>
                                    <label class="flex items-center">
                                        <input type="checkbox" name="interests" value="food" class="mr-2">
                                        Food & Dining
                                    </label>
                                    <label class="flex items-center">
                                        <input type="checkbox" name="interests" value="nature" class="mr-2">
                                        Nature
                                    </label>
                                    <label class="flex items-center">
                                        <input type="checkbox" name="interests" value="nightlife" class="mr-2">
                                        Nightlife
                                    </label>
                                    <label class="flex items-center">
                                        <input type="checkbox" name="interests" value="shopping" class="mr-2">
                                        Shopping
                                    </label>
                                </div>
                            </div>
                            
                            <button type="submit" class="btn btn-primary w-full">
                                <i data-lucide="map-pin"></i>
                                Generate Trip Plan
                            </button>
                        </form>
                    </div>
                    
                    <!-- Weather & Info Panel -->
                    <div class="space-y-6">
                        <div id="weather-card" class="hidden">
                            <!-- Weather data will be inserted here -->
                        </div>
                        
                        <div class="card animate-fade-in-up" style="animation-delay: 0.2s">
                            <h3 class="mb-4">Popular Destinations</h3>
                            <div class="space-y-3">
                                <div class="flex items-center justify-between p-3 rounded hover:bg-secondary cursor-pointer destination-suggestion" data-destination="Paris, France">
                                    <div>
                                        <div class="font-medium">Paris, France</div>
                                        <div class="text-sm text-muted">City of Light</div>
                                    </div>
                                    <i data-lucide="chevron-right" size="16"></i>
                                </div>
                                <div class="flex items-center justify-between p-3 rounded hover:bg-secondary cursor-pointer destination-suggestion" data-destination="Tokyo, Japan">
                                    <div>
                                        <div class="font-medium">Tokyo, Japan</div>
                                        <div class="text-sm text-muted">Modern metropolis</div>
                                    </div>
                                    <i data-lucide="chevron-right" size="16"></i>
                                </div>
                                <div class="flex items-center justify-between p-3 rounded hover:bg-secondary cursor-pointer destination-suggestion" data-destination="Santorini, Greece">
                                    <div>
                                        <div class="font-medium">Santorini, Greece</div>
                                        <div class="text-sm text-muted">Island paradise</div>
                                    </div>
                                    <i data-lucide="chevron-right" size="16"></i>
                                </div>
                                <div class="flex items-center justify-between p-3 rounded hover:bg-secondary cursor-pointer destination-suggestion" data-destination="New York, USA">
                                    <div>
                                        <div class="font-medium">New York, USA</div>
                                        <div class="text-sm text-muted">The Big Apple</div>
                                    </div>
                                    <i data-lucide="chevron-right" size="16"></i>
                                </div>
                            </div>
                        </div>
                        
                        <div class="card animate-fade-in-up" style="animation-delay: 0.3s">
                            <h3 class="mb-4">Travel Tips</h3>
                            <div class="space-y-3 text-sm">
                                <div class="flex items-start gap-2">
                                    <i data-lucide="check-circle" size="16" class="text-accent mt-1"></i>
                                    <div>Book flights 2-3 months in advance for best prices</div>
                                </div>
                                <div class="flex items-start gap-2">
                                    <i data-lucide="check-circle" size="16" class="text-accent mt-1"></i>
                                    <div>Check visa requirements early</div>
                                </div>
                                <div class="flex items-start gap-2">
                                    <i data-lucide="check-circle" size="16" class="text-accent mt-1"></i>
                                    <div>Consider travel insurance for international trips</div>
                                </div>
                                <div class="flex items-start gap-2">
                                    <i data-lucide="check-circle" size="16" class="text-accent mt-1"></i>
                                    <div>Pack light and leave room for souvenirs</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Generated Trip Plan -->
                <div id="trip-plan-results" class="hidden mt-12">
                    <!-- Trip plan will be inserted here -->
                </div>
            </div>
        </div>
    `;
}

function initializeTripPlanner() {
    const mainContent = $('#main-content');
    
    function renderTripPlanner() {
        mainContent.innerHTML = createTripPlanner();
        
        // Re-initialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        const startDateInput = $('#startDate');
        const endDateInput = $('#endDate');
        if (startDateInput) startDateInput.min = today;
        if (endDateInput) endDateInput.min = today;
        
        addTripPlannerEventListeners();
    }
    
    function addTripPlannerEventListeners() {
        // Form submission
        const tripForm = $('#trip-form');
        if (tripForm) {
            addEvent(tripForm, 'submit', handleTripFormSubmit);
        }
        
        // Destination suggestions
        $$('.destination-suggestion').forEach(suggestion => {
            addEvent(suggestion, 'click', () => {
                const destination = suggestion.getAttribute('data-destination');
                const destinationInput = $('#destination');
                if (destinationInput) {
                    destinationInput.value = destination;
                    loadWeatherData(destination);
                }
            });
        });
        
        // Destination input change
        const destinationInput = $('#destination');
        if (destinationInput) {
            addEvent(destinationInput, 'input', debounce(() => {
                const destination = destinationInput.value.trim();
                if (destination.length > 3) {
                    loadWeatherData(destination);
                }
            }, 500));
        }
        
        // Date validation
        const startDateInput = $('#startDate');
        const endDateInput = $('#endDate');
        
        if (startDateInput) {
            addEvent(startDateInput, 'change', () => {
                if (endDateInput) {
                    endDateInput.min = startDateInput.value;
                    if (endDateInput.value && endDateInput.value < startDateInput.value) {
                        endDateInput.value = startDateInput.value;
                    }
                }
            });
        }
    }
    
    async function loadWeatherData(destination) {
        const weatherCard = $('#weather-card');
        if (!weatherCard) return;
        
        try {
            showLoading(weatherCard);
            weatherCard.classList.remove('hidden');
            
            const weatherData = await fetchWeatherData(destination);
            
            weatherCard.innerHTML = `
                <div class="weather-card">
                    <div class="flex items-center justify-between mb-4">
                        <h3>Weather in ${weatherData.name}</h3>
                        <i data-lucide="cloud-sun" size="24"></i>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <div class="text-2xl font-bold">${Math.round(weatherData.main.temp)}°C</div>
                            <div class="text-sm opacity-90">Feels like ${Math.round(weatherData.main.feels_like)}°C</div>
                        </div>
                        <div class="text-right">
                            <div class="font-medium">${weatherData.weather[0].main}</div>
                            <div class="text-sm opacity-90">Humidity: ${weatherData.main.humidity}%</div>
                        </div>
                    </div>
                </div>
            `;
            
            // Re-initialize Lucide icons
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        } catch (error) {
            weatherCard.innerHTML = `
                <div class="card">
                    <div class="text-center text-muted">
                        <i data-lucide="cloud-off" size="24" class="mx-auto mb-2"></i>
                        <div>Weather data unavailable</div>
                    </div>
                </div>
            `;
            
            // Re-initialize Lucide icons
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }
    }
    
    async function handleTripFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const tripData = Object.fromEntries(formData.entries());
        
        // Get selected interests
        const interests = Array.from($$('input[name="interests"]:checked')).map(cb => cb.value);
        tripData.interests = interests;
        
        // Validate form
        if (!tripData.destination || !tripData.startDate || !tripData.endDate) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        // Validate dates
        const startDate = new Date(tripData.startDate);
        const endDate = new Date(tripData.endDate);
        
        if (endDate <= startDate) {
            showNotification('End date must be after start date', 'error');
            return;
        }
        
        // Generate trip plan
        await generateTripPlan(tripData);
    }
    
    async function generateTripPlan(tripData) {
        const resultsContainer = $('#trip-plan-results');
        if (!resultsContainer) return;
        
        try {
            showLoading(resultsContainer);
            resultsContainer.classList.remove('hidden');
            
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Generate mock trip plan
            const tripPlan = generateMockTripPlan(tripData);
            
            // Save trip data to state
            AppState.setTripData(tripPlan);
            
            // Display trip plan
            displayTripPlan(tripPlan);
            
            showNotification('Trip plan generated successfully!', 'success');
        } catch (error) {
            showNotification('Error generating trip plan', 'error');
            resultsContainer.classList.add('hidden');
        }
    }
    
    function generateMockTripPlan(tripData) {
        const startDate = new Date(tripData.startDate);
        const endDate = new Date(tripData.endDate);
        const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
        
        const activities = {
            culture: ['Visit museums', 'Historical walking tour', 'Art gallery visit'],
            adventure: ['Hiking expedition', 'Zip-lining', 'Rock climbing'],
            food: ['Food tour', 'Cooking class', 'Local restaurant dining'],
            nature: ['National park visit', 'Wildlife watching', 'Beach time'],
            nightlife: ['Local bars', 'Night market', 'Live music venue'],
            shopping: ['Local markets', 'Shopping district', 'Souvenir hunting']
        };
        
        const itinerary = [];
        for (let i = 0; i < days; i++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);
            
            const dayActivities = tripData.interests
                .map(interest => activities[interest] || [])
                .flat()
                .slice(0, 3);
            
            if (dayActivities.length === 0) {
                dayActivities.push('Explore the city', 'Local sightseeing', 'Relaxation time');
            }
            
            itinerary.push({
                date: currentDate.toISOString().split('T')[0],
                day: i + 1,
                activities: dayActivities.slice(0, 3)
            });
        }
        
        return {
            id: generateId(),
            destination: tripData.destination,
            startDate: tripData.startDate,
            endDate: tripData.endDate,
            travelers: tripData.travelers,
            budget: tripData.budget,
            interests: tripData.interests,
            itinerary,
            estimatedCost: calculateEstimatedCost(tripData.budget, days, tripData.travelers),
            createdAt: new Date().toISOString()
        };
    }
    
    function calculateEstimatedCost(budget, days, travelers) {
        const baseCosts = {
            budget: 100,
            moderate: 200,
            luxury: 500
        };
        
        const baseDaily = baseCosts[budget] || 200;
        const travelersCount = parseInt(travelers) || 1;
        
        return {
            daily: baseDaily,
            total: baseDaily * days * travelersCount,
            breakdown: {
                accommodation: Math.round(baseDaily * 0.4 * days * travelersCount),
                food: Math.round(baseDaily * 0.3 * days * travelersCount),
                activities: Math.round(baseDaily * 0.2 * days * travelersCount),
                transport: Math.round(baseDaily * 0.1 * days * travelersCount)
            }
        };
    }
    
    function displayTripPlan(tripPlan) {
        const resultsContainer = $('#trip-plan-results');
        if (!resultsContainer) return;
        
        resultsContainer.innerHTML = `
            <div class="card animate-fade-in-up">
                <div class="flex items-center justify-between mb-6">
                    <h2>Your Trip to ${tripPlan.destination}</h2>
                    <div class="flex gap-2">
                        <button class="btn btn-secondary" id="save-trip-btn">
                            <i data-lucide="heart"></i>
                            Save Trip
                        </button>
                        <button class="btn btn-primary" id="view-timeline-btn">
                            <i data-lucide="calendar"></i>
                            View Timeline
                        </button>
                    </div>
                </div>
                
                <div class="grid grid-cols-2 gap-8">
                    <div>
                        <h3 class="mb-4">Itinerary</h3>
                        <div class="space-y-4">
                            ${tripPlan.itinerary.map(day => `
                                <div class="border rounded-lg p-4">
                                    <div class="font-medium mb-2">Day ${day.day} - ${formatDate(day.date)}</div>
                                    <div class="space-y-1">
                                        ${day.activities.map(activity => `
                                            <div class="flex items-center gap-2 text-sm text-muted">
                                                <i data-lucide="check-circle" size="14" class="text-accent"></i>
                                                ${activity}
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div>
                        <h3 class="mb-4">Cost Breakdown</h3>
                        <div class="card bg-secondary">
                            <div class="text-center mb-4">
                                <div class="text-2xl font-bold text-primary">$${tripPlan.estimatedCost.total}</div>
                                <div class="text-sm text-muted">Total Estimated Cost</div>
                            </div>
                            
                            <div class="space-y-3">
                                <div class="flex justify-between">
                                    <span>Accommodation</span>
                                    <span>$${tripPlan.estimatedCost.breakdown.accommodation}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span>Food & Dining</span>
                                    <span>$${tripPlan.estimatedCost.breakdown.food}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span>Activities</span>
                                    <span>$${tripPlan.estimatedCost.breakdown.activities}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span>Transportation</span>
                                    <span>$${tripPlan.estimatedCost.breakdown.transport}</span>
                                </div>
                            </div>
                            
                            <div class="mt-4 pt-4 border-t">
                                <button class="btn btn-accent w-full" id="book-trip-btn">
                                    <i data-lucide="credit-card"></i>
                                    Book This Trip
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Re-initialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        // Add event listeners for new buttons
        addEvent($('#save-trip-btn'), 'click', () => {
            UserData.saveTrip(tripPlan);
            showNotification('Trip saved successfully!', 'success');
        });
        
        addEvent($('#view-timeline-btn'), 'click', () => {
            AppState.navigateTo('timeline');
        });
        
        addEvent($('#book-trip-btn'), 'click', () => {
            AppState.navigateTo('booking');
        });
    }
    
    // Only render if we're on the planner page
    if (AppState.currentPage === 'planner') {
        renderTripPlanner();
    }
}