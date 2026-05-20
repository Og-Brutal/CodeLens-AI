document.addEventListener('DOMContentLoaded', () => {
    const codeInput = document.getElementById('code-input');
    const reviewBtn = document.getElementById('review-btn');
    const loadingState = document.getElementById('loading-state');
    const resultsDashboard = document.getElementById('results-dashboard');
    const languageSelect = document.getElementById('language-select');

    // Result elements
    const bugsList = document.getElementById('bugs-list');
    const securityList = document.getElementById('security-list');
    const optimizationList = document.getElementById('optimization-list');
    const generalFeedback = document.getElementById('general-feedback');
    const scoreValue = document.querySelector('.score-value');

    const API_URL = 'http://localhost:5000/api/reviews'; // Backend URL

    reviewBtn.addEventListener('click', async () => {
        const code = codeInput.value.trim();
        const language = languageSelect.value;

        if (!code) {
            alert('Please paste some code first!');
            return;
        }

        // UI State: Loading
        reviewBtn.disabled = true;
        resultsDashboard.classList.add('hidden');
        loadingState.classList.remove('hidden');

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ code, language })
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();
            
            // Assume API returns structured JSON
            // { score: 85, bugs: [], security: [], optimizations: [], general_feedback: "markdown..." }
            renderResults(data);

            // UI State: Results
            loadingState.classList.add('hidden');
            resultsDashboard.classList.remove('hidden');

            // Scroll to results
            resultsDashboard.scrollIntoView({ behavior: 'smooth', block: 'start' });

        } catch (error) {
            console.error('Error reviewing code:', error);
            alert('Failed to analyze code. Please ensure the backend is running.');
            loadingState.classList.add('hidden');
        } finally {
            reviewBtn.disabled = false;
        }
    });

    function renderResults(data) {
        // Animate Score
        animateValue(scoreValue, 0, data.score || 100, 1500);

        // Helper to populate lists
        const populateList = (element, items, emptyMsg) => {
            element.innerHTML = '';
            if (!items || items.length === 0) {
                element.innerHTML = `<li>${emptyMsg}</li>`;
                return;
            }
            items.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                element.appendChild(li);
            });
        };

        populateList(bugsList, data.bugs, "No critical bugs found. Great job!");
        populateList(securityList, data.security, "No obvious security vulnerabilities detected.");
        populateList(optimizationList, data.optimizations, "Code is reasonably optimized.");

        // For general feedback (markdown), a simple parser or just basic HTML formatting
        // In a real app, use a library like marked.js. Here we do a simple replace for code blocks.
        let feedbackHTML = data.general_feedback || "No general feedback provided.";
        
        // Basic Markdown to HTML parsing (just for `code` and ```code block``` and headers)
        feedbackHTML = feedbackHTML
            .replace(/### (.*)/g, '<h3>$1</h3>')
            .replace(/## (.*)/g, '<h2>$1</h2>')
            .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            .replace(/\n/g, '<br>');

        generalFeedback.innerHTML = feedbackHTML;
    }

    // Number animation utility
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // Easing out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            obj.innerHTML = Math.floor(easeOut * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // ==========================================================================
    // UI Interactions (Modals & Panels)
    // ==========================================================================

    // Panel Elements
    const signinModal = document.getElementById('signin-modal');
    const historyPanel = document.getElementById('history-panel');
    const settingsPanel = document.getElementById('settings-panel');

    // Nav Buttons
    const navSignin = document.getElementById('nav-signin');
    const navHistory = document.getElementById('nav-history');
    const navSettings = document.getElementById('nav-settings');
    const navReview = document.getElementById('nav-review');

    // Close Buttons
    const signinClose = document.getElementById('signin-close');
    const historyClose = document.getElementById('history-close');
    const settingsClose = document.getElementById('settings-close');

    // Functions to open panels
    const openModal = (modal) => modal.classList.remove('hidden');
    const closeModal = (modal) => modal.classList.add('hidden');

    // Sign In Event Listeners
    navSignin.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(signinModal);
    });
    signinClose.addEventListener('click', () => closeModal(signinModal));
    
    // Close sign in when clicking outside the box
    signinModal.addEventListener('click', (e) => {
        if (e.target === signinModal) closeModal(signinModal);
    });

    // History Panel Event Listeners
    navHistory.addEventListener('click', (e) => {
        e.preventDefault();
        // Update active states
        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
        navHistory.classList.add('active');
        
        openModal(historyPanel);
    });
    historyClose.addEventListener('click', () => {
        closeModal(historyPanel);
        navHistory.classList.remove('active');
        navReview.classList.add('active');
    });

    // Settings Panel Event Listeners
    navSettings.addEventListener('click', (e) => {
        e.preventDefault();
        // Update active states
        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
        navSettings.classList.add('active');

        openModal(settingsPanel);
    });
    settingsClose.addEventListener('click', () => {
        closeModal(settingsPanel);
        navSettings.classList.remove('active');
        navReview.classList.add('active');
    });
    document.getElementById('settings-save').addEventListener('click', () => {
        closeModal(settingsPanel);
        navSettings.classList.remove('active');
        navReview.classList.add('active');
        // Here you would actually save settings (e.g. to localStorage)
        alert('Settings saved successfully!');
    });

    // Nav Review button (just resets panels)
    navReview.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
        navReview.classList.add('active');
        closeModal(historyPanel);
        closeModal(settingsPanel);
    });

    // Prevent form submission on sign in for demo
    document.getElementById('signin-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Signing in...';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            closeModal(signinModal);
            navSignin.innerHTML = '<i class="fa-solid fa-user-check"></i> John Doe';
            navSignin.classList.remove('btn-outline');
            navSignin.classList.add('btn-primary');
        }, 1500);
    });

});