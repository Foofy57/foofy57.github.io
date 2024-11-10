$(document).ready(function() {


    /**
	* 
	* BLOCKS ADD SPACER
	* 
	*/
    $('.block').not(':first').each(function() {
        $(this).append('<div class="block__spacer"></div>');
    });

    $('.block').not(':first').each(function() {
        gsap.fromTo( $(this).find('.block__spacer'),
            {
                scaleX: 0,
            },
            {
                duration: 0.7,
                scaleX: 1,
                scrollTrigger: {
                    trigger: $(this),
                    start: 'top bottom-=200',
					end: 'top bottom-=200',
                    markers: false,
                    scrub: false,
                },
            }
        );
    });


    /**
	* 
	* INTRO
	* 
	*/
    // Opacity
    if ($('.block--homeIntro ').length > 0) {
    
        setTimeout(function() {
            $('.block--homeIntro h2').css('opacity','1');
        }, 10);

        // Animation
        const introTitle = new SplitText('.block--homeIntro h2', { types: 'chars', tag: 'div', charsClass: 'char' })
        const chars = introTitle.chars
        gsap.fromTo(
            chars,
            {
                y: 50,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                stagger: 0.03,
                duration: 1,
                ease: 'circ.out',
            }
        )

        // Hover letters
        $('.block--homeIntro h2 .char').hover(function() {
            var element = $(this);

            var colorWhite = getComputedStyle(document.documentElement).getPropertyValue('--color-white');
            var colorPink = getComputedStyle(document.documentElement).getPropertyValue('--color-pink');
            var colorBlueDark = getComputedStyle(document.documentElement).getPropertyValue('--color-blue-dark');

            TweenLite.to($(this), 0.2, { color: colorPink, ease: Linear.easeNone });
        
            setTimeout(function() {
                if ($('body').hasClass('darkMode')) {
                    TweenLite.to(element, 0.2, { color: colorWhite, ease: Linear.easeNone });
                } else {
                    TweenLite.to(element, 0.2, { color: colorBlueDark, ease: Linear.easeNone });
                }
            }, 2000);
        });
    }

    /**
	* 
	* AGENCY
	* 
	*/
    if (window.matchMedia('(min-width: 900px)').matches && $('.block--agency').length > 0) {
        const blockAgency = $('.block--agency');
        const imageContainer = $('.image__container');
        const images = $('.image');
        let isDragging = false;
        let currentImage = null;
        let startX, startY, initialX, initialY;

        // Function to generate a random size between 100px and 300px
        function getRandomSize() {
            return Math.floor(Math.random() * 150) + 100;
        }

        // Set random sizes for images
        images.each(function() {
            const size = getRandomSize();
            $(this).css({
                width: `${size}px`,
                height: 'auto'
            });
        });

        // Animate images on load using ScrollTrigger
        ScrollTrigger.create({
            trigger: blockAgency[0],
            start: 'top center',
            markers: false,
            scrub: false,
            once: true,
            onEnter: () => animateImages()
        });

        function animateImages() {
            const containerRect = imageContainer[0].getBoundingClientRect();
            const centerX = containerRect.width / 2;
            const centerY = containerRect.height / 2;

            images.each(function(index) {
                const img = $(this);

                // Position the image at the center
                gsap.set(img[0], {
                    x: centerX - img.width() / 2,
                    y: centerY - img.height() / 2
                });

                // Animate image appearance
                gsap.to(img[0], {
                    opacity: 1,
                    duration: 0.5,
                    delay: index * 0.1,
                    onComplete: function() {
                        if (index === images.length - 1) {
                            positionImagesRandomly();
                        }
                    }
                });
            });
        }

        // Function to check for overlap between two rectangles
        function isOverlapping(rect1, rect2) {
            return !(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom);
        }

        // Position images randomly on the page
        function positionImagesRandomly() {
            const placedImages = [];
            const margin = 20; // Margin between images

            images.each(function() {
                const img = $(this);
                let randomX, randomY, overlap;
                const maxX = imageContainer.width() - img.width() - margin;
                const maxY = imageContainer.height() - img.height() - margin;

                do {
                    randomX = Math.random() * maxX + margin / 2;
                    randomY = Math.random() * maxY + margin / 2;
                    const imgRect = {
                        left: randomX,
                        top: randomY,
                        right: randomX + img.width(),
                        bottom: randomY + img.height()
                    };

                    overlap = placedImages.some(placedImg => {
                        const placedRect = placedImg[0].getBoundingClientRect();
                        return isOverlapping(imgRect, placedRect);
                    });
                } while (overlap);

                placedImages.push(img);
                gsap.to(img[0], {
                    x: randomX,
                    y: randomY,
                    duration: 1,
                    delay: 0.5 // Delay to start the random positioning after appearance
                });
            });
        }

        // Function to handle mouse move event for container translation
        function handleMouseMove(e) {
            if (isDragging && currentImage) {
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;
                const newX = initialX + dx;
                const newY = initialY + dy;

                // Get dimensions of the block--agency and the current image
                const blockRect = blockAgency[0].getBoundingClientRect();
                const imageRect = currentImage.getBoundingClientRect();

                // Check boundaries to prevent image from moving outside block--agency
                if (imageRect.left + dx < blockRect.left) newX = initialX - (imageRect.left - blockRect.left);
                if (imageRect.right + dx > blockRect.right) newX = initialX + (blockRect.right - imageRect.right);
                if (imageRect.top + dy < blockRect.top) newY = initialY - (imageRect.top - blockRect.top);
                if (imageRect.bottom + dy > blockRect.bottom) newY = initialY + (blockRect.bottom - imageRect.bottom);

                gsap.to(currentImage, {
                    x: newX,
                    y: newY,
                    duration: 0.1
                });
            } else {
                const mouseX = e.clientX;
                const mouseY = e.clientY;
                const windowWidth = $(window).width();
                const windowHeight = $(window).height();

                // Calculate the translation for the image container
                const translateX = (mouseX / windowWidth - 0.5) * 100; // Adjust the multiplier for more or less translation
                const translateY = (mouseY / windowHeight - 0.5) * 100; // Adjust the multiplier for more or less translation

                gsap.to(imageContainer[0], {
                    x: translateX,
                    y: translateY,
                    duration: 0.9,
                    ease: 'power3.out'
                });

                images.each(function() {
                    const img = $(this);
                    const rect = img[0].getBoundingClientRect();
                    const imgCenterX = rect.left + rect.width / 2;
                    const imgCenterY = rect.top + rect.height / 2;
                    const distance = Math.sqrt(Math.pow(mouseX - imgCenterX, 2) + Math.pow(mouseY - imgCenterY, 2));
                    const maxDistance = 200;
                    const scale = distance < maxDistance ? 2 - (distance / maxDistance) : 1;
                    gsap.to(img[0], {
                        scale: scale,
                        duration: 1
                    });
                });
            }
        }

        // Handle mousedown event for image dragging
        images.on('mousedown', function(e) {
            isDragging = true;
            currentImage = this;
            startX = e.clientX;
            startY = e.clientY;
            initialX = gsap.getProperty(this, 'x');
            initialY = gsap.getProperty(this, 'y');
            e.preventDefault();
        });

        // Handle mouseup event to stop dragging
        $(document).on('mouseup', function() {
            isDragging = false;
            currentImage = null;
        });

        // Handle mousemove event
        blockAgency.on('mousemove', handleMouseMove);
    }
    

    /**
	* 
	* EXPERTISES
	* 
	*/
    if (window.matchMedia('(min-width: 900px)').matches && $('.block--expertises').length > 0) {
        
        function updateImageHeightsExpertises() {
            var maxImgHeight = 0;

            $('.block--expertises__imgContainer').css('height', '');
            $('.block--expertises__imgContainer').each(function() {
                var imgHeight = $(this).find('img').height();
                if (imgHeight > maxImgHeight) {
                    maxImgHeight = imgHeight;
                }
            });
            $('.block--expertises__imgContainer').css('height', maxImgHeight);
        }
        $('.block--expertises img').on('load', function() {
            updateImageHeightsExpertises();
        });
        $(window).on('resize', updateImageHeightsExpertises);
        

        $('.block--expertises').each(function() {
            gsap.fromTo( $(this).find('.block--expertises__title span'),
                {
                    opacity: 0,
                    x: -50,
                },
                {
                    opacity: 1,
                    x: 0,
                    delay: 0.5,
                    duration: 0.8,
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: $(this),
                        start: 'top bottom-=200',
                        end: 'top bottom-=200',
                        markers: false,
                        scrub: false,
                    },
                }
            );

            gsap.fromTo( $(this).find('.block--expertises__item > span'),
                {
                    opacity: 0,
                },
                {
                    opacity: 1,
                    x: 0,
                    delay: 0.7,
                    duration: 0.8,
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: $(this),
                        start: 'top bottom-=200',
                        end: 'top bottom-=200',
                        markers: false,
                        scrub: false,
                    },
                }
            );
        });

        let revealContainers = gsap.utils.toArray('.block--expertises__item');
        revealContainers.forEach((wrapreveal) => {

            let container = wrapreveal.querySelector('.block--expertises__imgContainer');

            let titleSpans =  wrapreveal.querySelector('img, video');

            let tl = gsap.timeline({paused: true});
            tl.set(container, { autoAlpha: 1 });
            tl.from(container, 1, {
                yPercent: -100,
                ease: Power2.out
            });
            tl.from(titleSpans, 1, {
                yPercent: 100,
                scale: 1.3,
                delay: -1,
                ease: Power2.out,
            });

            wrapreveal.animation = tl;
        });
        ScrollTrigger.batch(revealContainers, {
            onEnter: elements => elements.forEach((e, i) => e.animation.delay(i * 0.2).restart(true)),
            once: true
        });
    }
 

    /**
	* 
	* CLIENTS
	* 
	*/
    if (window.matchMedia('(min-width: 900px)').matches && $('.block--clients').length > 0) {

        $('.block--clients__item').hover (
            function() {
                $(this).find('img').fadeIn(300);
            },
            function() {
                $(this).find('img').fadeOut(300);
            }
        );

        $('.block--clients').each(function() {
            gsap.fromTo( $(this).find('.block--clients__item'),
                {
                    y: 50,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.15,
                    duration: 1,
                    ease: 'circ.out',
                    scrollTrigger: {
                        trigger: $(this),
                        start: 'top bottom-=200',
                        end: 'top bottom-=200',
                        markers: false,
                        scrub: false,
                    },
                }
            );
        });
    }

   
    /**
	* 
	* JOBS
	* 
	*/
    $('.block--jobs').each(function () {
        var $this = $(this);

        // Ensure we pass the DOM element, not the jQuery object
        const swiper = new Swiper($this.find('.swiper-container')[0], {
            speed: 800,
            draggable: true,
            cssMode: true,
            slidesPerView: 1.3,
            spaceBetween: 20,
            rewind: true,
            navigation: {
                nextEl: '.block--jobs__nav__next',
                prevEl: '.block--jobs__nav__prev',
            },
            breakpoints: {
                500: {
                    slidesPerView: 2.4,
                },
                900: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            },
        });
    });

    // Equal height
    $('.block--jobs__item').each(function() {
        var width = $(this).width();
        $(this).height(width);
    });
    $(window).resize(function() {
        $('.block--jobs__item').each(function() {
            var width = $(this).width();
            $(this).height(width);
        });
    });

    if (window.matchMedia('(min-width: 900px)').matches && $('.block--clients').length > 0) {
        // Jobs swiper
        // var swiperInstances = [];
        
        $('.block--jobs').each(function() {
            gsap.fromTo( $(this).find('.block--jobs__title span'),
                {
                    opacity: 0,
                    x: -50,
                },
                {
                    opacity: 1,
                    x: 0,
                    delay: 0.5,
                    duration: 0.8,
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: $(this),
                        start: 'top bottom-=200',
                        end: 'top bottom-=200',
                        markers: false,
                        scrub: false,
                    },
                }
            );

            gsap.fromTo( $(this).find('.block--jobs__item'),
                {
                    opacity: 0,
                },
                {
                    opacity: 1,
                    delay: 0.6,
                    duration: 0.8,
                    stagger: 0.3,
                    scaleY: 1,
                    scrollTrigger: {
                        trigger: $(this),
                        start: 'top bottom-=200',
                        end: 'top bottom-=200',
                        markers: false,
                        scrub: false,
                    },
                }
            );
        });
    }
    
    /**
	* 
	* EXPERTISES - MOBILE
	* 
	*/
    if (window.matchMedia('(max-width: 900px)').matches) {
        // Create new divs to encompass the links
        var swiperContainer = $('<div class="swiper-container"></div>');
        var swiperWrapper = $('<div class="swiper-wrapper"></div>');
        
        // Move <a> links in swiper-wrapper div
        $('.block--expertises__container a').appendTo(swiperWrapper);
        
        // Add the swiper-wrapper div to the swiper-container div
        swiperContainer.append(swiperWrapper);
        
        // Add the swiper-container div to the main container
        $('.block--expertises__container').append(swiperContainer);

        $('.block--expertises').each(function () {
            var $this = $(this);

            const swiper = new Swiper($this.find('.swiper-container')[0], {
                speed: 1000,
                draggable: true,
                cssMode: true,
                slidesPerView: 1.3,
                spaceBetween: 20,
                rewind: true,
                navigation: {
                    nextEl: '.block--expertises__nav__next',
                    prevEl: '.block--expertises__nav__prev',
                },
                breakpoints: {
                    500: {
                        slidesPerView: 2,
                    },
                    800: {
                        slidesPerView: 3,
                    },
                    1200: {
                        slidesPerView: 4,
                    },
                },
            });
        });
    }

   


    /**
	* 
	* AGENCY - MOBILE
	* 
	*/
    if (window.matchMedia('(max-width: 900px)').matches) {
        // Create new divs to encompass the links
        var swiperContainer = $('<div class="swiper-container"></div>');
        var swiperWrapper = $('<div class="swiper-wrapper"></div>');
        
        // Move <a> links in swiper-wrapper div
        $('.block--agency .image').appendTo(swiperWrapper);
        
        // Add the swiper-wrapper div to the swiper-container div
        swiperContainer.append(swiperWrapper);
        
        // Add the swiper-container div to the main container
        $('.block--agency .image__container').append(swiperContainer);

        $('.block--agency').each(function () {
            var $this = $(this);

            const swiper = new Swiper($this.find('.swiper-container')[0], {
                speed: 800,
                draggable: true,
                slidesPerView: 1,
                spaceBetween: 0,
                rewind: true,
                autoHeight: true,
                observer: true,
                observeParents: true,
                navigation: {
                    nextEl: '.block--agency__nav__next',
                    prevEl: '.block--agency__nav__prev',
                },
                breakpoints: {
                    500: {
                        slidesPerView: 2,
                    },
                    800: {
                        slidesPerView: 3,
                    },
                    1200: {
                        slidesPerView: 4,
                    },
                },
            });
        });
    }
});