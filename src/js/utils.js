// Utility functions for the Travel Explorer app

// DOM utilities
function $(selector) {
    return document.querySelector(selector);
}

function $$(selector) {
    return document.querySelectorAll(selector);
}

function createElement(tag, className = '', innerHTML = '') {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (innerHTML) element.innerHTML = innerHTML;
    return element;
}

// Event utilities
function addEvent(element, event, handler) {
    if (element) {
        element.addEventListener(event, handler);
    }
}

function removeEvent(element, event, handler) {
    if (element) {
        element.removeEventListener(event, handler);
    }
}

// Storage utilities
function setStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

function getStorage(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return defaultValue;
    }
}

function removeStorage(key) {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error('Error removing from localStorage:', error);
    }
}

// Form validation utilities
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function validateForm(formData) {
    const errors = {};
    
    if (!formData.email || !validateEmail(formData.email)) {
        errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password || !validatePassword(formData.password)) {
        errors.password = 'Password must be at least 6 characters long';
    }
    
    if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}

// Date utilities
function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(date));
}

function formatTime(date) {
    return new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    }).format(new Date(date));
}

// API utilities
async function fetchWeatherData(city, apiKey = 'YOUR_API_KEY_HERE') {
    try {
        // Mock weather data for demo purposes
        // In a real app, you would use: 
        // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        
        // Mock data that matches OpenWeatherMap API structure
        const mockWeatherData = {
            name: city,
            main: {
                temp: Math.floor(Math.random() * 30) + 10, // Random temp between 10-40°C
                feels_like: Math.floor(Math.random() * 30) + 10,
                humidity: Math.floor(Math.random() * 50) + 30,
                pressure: Math.floor(Math.random() * 50) + 1000
            },
            weather: [
                {
                    main: ['Clear', 'Clouds', 'Rain', 'Snow'][Math.floor(Math.random() * 4)],
                    description: 'clear sky',
                    icon: '01d'
                }
            ],
            wind: {
                speed: Math.floor(Math.random() * 10) + 1
            },
            visibility: 10000,
            sys: {
                country: 'US'
            }
        };
        
        return mockWeatherData;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}

// Random ID generator
function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Show notification (simple alert replacement)
function showNotification(message, type = 'info') {
    const notification = createElement('div', `notification notification-${type}`, message);
    document.body.appendChild(notification);
    
    // Auto-remove notification after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

// Loading spinner utility
function showLoading(container) {
    const spinner = createElement('div', 'loading-spinner', `
        <div class="spinner"></div>
        <p>Loading...</p>
    `);
    container.innerHTML = '';
    container.appendChild(spinner);
}

function hideLoading(container) {
    const spinner = container.querySelector('.loading-spinner');
    if (spinner) {
        spinner.remove();
    }
}