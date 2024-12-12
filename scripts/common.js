gsap.registerPlugin(ScrollTrigger, ScrollSmoother, DrawSVGPlugin);

function drawSvg() {
    $('.mainHeader .logo path').each(function() {
        const element = $(this);
        gsap.fromTo(element,
            { drawSVG: '0%' },
            { 
                duration: 2, 
                drawSVG: '100%', 
                repeat: 0, 
                ease: 'power1.inOut',
                onStart: function() {
                    setTimeout(function() {
                        element.parents('.mainHeader .logo').addClass('logo--fill');
                    }, 900);
                }
            }
        );
    });
}

function createScrollSmoother() {
    return ScrollSmoother.create({
        smooth: 1.5,
        effects: true,
        // normalizeScroll: true,
        ignoreMobileResize: true,
        smoothTouch: 0.1,
        onFocusIn: () => true,
    });
}

function scrollTriggerHeader() {
    ScrollTrigger.matchMedia({
        '(min-width: 801px)': function() {
            ScrollTrigger.create({
                trigger: '.mainHeader:not(.mainHeader--hidden) .menu',
                start: 'top top',
                end: '+=0',
                onEnter: () => {
                    $('.mainHeader:not(.mainHeader--hidden)').addClass('mainHeader--fixed');
                    $('.mainHeader--hidden').addClass('mainHeader--visible');
                },
                onLeaveBack: () => {
                    $('.mainHeader:not(.mainHeader--hidden)').removeClass('mainHeader--fixed');
                    $('.mainHeader--hidden').removeClass('mainHeader--visible');
                },
            });
        },
        '(max-width: 800px)': function() {
            ScrollTrigger.create({
                trigger: '.mainHeader:not(.mainHeader--hidden) .menu',
                start: 'bottom top',
                end: '+=0',
                onEnter: () => {
                    $('.mainHeader:not(.mainHeader--hidden)').addClass('mainHeader--fixed');
                    $('.mainHeader--hidden').addClass('mainHeader--visible');
                },
                onLeaveBack: () => {
                    $('.mainHeader:not(.mainHeader--hidden)').removeClass('mainHeader--fixed');
                    $('.mainHeader--hidden').removeClass('mainHeader--visible');
                },
            });
        }
    });
}

function revealBlock() {
    $('.block').each(function() {
        gsap.fromTo($(this), 
            { y: 200, opacity: 0 }, 
            { 
                y: 0, 
                opacity: 1, 
                ease: 'power3.out', 
                scrollTrigger: {
                trigger: this,
                start: 'top-=100 bottom',
                end: 'top+=200',
                scrub: true,
                }
            }
        );
    });
}

function revealBlockDefault() {
    $('.block').each(function() {
        gsap.fromTo('.block', 
            { y: 200, opacity: 0 }, 
            { 
                y: 0, 
                opacity: 1, 
                duration: 1,
                stagger: 0.2,
                ease: 'power2.out'
            }
        );
    });
}

function revealFooter() {
    $('.mainFooter').each(function() {
        gsap.fromTo('.mainFooter',
            { y: 200, opacity: 0 }, 
            { 
                y: 0, 
                opacity: 1, 
                duration: 0.7,
                stagger: 0.2,
                ease: 'power2.out'
            }
        );
    });
}


