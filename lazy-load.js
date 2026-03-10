document.addEventListener("DOMContentLoaded", function() {
    // 1. Tafuta picha zote kwenye makala (post-body)
    var lazyImages = document.querySelectorAll('#image-content img');
    
    // 2. Kama Browser inasubiri Native Lazy Loading (Teknolojia ya 2026)
    if ('loading' in HTMLImageElement.prototype) {
        lazyImages.forEach(function(img) {
            img.setAttribute('loading', 'lazy');
            img.classList.add('loaded'); // Onyesha picha
        });
    } else {
        // 3. Fallback kwa browsers za kizamani (Intersection Observer)
        var lazyObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var lazyImage = entry.target;
                    lazyImage.classList.add('loaded');
                    lazyObserver.unobserve(lazyImage);
                }
            });
        }, {
            rootMargin: "0px 0px 300px 0px" // Pakia picha ikibaki 300px kufikiwa
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImage.classList.add('lazy-img');
            lazyObserver.observe(lazyImage);
        });
    }
});