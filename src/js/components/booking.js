// Booking component

function createBookingPage() {
    const { currentTripData } = AppState;
    
    if (!currentTripData) {
        return `
            <div class="container py-12">
                <div class="max-w-4xl mx-auto text-center">
                    <div class="animate-fade-in-up">
                        <i data-lucide="ticket-x" size="64" class="text-muted mx-auto mb-4"></i>
                        <h2>No Trip to Book</h2>
                        <p class="text-muted mb-6">You need to plan a trip first before you can book it.</p>
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
                    <h1>Book Your Trip</h1>
                    <p class="text-muted">Complete your booking for ${currentTripData.destination}</p>
                </div>
                
                <!-- Booking Progress -->
                <div class="card mb-8 animate-fade-in-up">
                    <div class="booking-progress">
                        <div class="flex justify-between items-center">
                            <div class="step active">
                                <div class="step-circle">1</div>
                                <div class="step-label">Trip Details</div>
                            </div>
                            <div class="step-line"></div>
                            <div class="step" id="step-2">
                                <div class="step-circle">2</div>
                                <div class="step-label">Traveler Info</div>
                            </div>
                            <div class="step-line"></div>
                            <div class="step" id="step-3">
                                <div class="step-circle">3</div>
                                <div class="step-label">Payment</div>
                            </div>
                            <div class="step-line"></div>
                            <div class="step" id="step-4">
                                <div class="step-circle">4</div>
                                <div class="step-label">Confirmation</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Booking Content -->
                <div class="grid grid-cols-2 gap-8">
                    <!-- Booking Form -->
                    <div class="space-y-6">
                        <!-- Step 1: Trip Summary -->
                        <div class="card booking-step" id="booking-step-1">
                            <h2 class="mb-6">Trip Summary</h2>
                            
                            <div class="space-y-4">
                                <div class="flex justify-between">
                                    <span class="font-medium">Destination:</span>
                                    <span>${currentTripData.destination}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="font-medium">Dates:</span>
                                    <span>${formatDate(currentTripData.startDate)} - ${formatDate(currentTripData.endDate)}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="font-medium">Duration:</span>
                                    <span>${calculateTripDuration(currentTripData)} days</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="font-medium">Travelers:</span>
                                    <span>${currentTripData.travelers}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="font-medium">Budget Category:</span>
                                    <span class="capitalize">${currentTripData.budget}</span>
                                </div>
                            </div>
                            
                            <div class="mt-6">
                                <h3 class="mb-3">Included Services</h3>
                                <div class="grid grid-cols-2 gap-2 text-sm">
                                    <div class="flex items-center gap-2">
                                        <i data-lucide="check-circle" size="14" class="text-accent"></i>
                                        <span>Accommodation</span>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <i data-lucide="check-circle" size="14" class="text-accent"></i>
                                        <span>Activities</span>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <i data-lucide="check-circle" size="14" class="text-accent"></i>
                                        <span>Local Transportation</span>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <i data-lucide="check-circle" size="14" class="text-accent"></i>
                                        <span>Travel Insurance</span>
                                    </div>
                                </div>
                            </div>
                            
                            <button class="btn btn-primary w-full mt-6" id="continue-to-step-2">
                                Continue to Traveler Information
                            </button>
                        </div>
                        
                        <!-- Step 2: Traveler Information -->
                        <div class="card booking-step hidden" id="booking-step-2">
                            <h2 class="mb-6">Traveler Information</h2>
                            
                            <form id="traveler-form" class="space-y-6">
                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <label for="firstName" class="block text-sm font-medium mb-2">First Name *</label>
                                        <input type="text" id="firstName" name="firstName" class="input" required>
                                    </div>
                                    <div>
                                        <label for="lastName" class="block text-sm font-medium mb-2">Last Name *</label>
                                        <input type="text" id="lastName" name="lastName" class="input" required>
                                    </div>
                                </div>
                                
                                <div>
                                    <label for="email" class="block text-sm font-medium mb-2">Email Address *</label>
                                    <input type="email" id="email" name="email" class="input" value="${AppState.user?.email || ''}" required>
                                </div>
                                
                                <div>
                                    <label for="phone" class="block text-sm font-medium mb-2">Phone Number *</label>
                                    <input type="tel" id="phone" name="phone" class="input" required>
                                </div>
                                
                                <div>
                                    <label for="dateOfBirth" class="block text-sm font-medium mb-2">Date of Birth *</label>
                                    <input type="date" id="dateOfBirth" name="dateOfBirth" class="input" required>
                                </div>
                                
                                <div>
                                    <label for="passport" class="block text-sm font-medium mb-2">Passport Number</label>
                                    <input type="text" id="passport" name="passport" class="input">
                                </div>
                                
                                <div>
                                    <label for="specialRequests" class="block text-sm font-medium mb-2">Special Requests</label>
                                    <textarea id="specialRequests" name="specialRequests" class="input" rows="3" placeholder="Dietary restrictions, accessibility needs, etc."></textarea>
                                </div>
                                
                                <div class="flex gap-3">
                                    <button type="button" class="btn btn-secondary" id="back-to-step-1">Back</button>
                                    <button type="submit" class="btn btn-primary flex-1">Continue to Payment</button>
                                </div>
                            </form>
                        </div>
                        
                        <!-- Step 3: Payment -->
                        <div class="card booking-step hidden" id="booking-step-3">
                            <h2 class="mb-6">Payment Information</h2>
                            
                            <form id="payment-form" class="space-y-6">
                                <div>
                                    <label for="cardName" class="block text-sm font-medium mb-2">Name on Card *</label>
                                    <input type="text" id="cardName" name="cardName" class="input" required>
                                </div>
                                
                                <div>
                                    <label for="cardNumber" class="block text-sm font-medium mb-2">Card Number *</label>
                                    <input type="text" id="cardNumber" name="cardNumber" class="input" placeholder="1234 5678 9012 3456" required>
                                </div>
                                
                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <label for="expiryDate" class="block text-sm font-medium mb-2">Expiry Date *</label>
                                        <input type="text" id="expiryDate" name="expiryDate" class="input" placeholder="MM/YY" required>
                                    </div>
                                    <div>
                                        <label for="cvv" class="block text-sm font-medium mb-2">CVV *</label>
                                        <input type="text" id="cvv" name="cvv" class="input" placeholder="123" required>
                                    </div>
                                </div>
                                
                                <div>
                                    <label for="billingAddress" class="block text-sm font-medium mb-2">Billing Address *</label>
                                    <textarea id="billingAddress" name="billingAddress" class="input" rows="3" required></textarea>
                                </div>
                                
                                <div class="bg-secondary p-4 rounded">
                                    <div class="flex items-center gap-2 mb-2">
                                        <i data-lucide="shield-check" size="16" class="text-accent"></i>
                                        <span class="text-sm font-medium">Secure Payment</span>
                                    </div>
                                    <div class="text-sm text-muted">Your payment information is encrypted and secure. We use industry-standard SSL encryption.</div>
                                </div>
                                
                                <div class="flex gap-3">
                                    <button type="button" class="btn btn-secondary" id="back-to-step-2">Back</button>
                                    <button type="submit" class="btn btn-primary flex-1">Complete Booking</button>
                                </div>
                            </form>
                        </div>
                        
                        <!-- Step 4: Confirmation -->
                        <div class="card booking-step hidden" id="booking-step-4">
                            <div class="text-center">
                                <i data-lucide="check-circle" size="64" class="text-accent mx-auto mb-4"></i>
                                <h2 class="text-accent mb-4">Booking Confirmed!</h2>
                                <p class="text-muted mb-6">Your trip has been successfully booked. You'll receive a confirmation email shortly.</p>
                                
                                <div class="bg-secondary p-4 rounded mb-6">
                                    <div class="font-medium mb-2">Booking Reference</div>
                                    <div class="text-2xl font-bold text-primary" id="booking-reference">TE-2024-001</div>
                                </div>
                                
                                <div class="flex gap-3 justify-center">
                                    <button class="btn btn-primary" id="download-ticket">
                                        <i data-lucide="download"></i>
                                        Download Ticket
                                    </button>
                                    <button class="btn btn-secondary" data-page="profile">
                                        <i data-lucide="user"></i>
                                        View My Bookings
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Order Summary -->
                    <div class="card sticky-summary animate-fade-in-up" style="animation-delay: 0.2s">
                        <h2 class="mb-6">Order Summary</h2>
                        
                        <div class="space-y-4 mb-6">
                            <div class="flex justify-between">
                                <span>Accommodation (${calculateTripDuration(currentTripData)} nights)</span>
                                <span>$${currentTripData.estimatedCost.breakdown.accommodation}</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Activities & Tours</span>
                                <span>$${currentTripData.estimatedCost.breakdown.activities}</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Meals & Dining</span>
                                <span>$${currentTripData.estimatedCost.breakdown.food}</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Local Transportation</span>
                                <span>$${currentTripData.estimatedCost.breakdown.transport}</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Travel Insurance</span>
                                <span>$${Math.round(currentTripData.estimatedCost.total * 0.05)}</span>
                            </div>
                            <div class="border-t pt-4">
                                <div class="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>$${currentTripData.estimatedCost.total}</span>
                                </div>
                                <div class="flex justify-between text-sm text-muted">
                                    <span>Taxes & Fees</span>
                                    <span>$${Math.round(currentTripData.estimatedCost.total * 0.1)}</span>
                                </div>
                            </div>
                            <div class="border-t pt-4 text-lg font-bold">
                                <div class="flex justify-between">
                                    <span>Total</span>
                                    <span class="text-primary">$${Math.round(currentTripData.estimatedCost.total * 1.15)}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bg-accent/10 p-4 rounded">
                            <div class="flex items-center gap-2 mb-2">
                                <i data-lucide="percent" size="16" class="text-accent"></i>
                                <span class="font-medium">Special Offer</span>
                            </div>
                            <div class="text-sm">Book now and save 10% on your next trip!</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function initializeBookingPage() {
    const mainContent = $('#main-content');
    let currentStep = 1;
    
    function renderBookingPage() {
        mainContent.innerHTML = createBookingPage();
        
        // Re-initialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        addBookingEventListeners();
        addBookingStyles();
    }
    
    function addBookingEventListeners() {
        // Navigation buttons
        $$('[data-page]').forEach(button => {
            addEvent(button, 'click', (e) => {
                e.preventDefault();
                const page = button.getAttribute('data-page');
                AppState.navigateTo(page);
            });
        });
        
        // Step navigation
        addEvent($('#continue-to-step-2'), 'click', () => goToStep(2));
        addEvent($('#back-to-step-1'), 'click', () => goToStep(1));
        addEvent($('#back-to-step-2'), 'click', () => goToStep(2));
        
        // Form submissions
        const travelerForm = $('#traveler-form');
        if (travelerForm) {
            addEvent(travelerForm, 'submit', handleTravelerFormSubmit);
        }
        
        const paymentForm = $('#payment-form');
        if (paymentForm) {
            addEvent(paymentForm, 'submit', handlePaymentFormSubmit);
        }
        
        // Download ticket
        addEvent($('#download-ticket'), 'click', downloadTicket);
        
        // Format card number input
        const cardNumberInput = $('#cardNumber');
        if (cardNumberInput) {
            addEvent(cardNumberInput, 'input', formatCardNumber);
        }
        
        // Format expiry date input
        const expiryInput = $('#expiryDate');
        if (expiryInput) {
            addEvent(expiryInput, 'input', formatExpiryDate);
        }
    }
    
    function goToStep(step) {
        // Hide all steps
        $$('.booking-step').forEach(stepEl => {
            stepEl.classList.add('hidden');
        });
        
        // Remove active class from all progress steps
        $$('.step').forEach(stepEl => {
            stepEl.classList.remove('active');
        });
        
        // Show current step
        const stepElement = $(`#booking-step-${step}`);
        const progressStep = $(`#step-${step}`) || $$('.step')[step - 1];
        
        if (stepElement) {
            stepElement.classList.remove('hidden');
            stepElement.classList.add('animate-fade-in-up');
        }
        
        if (progressStep) {
            progressStep.classList.add('active');
        }
        
        currentStep = step;
    }
    
    function handleTravelerFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const travelerData = Object.fromEntries(formData.entries());
        
        // Validate required fields
        const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth'];
        const missingFields = requiredFields.filter(field => !travelerData[field]);
        
        if (missingFields.length > 0) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        // Save traveler data
        setStorage('bookingTravelerData', travelerData);
        
        goToStep(3);
    }
    
    function handlePaymentFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const paymentData = Object.fromEntries(formData.entries());
        
        // Validate required fields
        const requiredFields = ['cardName', 'cardNumber', 'expiryDate', 'cvv', 'billingAddress'];
        const missingFields = requiredFields.filter(field => !paymentData[field]);
        
        if (missingFields.length > 0) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        // Simulate payment processing
        processPayment(paymentData);
    }
    
    async function processPayment(paymentData) {
        const paymentForm = $('#payment-form');
        const submitButton = paymentForm.querySelector('button[type="submit"]');
        
        // Show loading state
        submitButton.innerHTML = '<i data-lucide="loader-2" class="animate-spin"></i> Processing Payment...';
        submitButton.disabled = true;
        
        try {
            // Simulate payment processing delay
            await new Promise(resolve => setTimeout(resolve, 3000));
            
            // Create booking record
            const bookingData = createBookingRecord(paymentData);
            
            // Save booking
            const savedBooking = UserData.saveBooking(bookingData);
            
            // Update booking reference
            const bookingRef = $('#booking-reference');
            if (bookingRef) {
                bookingRef.textContent = savedBooking.id;
            }
            
            // Clear stored form data
            removeStorage('bookingTravelerData');
            
            // Show confirmation
            goToStep(4);
            
            showNotification('Payment successful! Your trip has been booked.', 'success');
        } catch (error) {
            showNotification('Payment failed. Please try again.', 'error');
            
            // Reset button
            submitButton.innerHTML = 'Complete Booking';
            submitButton.disabled = false;
        }
    }
    
    function createBookingRecord(paymentData) {
        const { currentTripData } = AppState;
        const travelerData = getStorage('bookingTravelerData', {});
        
        return {
            tripData: currentTripData,
            travelerInfo: travelerData,
            paymentInfo: {
                cardLast4: paymentData.cardNumber.slice(-4),
                amount: Math.round(currentTripData.estimatedCost.total * 1.15)
            },
            bookingDate: new Date().toISOString(),
            status: 'confirmed'
        };
    }
    
    function formatCardNumber(e) {
        const input = e.target;
        let value = input.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
        
        const formattedValue = value.match(/.{1,4}/g)?.join(' ') ?? value;
        
        input.value = formattedValue;
    }
    
    function formatExpiryDate(e) {
        const input = e.target;
        let value = input.value.replace(/\D/g, '');
        
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        
        input.value = value;
    }
    
    function downloadTicket() {
        const { currentTripData } = AppState;
        const bookingRef = $('#booking-reference').textContent;
        
        const ticketContent = `
╔══════════════════════════════════════════════════════════════╗
║                       TRAVEL TICKET                          ║
║                     Travel Explorer                          ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║ Booking Reference: ${bookingRef.padEnd(40, ' ')} ║
║ Destination: ${currentTripData.destination.padEnd(46, ' ')} ║
║ Dates: ${`${formatDate(currentTripData.startDate)} - ${formatDate(currentTripData.endDate)}`.padEnd(52, ' ')} ║
║ Travelers: ${currentTripData.travelers.padEnd(48, ' ')} ║
║ Duration: ${`${calculateTripDuration(currentTripData)} days`.padEnd(51, ' ')} ║
║                                                              ║
║ ITINERARY:                                                   ║
${currentTripData.itinerary.map(day => 
`║ Day ${day.day}: ${day.activities.join(', ').substring(0, 50).padEnd(54, ' ')} ║`
).join('\n')}
║                                                              ║
║ Total Amount: $${Math.round(currentTripData.estimatedCost.total * 1.15).toString().padEnd(47, ' ')} ║
║                                                              ║
║ Status: CONFIRMED                                            ║
║ Issued: ${new Date().toLocaleDateString().padEnd(49, ' ')} ║
║                                                              ║
║ Thank you for choosing Travel Explorer!                     ║
║ Have a wonderful trip!                                       ║
╚══════════════════════════════════════════════════════════════╝
        `.trim();
        
        // Create and download file
        const blob = new Blob([ticketContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = createElement('a');
        a.href = url;
        a.download = `ticket_${bookingRef}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showNotification('Ticket downloaded successfully!', 'success');
    }
    
    function calculateTripDuration(tripData) {
        const startDate = new Date(tripData.startDate);
        const endDate = new Date(tripData.endDate);
        return Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    }
    
    function addBookingStyles() {
        if (!$('#booking-styles')) {
            const styles = createElement('style', '', `
                .booking-progress {
                    padding: 2rem;
                }
                
                .step {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.5rem;
                    opacity: 0.5;
                    transition: opacity 0.3s ease;
                }
                
                .step.active {
                    opacity: 1;
                }
                
                .step-circle {
                    width: 2rem;
                    height: 2rem;
                    border-radius: 50%;
                    background-color: var(--muted);
                    color: var(--muted-foreground);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 600;
                    transition: all 0.3s ease;
                }
                
                .step.active .step-circle {
                    background-color: var(--accent);
                    color: var(--accent-foreground);
                }
                
                .step-label {
                    font-size: 0.875rem;
                    font-weight: 500;
                    text-align: center;
                }
                
                .step-line {
                    flex: 1;
                    height: 2px;
                    background-color: var(--border);
                    margin: 0 1rem;
                }
                
                .sticky-summary {
                    position: sticky;
                    top: 2rem;
                    max-height: fit-content;
                }
                
                .animate-spin {
                    animation: spin 1s linear infinite;
                }
                
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `);
            styles.id = 'booking-styles';
            document.head.appendChild(styles);
        }
    }
    
    // Only render if we're on the booking page
    if (AppState.currentPage === 'booking') {
        renderBookingPage();
    }
}