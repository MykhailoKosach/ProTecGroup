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
    const dropdownOptions = document.querySelector('#topic-dropdown .dropdown-options');
    
    if (!dropdownOptions) {
        console.error('Custom dropdown not found');
        return;
    }

    // Clear existing options
    dropdownOptions.innerHTML = '';
    
    // Add new options from JSON data
    topicsData.forEach(topic => {
        const li = document.createElement('li');
        li.setAttribute('data-value', topic.value);
        li.textContent = topic.label;
        dropdownOptions.appendChild(li);
    });
    
    // Initialize dropdown functionality after options are loaded
    initializeDropdown();
}

// Initialize dropdown functionality once
function initializeDropdown() {
    const dropdown = document.getElementById("topic-dropdown");
    const selectedText = dropdown.querySelector(".selected-text");
    const hiddenInput = dropdown.querySelector("input[type=hidden]");
    
    if (!dropdown || !selectedText || !hiddenInput) {
        console.error('Dropdown elements not found');
        return;
    }
    
    // Use event delegation for better performance
    // This handles clicks on the dropdown container
    dropdown.addEventListener("click", handleDropdownClick);
    
    // Close dropdown when clicking outside
    document.addEventListener("click", handleOutsideClick);
}

// Handle dropdown clicks using event delegation
function handleDropdownClick(e) {
    const dropdown = e.currentTarget;
    const isOption = e.target.closest(".dropdown-options li");
    
    if (isOption) {
        // Option was clicked
        e.stopPropagation();
        
        const selectedText = dropdown.querySelector(".selected-text");
        const hiddenInput = dropdown.querySelector("input[type=hidden]");
        const value = isOption.dataset.value;
        const text = isOption.textContent;

        selectedText.textContent = text;
        hiddenInput.value = value;
        dropdown.classList.remove("open");
        
    } else {
        // Dropdown header was clicked
        dropdown.classList.toggle("open");
    }
}

// Handle clicks outside dropdown
function handleOutsideClick(e) {
    const dropdown = document.getElementById("topic-dropdown");
    if (dropdown && !dropdown.contains(e.target)) {
        dropdown.classList.remove("open");
    }
}

// Fallback topics data
const fallbackTopics = [
    { value: "feedback", label: "Відгук" },
    { value: "question", label: "Питання" },
    { value: "support", label: "Підтримка" },
    { value: "partnership", label: "Партнерство" },
    { value: "career", label: "Кар'єра" }
];

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', loadTopicsData);