// This script provides a simple copy-to-clipboard functionality with a notification system.
// Simple copy to clipboard function
function copyToClipboard(text) {
    // Use modern Clipboard API if available
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Скопійовано!');
        }).catch(() => {
            // Fallback if clipboard API fails
            fallbackCopy(text);
        });
    } else {
        // Fallback for older browsers
        fallbackCopy(text);
    }
}

// Fallback copy method
function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-999999px';
    textarea.style.top = '-999999px';
    
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        document.execCommand('copy');
        showNotification('Скопійовано!');
    } catch (err) {
        showNotification('Помилка копіювання');
    }
    
    document.body.removeChild(textarea);
}

// Show notification
function showNotification(message) {
    // Remove existing notification if any
    const existing = document.querySelector('.copy-notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.textContent = message;
    
    // Style notification
    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        background: '#4CAF50',
        color: 'white',
        padding: '12px 20px',
        borderRadius: '6px',
        fontSize: '14px',
        fontFamily: 'Arial, sans-serif',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: '10000',
        opacity: '0',
        transform: 'translateY(20px)',
        transition: 'all 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    // Remove after 2.5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2500);
}

// Initialize copy functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add click listeners to elements with data-copy attribute
    document.addEventListener('click', function(e) {
        const copyElement = e.target.closest('[data-copy]');
        if (copyElement) {
            const textToCopy = copyElement.getAttribute('data-copy') || copyElement.textContent;
            copyToClipboard(textToCopy);
            e.preventDefault();
        }
    });
    
    // Add hover effect to copyable elements
    const copyableElements = document.querySelectorAll('[data-copy]');
    copyableElements.forEach(element => {
        element.style.cursor = 'pointer';
        element.title = 'Натисніть для копіювання';
        
        element.addEventListener('mouseenter', function() {
            this.style.opacity = '0.7';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
        });
    });
});

// document.querySelectorAll('.email').forEach(el => {
//   const text = el.textContent.trim();
//   el.innerHTML = text.replace(/([@.])/g, '$1<wbr>');
// });
