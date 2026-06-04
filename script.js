// Simple JavaScript for AI Website

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Add active class to navigation links on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav-links a');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Simple animation for content sections when they come into view
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.content-section').forEach(section => {
    observer.observe(section);
});

// Add animation CSS dynamically
const style = document.createElement('style');
style.innerHTML = `
    .content-section {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .content-section.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Simple dark mode toggle (in case we want to add light mode later)
const toggleDarkMode = () => {
    document.body.classList.toggle('light-mode');
};

// For now, we'll just log a message to show the script is working
console.log('AI Website JavaScript loaded');

// Add a simple interactive element - click to highlight sections
document.querySelectorAll('.tech-item, .ai-type, .application').forEach(item => {
    item.addEventListener('click', function() {
        // Remove highlight from all items
        document.querySelectorAll('.tech-item, .ai-type, .application').forEach(i => {
            i.classList.remove('highlighted');
        });

        // Add highlight to clicked item
        this.classList.add('highlighted');

        // Remove highlight after 2 seconds
        setTimeout(() => {
            this.classList.remove('highlighted');
        }, 2000);
    });
});

// Add CSS for the highlight effect
const highlightStyle = document.createElement('style');
highlightStyle.innerHTML = `
    .highlighted {
        background-color: rgba(187, 134, 252, 0.2) !important;
        transform: scale(1.02) !important;
        transition: all 0.3s ease !important;
    }
`;
document.head.appendChild(highlightStyle);

// AI Chat Functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatHistory = document.getElementById('chatHistory');
    const userQuestion = document.getElementById('userQuestion');
    const askButton = document.getElementById('askButton');
    const loadingIndicator = document.getElementById('loadingIndicator');

    // Function to add a message to the chat history
    function addMessage(role, content) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(role === 'user' ? 'user-message' : 'ai-message');

        const roleStrong = document.createElement('strong');
        roleStrong.textContent = role === 'user' ? 'You:' : 'AI Assistant:';

        const contentP = document.createElement('p');
        contentP.textContent = content;

        messageDiv.appendChild(roleStrong);
        messageDiv.appendChild(contentP);
        chatHistory.appendChild(messageDiv);

        // Scroll to the bottom
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    // Function to call our Vercel serverless API
    async function callOpenRouterAPI(question) {
        try {
            const response = await fetch('/api/ask-ai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ question })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `API request failed with status ${response.status}`);
            }

            const data = await response.json();
            return data.answer;
        } catch (error) {
            console.error('Error calling AI API:', error);
            return "Sorry, I encountered an error while processing your question. Please try again.";
        }
    }

    // Event listener for the Ask AI button
    askButton.addEventListener('click', async function() {
        const question = userQuestion.value.trim();

        if (!question) {
            return;
        }

        // Add user question to chat
        addMessage('user', question);

        // Clear input
        userQuestion.value = '';

        // Show loading indicator
        loadingIndicator.style.display = 'block';
        askButton.disabled = true;

        try {
            // Call OpenRouter API
            const answer = await callOpenRouterAPI(question);

            // Add AI response to chat
            addMessage('ai', answer);
        } catch (error) {
            console.error('Error:', error);
            addMessage('ai', 'Sorry, I encountered an error while processing your question. Please try again.');
        } finally {
            // Hide loading indicator
            loadingIndicator.style.display = 'none';
            askButton.disabled = false;
        }
    });

    // Allow submitting with Enter key (but Ctrl+Enter for new line)
    userQuestion.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.ctrlKey && !e.shiftKey) {
            e.preventDefault();
            askButton.click();
        }
    });
});