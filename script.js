document.addEventListener('DOMContentLoaded', function () {
    // BANNER
    const swiper = new Swiper('.banner__slider-wrap', {
        slidesPerView: 1,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: true
        },
        pagination: {
            el: '.banner__slider-wrap .swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.banner__slider-wrap .swiper-button-next',
            prevEl: '.banner__slider-wrap .swiper-button-prev',
        },
        on: {
            init: triggerSlideAnimations,
            slideChangeTransitionEnd: triggerSlideAnimations,
            slideChange: triggerSlideAnimations
        }
    });

    function triggerSlideAnimations() {
        document.querySelectorAll('.swiper-slide .animate').forEach(el => {
            el.classList.remove('animate-in');
        });

        const activeSlide = document.querySelector('.swiper-slide-active:not(.swiper-slide-duplicate)');
        if (activeSlide) {
            const animElements = activeSlide.querySelectorAll('.animate');
            animElements.forEach(el => {
                void el.offsetWidth;
                el.classList.add('animate-in');
            });
        }
    }
    // BANNER

    // SERVICES
    const serviceSwipers = {};

    document.querySelectorAll('.sg__services-content-item').forEach(item => {
        const target = item.getAttribute('data-target');
        const swiperEl = item.querySelector('.sg__services-content-item-slider-swiper');

        serviceSwipers[target] = new Swiper(swiperEl, {
            slidesPerView: 1,
            loop: true,
            effect: 'fade',
            autoplay: {
                delay: 5000,
                disableOnInteraction: true
            },
            pagination: {
                el: swiperEl.querySelector('.swiper-pagination'),
                clickable: true
            },
            navigation: {
                nextEl: swiperEl.querySelector('.swiper-button-next'),
                prevEl: swiperEl.querySelector('.swiper-button-prev')
            }
        });
    });

    document.querySelectorAll('.sg__service-tab').forEach((tabBtn) => {
        tabBtn.addEventListener('click', () => {
            const target = tabBtn.getAttribute('data-target');

            // Remove active from all tabs and content items
            document.querySelectorAll('.sg__service-tab').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.sg__services-content-item').forEach(item => item.classList.remove('active'));

            // Add active to current tab and matching content item
            tabBtn.classList.add('active');
            const targetContent = document.querySelector(`.sg__services-content-item[data-target="${target}"]`);
            if (targetContent) {
                targetContent.classList.add('active');

                // Force update Swiper when tab is shown
                const swiperInstance = serviceSwipers[target];
                if (swiperInstance) {
                    swiperInstance.update();
                    swiperInstance.slideToLoop(0); // go to first slide (optional)
                }
            }
        });
    });

    // SERVICES





});