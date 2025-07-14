document.addEventListener('DOMContentLoaded', function() {
    const langButtons = document.querySelectorAll('.lang-btn');
    const uaJobs = document.getElementById('ua-jobs');
    const enJobs = document.getElementById('en-jobs');
    
    // Lazy load English iframe when first accessed
    let enIframeLoaded = false;

    function loadEnglishIframe() {
        if (!enIframeLoaded) {
            const enIframe = document.getElementById('RUAFRAME_EN');
            const dataSrc = enIframe.getAttribute('data-src');
            if (dataSrc) {
                enIframe.src = dataSrc;
                enIframeLoaded = true;
            }
        }
    }
    
    // Language toggle functionality
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.dataset.lang;
            
            // Update active button
            langButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show/hide appropriate job container
            if (lang === 'ua') {
                enJobs.classList.add('hidden');
                setTimeout(() => {
                    uaJobs.classList.remove('hidden');
                }, 150);
            } else {
                loadEnglishIframe(); // Load English iframe if not loaded
                uaJobs.classList.add('hidden');
                setTimeout(() => {
                    enJobs.classList.remove('hidden');
                }, 150);
            }
        });
    });
    
    // Better iframe height handling
    function adjustIframeHeight() {
        const iframes = document.querySelectorAll('iframe[id^="RUAFRAME"]');
        
        iframes.forEach(iframe => {
            // Set a reasonable minimum height
            iframe.style.height = '600px';
            
            // Try to get content height (if not blocked by CORS)
            iframe.addEventListener('load', function() {
                try {
                    const iframeDoc = this.contentDocument || this.contentWindow.document;
                    if (iframeDoc && iframeDoc.body) {
                        const height = Math.max(
                            iframeDoc.body.scrollHeight,
                            iframeDoc.body.offsetHeight,
                            600 // minimum fallback
                        );
                        this.style.height = height + 'px';
                    }
                } catch (e) {
                    // CORS blocked - use responsive height based on viewport
                    const viewportHeight = window.innerHeight;
                    const calculatedHeight = Math.max(600, viewportHeight * 0.7);
                    this.style.height = calculatedHeight + 'px';
                }
            });
        });
    }
    
    // Initial setup
    adjustIframeHeight();
    
    // Adjust on window resize
    window.addEventListener('resize', adjustIframeHeight);
});