function init() {
    barba.hooks.before(() => {});

    barba.hooks.after(() => {});

    barba.hooks.enter(() => {
        window.scrollTo(0, 0);
        ScrollTrigger.refresh();
    });

    barba.init({
        transitions: [{
            name: 'default-transition',
            once({ current, next }) {
                const smoother = createScrollSmoother();
                ScrollTrigger.refresh();
    
                const $mainHeader = $('.mainHeader:not(.mainHeader--hidden)');
                const $bodyContainer = $('body');
                
                $bodyContainer.prepend($mainHeader.clone().addClass('mainHeader--hidden'));
    
                const mainheader = $('.mainHeader:not(.mainHeader--hidden)');
    
                if (next.namespace === 'default') {
                    mainheader.css('height', '25svh');
                    revealBlockDefault();
                } else if (next.namespace === 'home') {
                    mainheader.css('height', '100svh');
                    revealBlock();
                }
    
                scrollTriggerHeader();
                
                setTimeout(function () {
                    gsap.fromTo('body', 0.3, { opacity: '0' }, { opacity: '1' });
                }, 300);
                
                gsap.fromTo('.mainHeader .logo', 1, { x: -600 }, { x: 0 });
                drawSvg();
                revealFooter()

                $('.burger-menu').on('click', function() {
                    var isExpanded = $(this).attr('aria-expanded') === 'true';
                    
                    $(this).attr('aria-expanded', !isExpanded);
                    
                    if (isExpanded) {
                        smoother.paused(false);
                        $(this).next('.menu').css('visibility', 'hidden');
                    } else {
                        smoother.paused(true);
                        $(this).next('.menu').css('visibility', 'visible');
                        $('.burger-menu-close').attr('aria-expanded', 'true');
                    }
                });

                $(document).on('click', function(e) {
                    var $menu = $('.menu');
                
                    if ($menu.is(e.target) && $menu.has(e.target).length === 0) {
                        $('.burger-menu-close').attr('aria-expanded', 'false');
                        $('.burger-menu').attr('aria-expanded', 'false');
                        smoother.paused(false);
                    }
                });

                $('.burger-menu-close').on('click', function() {
                    $('.burger-menu-close').attr('aria-expanded', 'false');
                    $('.burger-menu').attr('aria-expanded', 'false');
                    smoother.paused(false);
                });
            },
            afterLeave(data) {
                const triggers = ScrollTrigger.getAll();
                triggers.forEach((trigger) => trigger.kill());
            },
            beforeEnter ({ current, next }) {
            },
            enter({ current, next }) {

                setTimeout(function () {
                    $('.mainHeader:not(.mainHeader--hidden)').removeClass('mainHeader--fixed');
                    $('.mainHeader--hidden').removeClass('mainHeader--visible');
                }, 10);
    
                if (current.namespace === 'home' && next.namespace === 'default') {
                    gsap.fromTo('.mainHeader:not(.mainHeader--hidden)', 1.5, { height: '100svh' }, { height: '25svh' });
                }
    
                if (current.namespace === 'default' && next.namespace === 'home') {
                    gsap.fromTo('.mainHeader:not(.mainHeader--hidden)', 1.5, { height: '25svh' }, { height: '100svh' });
                }
    
                if (current.namespace === 'default' && next.namespace === 'default') {
                    gsap.fromTo('.mainHeader:not(.mainHeader--hidden)', 1.5, { height: '25svh' }, { height: '25svh' });
                }

                drawSvg();
                revealFooter()

                if (next.namespace === 'default') {
                    revealBlockDefault();
                } else if (next.namespace === 'home') {
                    revealBlock();
                }

                ScrollTrigger.refresh();
            },
            after({ current, next }) {
                const smoother = createScrollSmoother();
                ScrollTrigger.refresh();
    
                $('.mainHeader--hidden').remove();
    
                const $mainHeader = $('.mainHeader:not(.mainHeader--hidden)');
                const $bodyContainer = $('body');
                
                $bodyContainer.prepend($mainHeader.clone().addClass('mainHeader--hidden'));
    
                scrollTriggerHeader();
    
                if ((current.namespace === 'default' && next.namespace === 'home') || 
                    (current.namespace === 'home' && next.namespace === 'default')) {
                    smoother.paused(true);
                    setTimeout(function () {
                        smoother.paused(false);
                        ScrollTrigger.refresh();
                    }, 1500);
                } else {
                    smoother.paused(false);
                }

                $('.burger-menu').on('click', function() {
                    var isExpanded = $(this).attr('aria-expanded') === 'true';
                    
                    $(this).attr('aria-expanded', !isExpanded);
                    
                    if (isExpanded) {
                        smoother.paused(false);
                        $(this).next('.menu').css('visibility', 'hidden');
                    } else {
                        smoother.paused(true);
                        $(this).next('.menu').css('visibility', 'visible');
                        $('.burger-menu-close').attr('aria-expanded', 'true');
                    }
                });

                $(document).on('click', function(e) {
                    var $menu = $('.menu');
                
                    if ($menu.is(e.target) && $menu.has(e.target).length === 0) {
                        $('.burger-menu-close').attr('aria-expanded', 'false');
                        $('.burger-menu').attr('aria-expanded', 'false');
                        smoother.paused(false);
                    }
                });

                $('.burger-menu-close').on('click', function() {
                    $('.burger-menu-close').attr('aria-expanded', 'false');
                    $('.burger-menu').attr('aria-expanded', 'false');
                    smoother.paused(false);
                });
            },
        }]
    });
}

$(document).ready(function() {
    init();

    function setEqualHeightTitles() {
        if (window.matchMedia('(min-width: 801px)').matches)  {
            $('.threeBlocks').each(function() {
                let maxHeight = 0;
    
                $(this).find('.threeBlocks__title').each(function() {
                    $(this).css('height', 'auto');
                    maxHeight = Math.max(maxHeight, $(this).outerHeight());
                });
    
                $(this).find('.threeBlocks__title').css('height', maxHeight);
            });
        } else {
            $('.threeBlocks__title').css('height', 'auto');
        }
    }
    setEqualHeightTitles();
    $(window).on('resize', setEqualHeightTitles);
});