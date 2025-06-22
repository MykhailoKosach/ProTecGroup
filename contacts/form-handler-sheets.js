// Google Apps Script Web App URL (you'll get this after deployment)
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
});

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('.btn[type="submit"]');
    const originalButtonText = submitButton.textContent;
    
    // Disable submit button and show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Надсилання...';
    
    try {
        const formData = collectFormData(form);
        
        // Validate form data
        if (!validateFormData(formData)) {
            throw new Error('Будь ласка, заповніть всі обов\'язкові поля');
        }
        
        // Send data to Google Sheets
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        // Since we're using no-cors, we can't read the response
        // We'll assume success if no error is thrown
        showNotification('Повідомлення успішно надіслано!', 'success');
        form.reset();
        resetDropdown();
        
    } catch (error) {
        console.error('Form submission error:', error);
        showNotification('Помилка відправки форми. Спробуйте пізніше.', 'error');
    } finally {
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    }
}

function collectFormData(form) {
    const formData = new FormData(form);
    const data = {
        timestamp: new Date().toISOString(),
        date: new Date().toLocaleDateString('uk-UA'),
        time: new Date().toLocaleTimeString('uk-UA')
    };
    
    // Get regular form fields
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    // Get dropdown value
    const topicDropdown = document.getElementById('topic-dropdown');
    if (topicDropdown) {
        const hiddenInput = topicDropdown.querySelector('input[type="hidden"]');
        if (hiddenInput && hiddenInput.value) {
            data.topic = hiddenInput.value;
            
            // Get readable topic text
            const selectedText = topicDropdown.querySelector('.selected-text');
            if (selectedText && selectedText.textContent !== 'Оберіть тему') {
                data.topicText = selectedText.textContent;
            }
        }
    }
    
    return data;
}

function validateFormData(data) {
    // Check required fields
    if (!data.name || data.name.trim() === '') {
        showNotification('Будь ласка, введіть ваше ім\'я', 'error');
        return false;
    }
    
    if (!data.email || data.email.trim() === '') {
        showNotification('Будь ласка, введіть вашу пошту', 'error');
        return false;
    }
    
    if (!data.message || data.message.trim() === '') {
        showNotification('Будь ласка, введіть повідомлення', 'error');
        return false;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Будь ласка, введіть правильну email адресу', 'error');
        return false;
    }
    
    return true;
}

function resetDropdown() {
    const dropdown = document.getElementById('topic-dropdown');
    if (dropdown) {
        const selectedText = dropdown.querySelector('.selected-text');
        const hiddenInput = dropdown.querySelector('input[type="hidden"]');
        
        if (selectedText) {
            selectedText.textContent = 'Оберіть тему';
        }
        if (hiddenInput) {
            hiddenInput.value = '';
        }
        dropdown.classList.remove('open');
    }
}

function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.form-notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'form-notification';
    notification.textContent = message;
    
    // Style based on type
    const colors = {
        success: '#4CAF50',
        error: '#f44336',
        info: '#2196F3'
    };
    
    Object.assign(notification.style, {
        position: 'fixed',
        top: '30px',
        right: '30px',
        background: colors[type] || colors.info,
        color: 'white',
        padding: '15px 25px',
        borderRadius: '8px',
        fontSize: '16px',
        fontFamily: 'Arial, sans-serif',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: '10001',
        opacity: '0',
        transform: 'translateX(100%)',
        transition: 'all 0.3s ease',
        maxWidth: '400px',
        wordWrap: 'break-word'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}
