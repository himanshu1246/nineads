document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the animation class
                entry.target.classList.add('is-visible');
                // Unobserve after animating once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all elements to animate
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .fade-in, .slide-up');
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Trigger hero animations immediately on load
    setTimeout(() => {
        document.querySelectorAll('#hero .slide-up, #hero .fade-in').forEach(el => {
            el.classList.add('is-visible');
        });
    }, 100);
});
