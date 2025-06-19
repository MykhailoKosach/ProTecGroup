// Load contacts data from JSON file
async function loadContactsData() {
    try {
        const response = await fetch('./offices.json');
        const data = await response.json();
        
        // Combine offices and regions into one array
        const allContacts = data.offices;
        
        renderContacts(allContacts);
    } catch (error) {
        console.error('Error loading contacts data:', error);
        // Fallback to hardcoded data if JSON fails to load
        renderContacts(fallbackData);
    }
}

function renderContacts(contactsData) {
    const mainContainer = document.getElementById('contacts-group');
    const template = document.getElementById('contacts-template');

    // Clear existing content
    mainContainer.innerHTML = '';

    // Group data into chunks of 4
    let chunkSize = 4;
    if (window.matchMedia('(min-width: 1024px) and (max-width: 1200px)').matches) {
        chunkSize = 3;
    }
    console.log(`Chunk size set to: ${chunkSize}`);
    for (let i = 0; i < contactsData.length; i += chunkSize) {
        const chunk = contactsData.slice(i, i + chunkSize);

        // Create a new container for each chunk
        const container = document.createElement('div');
        container.className = 'contacts-container';

        chunk.forEach(office => {
            const clone = template.content.cloneNode(true);
            clone.querySelector('.office-name').textContent = office.officeName;
            clone.querySelector('.contact-person').textContent = office.contactPerson || '';
            clone.querySelector('.address').textContent = office.address || '';
            
            const emailLink = clone.querySelector('.email');
            if (office.email) {
                emailLink.href = `mailto:${office.email}`;
                emailLink.textContent = office.email;
            } else {
                emailLink.style.display = 'none';
            }

            // Add phone number if available
            const phoneElement = clone.querySelector('.phone');
            if (phoneElement && office.phone) {
                phoneElement.textContent = office.phone;
                phoneElement.href = `tel:${office.phone}`;
            }

            container.appendChild(clone);
        });

        // Append the container to the main container
        mainContainer.appendChild(container);
    }
}

// Fallback data in case JSON loading fails
const fallbackData = [
    {
        officeName: "Львівська філія",
        contactPerson: "",
        address: "79069, Львів, вул. Шевченка, 323",
        phone: "+380 32 234 9044",
        email: ""
    }
    // ... add more fallback entries as needed
];

// Load data when page loads
document.addEventListener('DOMContentLoaded', loadContactsData);

