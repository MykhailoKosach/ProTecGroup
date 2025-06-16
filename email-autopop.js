// Load topics data from JSON file
async function loadTopicsData() {
    try {
        const response = await fetch('./email-topics.json');
        const data = await response.json();
        
        populateTopicsSelect(data.topics);
    } catch (error) {
        console.error('Error loading topics data:', error);
        // Fallback to hardcoded data if JSON fails to load
        populateTopicsSelect(fallbackTopics);
    }
}

function populateTopicsSelect(topicsData) {
    const selectElement = document.getElementById('topic');
    
    // Clear existing options except the first one (placeholder)
    const firstOption = selectElement.querySelector('option[value=""]');
    selectElement.innerHTML = '';
    selectElement.appendChild(firstOption);
    
    // Add new options from JSON data
    topicsData.forEach(topic => {
        const option = document.createElement('option');
        option.value = topic.value;
        option.textContent = topic.label;
        selectElement.appendChild(option);
    });
}

// Copy to clipboard function
function copyToClipboard(element) {
    const text = element.textContent || element.innerText;
    
    // Modern approach using Clipboard API
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            showCopyNotification(element, 'Скопійовано!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
            fallbackCopyTextToClipboard(text, element);
        });
    } else {
        // Fallback for older browsers
        fallbackCopyTextToClipboard(text, element);
    }
}

// Fallback copy function for older browsers
function fallbackCopyTextToClipboard(text, element) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopyNotification(element, 'Скопійовано!');
        } else {
            showCopyNotification(element, 'Помилка копіювання');
        }
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
        showCopyNotification(element, 'Помилка копіювання');
    }
    
    document.body.removeChild(textArea);
}

// Show copy notification
function showCopyNotification(element, message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.className = 'copy-notification';
    
    // Position near the clicked element
    // const rect = element.getBoundingClientRect();
    notification.style.position = 'fixed';
    notification.style.bottom = '30px';
    notification.style.right = '30px';
    notification.style.zIndex = '1000';
    
    document.body.appendChild(notification);
    
    // Remove notification after 2 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 2000);
}

function myFunction() {
  // Get the text field
  var copyText = document.getElementById("myInput");

  // Select the text field
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices

   // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.value);

  // Alert the copied text
  alert("Copied the text: " + copyText.value);
}

// Load topics when page loads
document.addEventListener('DOMContentLoaded', loadTopicsData);

