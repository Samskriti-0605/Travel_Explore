// Authentication component (Login/Register)

function createAuthPage(isLogin = true) {
    const title = isLogin ? 'Welcome Back' : 'Create Account';
    const subtitle = isLogin ? 'Sign in to your account' : 'Join Travel Explorer today';
    const buttonText = isLogin ? 'Sign In' : 'Create Account';
    const switchText = isLogin ? "Don't have an account?" : "Already have an account?";
    const switchLinkText = isLogin ? 'Sign up' : 'Sign in';
    const switchPage = isLogin ? 'register' : 'login';
    
    return `
        <div class="min-h-screen flex items-center justify-center py-12 px-4">
            <div class="max-w-md w-full">
                <div class="card animate-fade-in-up">
                    <div class="text-center mb-8">
                        <h2>${title}</h2>
                        <p class="text-muted">${subtitle}</p>
                    </div>
                    
                    <form id="auth-form" class="space-y-6">
                        ${!isLogin ? `
                            <div>
                                <label for="name" class="block text-sm font-medium mb-2">Full Name</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    class="input" 
                                    placeholder="Enter your full name"
                                    required
                                >
                                <div class="error-message" id="name-error"></div>
                            </div>
                        ` : ''}
                        
                        <div>
                            <label for="email" class="block text-sm font-medium mb-2">Email Address</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                class="input" 
                                placeholder="Enter your email"
                                required
                            >
                            <div class="error-message" id="email-error"></div>
                        </div>
                        
                        <div>
                            <label for="password" class="block text-sm font-medium mb-2">Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                class="input" 
                                placeholder="Enter your password"
                                required
                            >
                            <div class="error-message" id="password-error"></div>
                        </div>
                        
                        ${!isLogin ? `
                            <div>
                                <label for="confirmPassword" class="block text-sm font-medium mb-2">Confirm Password</label>
                                <input 
                                    type="password" 
                                    id="confirmPassword" 
                                    name="confirmPassword" 
                                    class="input" 
                                    placeholder="Confirm your password"
                                    required
                                >
                                <div class="error-message" id="confirmPassword-error"></div>
                            </div>
                        ` : ''}
                        
                        <button type="submit" class="btn btn-primary w-full">
                            ${buttonText}
                        </button>
                    </form>
                    
                    <div class="text-center mt-6">
                        <p class="text-muted">
                            ${switchText}
                            <a href="#" class="text-accent hover:underline" data-page="${switchPage}">
                                ${switchLinkText}
                            </a>
                        </p>
                    </div>
                    
                    ${isLogin ? `
                        <div class="text-center mt-4">
                            <a href="#" class="text-sm text-muted hover:text-accent">
                                Forgot your password?
                            </a>
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

function initializeAuthPage() {
    const mainContent = $('#main-content');
    
    function renderAuthPage() {
        const isLogin = AppState.currentPage === 'login';
        mainContent.innerHTML = createAuthPage(isLogin);
        addAuthEventListeners();
    }
    
    function addAuthEventListeners() {
        // Form submission
        const authForm = $('#auth-form');
        if (authForm) {
            addEvent(authForm, 'submit', handleFormSubmit);
        }
        
        // Navigation links
        $$('[data-page]').forEach(link => {
            addEvent(link, 'click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                AppState.navigateTo(page);
            });
        });
        
        // Real-time validation
        const inputs = $$('#auth-form input');
        inputs.forEach(input => {
            addEvent(input, 'blur', () => validateField(input));
            addEvent(input, 'input', () => clearError(input));
        });
    }
    
    function handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        
        // Validate form
        const validation = validateForm(data);
        
        // Clear previous errors
        clearAllErrors();
        
        if (!validation.isValid) {
            displayErrors(validation.errors);
            return;
        }
        
        // Simulate authentication
        const isLogin = AppState.currentPage === 'login';
        
        if (isLogin) {
            // Simulate login
            handleLogin(data);
        } else {
            // Simulate registration
            handleRegister(data);
        }
    }
    
    function handleLogin(data) {
        // In a real app, you would make an API call here
        // For demo purposes, we'll simulate a successful login
        
        const userData = {
            id: generateId(),
            email: data.email,
            name: data.email.split('@')[0], // Use email prefix as name
            loginAt: new Date().toISOString()
        };
        
        AppState.login(userData);
        showNotification('Login successful!', 'success');
        AppState.navigateTo('planner');
    }
    
    function handleRegister(data) {
        // In a real app, you would make an API call here
        // For demo purposes, we'll simulate a successful registration
        
        const userData = {
            id: generateId(),
            email: data.email,
            name: data.name,
            registeredAt: new Date().toISOString()
        };
        
        AppState.login(userData);
        showNotification('Account created successfully!', 'success');
        AppState.navigateTo('planner');
    }
    
    function validateField(input) {
        const name = input.name;
        const value = input.value;
        const errorElement = $(`#${name}-error`);
        
        let error = '';
        
        switch (name) {
            case 'name':
                if (!value.trim()) {
                    error = 'Name is required';
                }
                break;
            case 'email':
                if (!value) {
                    error = 'Email is required';
                } else if (!validateEmail(value)) {
                    error = 'Please enter a valid email address';
                }
                break;
            case 'password':
                if (!value) {
                    error = 'Password is required';
                } else if (!validatePassword(value)) {
                    error = 'Password must be at least 6 characters long';
                }
                break;
            case 'confirmPassword':
                const password = $('#password').value;
                if (!value) {
                    error = 'Please confirm your password';
                } else if (value !== password) {
                    error = 'Passwords do not match';
                }
                break;
        }
        
        if (errorElement) {
            errorElement.textContent = error;
            errorElement.style.color = 'var(--destructive)';
            errorElement.style.fontSize = '0.875rem';
            errorElement.style.marginTop = '0.25rem';
        }
        
        return !error;
    }
    
    function clearError(input) {
        const errorElement = $(`#${input.name}-error`);
        if (errorElement) {
            errorElement.textContent = '';
        }
    }
    
    function clearAllErrors() {
        $$('.error-message').forEach(element => {
            element.textContent = '';
        });
    }
    
    function displayErrors(errors) {
        Object.keys(errors).forEach(field => {
            const errorElement = $(`#${field}-error`);
            if (errorElement) {
                errorElement.textContent = errors[field];
                errorElement.style.color = 'var(--destructive)';
                errorElement.style.fontSize = '0.875rem';
                errorElement.style.marginTop = '0.25rem';
            }
        });
    }
    
    // Only render if we're on the auth pages
    if (['login', 'register'].includes(AppState.currentPage)) {
        renderAuthPage();
    }
}