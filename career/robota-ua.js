document.addEventListener('DOMContentLoaded', function() {
    // Better iframe height handling
    function adjustIframeHeight() {
        const iframes = document.querySelectorAll('iframe[id^="RUAFRAME"]');
        
        iframes.forEach(iframe => {
            // Set a reasonable minimum height
            iframe.style.height = '500px';
            
            // Try to get content height (if not blocked by CORS)
            iframe.addEventListener('load', function() {
                try {
                    const iframeDoc = this.contentDocument || this.contentWindow.document;
                    if (iframeDoc && iframeDoc.body) {
                        const height = Math.max(
                            iframeDoc.body.scrollHeight,
                            iframeDoc.body.offsetHeight,
                            500 // minimum fallback
                        );
                        this.style.height = height + 'px';
                    }
                } catch (e) {
                    // CORS blocked - use responsive height based on viewport
                    const viewportHeight = window.innerHeight;
                    const calculatedHeight = Math.max(500, viewportHeight * 0.7);
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