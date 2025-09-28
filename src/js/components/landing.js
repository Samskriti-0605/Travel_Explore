// Landing page component

function createLandingPage() {
    return `
        <div class="animate-fade-in">
            <!-- Hero Section -->
            <section class="hero">
                <div class="container">
                    <div class="animate-fade-in-up">
                        <h1>Discover Your Next Adventure</h1>
                        <p>Plan, explore, and book your perfect trip with our comprehensive travel platform</p>
                        <div class="flex gap-4 justify-center">
                            <button class="btn btn-primary btn-large" data-page="register">Start Planning</button>
                            <button class="btn btn-secondary btn-large" data-page="login">Sign In</button>
                        </div>
                    </div>
                </div>
            </section>
            
            <!-- Features Section -->
            <section class="py-20">
                <div class="container">
                    <div class="text-center mb-12">
                        <h2>Why Choose Travel Explorer?</h2>
                        <p class="text-muted">Everything you need for the perfect trip</p>
                    </div>
                    
                    <div class="grid grid-cols-3 gap-8">
                        <div class="card hover-scale text-center animate-fade-in-up" style="animation-delay: 0.1s">
                            <div class="mb-4">
                                <i data-lucide="map" size="48" class="text-accent mx-auto"></i>
                            </div>
                            <h3>Smart Trip Planning</h3>
                            <p class="text-muted">AI-powered itineraries tailored to your preferences and budget</p>
                        </div>
                        
                        <div class="card hover-scale text-center animate-fade-in-up" style="animation-delay: 0.2s">
                            <div class="mb-4">
                                <i data-lucide="cloud-sun" size="48" class="text-accent mx-auto"></i>
                            </div>
                            <h3>Weather Integration</h3>
                            <p class="text-muted">Real-time weather data to help you pack and plan accordingly</p>
                        </div>
                        
                        <div class="card hover-scale text-center animate-fade-in-up" style="animation-delay: 0.3s">
                            <div class="mb-4">
                                <i data-lucide="ticket" size="48" class="text-accent mx-auto"></i>
                            </div>
                            <h3>Easy Booking</h3>
                            <p class="text-muted">Book flights, hotels, and activities all in one place</p>
                        </div>
                    </div>
                </div>
            </section>
            
            <!-- Popular Destinations -->
            <section class="py-20 bg-secondary">
                <div class="container">
                    <div class="text-center mb-12">
                        <h2>Popular Destinations</h2>
                        <p class="text-muted">Discover the world's most amazing places</p>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-8">
                        <div class="card hover-glow animate-fade-in-up">
                            <div class="destination-card" style="background: linear-gradient(135deg, rgba(0,0,0,0.4), rgba(0,0,0,0.2)), url('https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=500&h=300&fit=crop') center/cover;">
                                <div class="p-6 text-white">
                                    <h3>Paris, France</h3>
                                    <p>The City of Light awaits with its timeless beauty and romance</p>
                                    <div class="mt-4">
                                        <span class="text-sm opacity-90">Starting from $899</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="card hover-glow animate-fade-in-up" style="animation-delay: 0.1s">
                            <div class="destination-card" style="background: linear-gradient(135deg, rgba(0,0,0,0.4), rgba(0,0,0,0.2)), url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop') center/cover;">
                                <div class="p-6 text-white">
                                    <h3>Tokyo, Japan</h3>
                                    <p>Experience the perfect blend of tradition and modernity</p>
                                    <div class="mt-4">
                                        <span class="text-sm opacity-90">Starting from $1,299</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="card hover-glow animate-fade-in-up" style="animation-delay: 0.2s">
                            <div class="destination-card" style="background: linear-gradient(135deg, rgba(0,0,0,0.4), rgba(0,0,0,0.2)), url('https://images.unsplash.com/photo-1571401835393-8c5f35328320?w=500&h=300&fit=crop') center/cover;">
                                <div class="p-6 text-white">
                                    <h3>Santorini, Greece</h3>
                                    <p>Blue domes and stunning sunsets in the Aegean Sea</p>
                                    <div class="mt-4">
                                        <span class="text-sm opacity-90">Starting from $1,199</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="card hover-glow animate-fade-in-up" style="animation-delay: 0.3s">
                            <div class="destination-card" style="background: linear-gradient(135deg, rgba(0,0,0,0.4), rgba(0,0,0,0.2)), url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop') center/cover;">
                                <div class="p-6 text-white">
                                    <h3>Bali, Indonesia</h3>
                                    <p>Tropical paradise with rich culture and stunning beaches</p>
                                    <div class="mt-4">
                                        <span class="text-sm opacity-90">Starting from $799</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <!-- CTA Section -->
            <section class="py-20">
                <div class="container text-center">
                    <div class="max-w-lg mx-auto">
                        <h2>Ready to Start Your Journey?</h2>
                        <p class="text-muted mb-8">Join thousands of travelers who trust Travel Explorer for their adventures</p>
                        <button class="btn btn-primary btn-large" data-page="register">Get Started Today</button>
                    </div>
                </div>
            </section>
        </div>
    `;
}

function initializeLandingPage() {
    const mainContent = $('#main-content');
    
    function renderLandingPage() {
        mainContent.innerHTML = createLandingPage();
        
        // Re-initialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        // Add event listeners
        addLandingPageEventListeners();
    }
    
    function addLandingPageEventListeners() {
        // Navigation buttons
        $$('[data-page]').forEach(button => {
            addEvent(button, 'click', (e) => {
                e.preventDefault();
                const page = button.getAttribute('data-page');
                AppState.navigateTo(page);
            });
        });
    }
    
    // Only render if we're on the home page
    if (AppState.currentPage === 'home') {
        renderLandingPage();
    }
}