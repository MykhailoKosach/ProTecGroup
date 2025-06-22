// const hamburger = document.getElementById('hamburger-toggle');
//     const mobileNav = document.getElementById('mobile-nav');

//     hamburger.addEventListener('click', () => {
//         mobileNav.style.display = mobileNav.style.display === 'flex' ? 'none' : 'flex';
//     });

// Mobile navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        mobileNav.classList.toggle('open');
        
        // Prevent body scroll when menu is open
        if (mobileNav.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            // Close all dropdowns when menu closes
            mobileNavItems.forEach(item => {
                item.classList.remove('open');
            });
        }
    });
    
    // Handle dropdown toggles
    mobileNavItems.forEach(item => {
        const link = item.querySelector('.mobile-nav-link');
        const dropdown = item.querySelector('.mobile-dropdown-list');
        
        if (dropdown) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Close other dropdowns
                mobileNavItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('open');
                    }
                });
                
                // Toggle current dropdown
                item.classList.toggle('open');
            });
            
            // Allow navigation to main category page by clicking on text
            const linkSpan = link.querySelector('span');
            if (linkSpan) {
                linkSpan.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const href = link.getAttribute('href');
                    if (href && href !== '#') {
                        window.location.href = href;
                    }
                });
            }
        }
    });
    
    // Close menu when clicking on dropdown links
    document.querySelectorAll('.mobile-dropdown-item a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            mobileNav.classList.remove('open');
            document.body.style.overflow = '';
            mobileNavItems.forEach(item => {
                item.classList.remove('open');
            });
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileNav.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            mobileNav.classList.remove('open');
            document.body.style.overflow = '';
            mobileNavItems.forEach(item => {
                item.classList.remove('open');
            });
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1023) {
            hamburger.classList.remove('active');
            mobileNav.classList.remove('open');
            document.body.style.overflow = '';
            mobileNavItems.forEach(item => {
                item.classList.remove('open');
            });
        }
    });
});