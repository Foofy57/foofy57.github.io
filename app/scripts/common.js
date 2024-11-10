gsap.registerPlugin(ScrollTrigger, ScrollSmoother, DrawSVGPlugin);

function drawSvg() {
    $('.block-header path').each(function() {
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
                        element.parents('.block-header').addClass('block-header--fill');
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
        // onFocusIn: () => false,
    });
}

function scrollTriggerHeader() {
    ScrollTrigger.matchMedia({
        '(min-width: 800px)': function() {
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
        '(max-width: 799px)': function() {
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
                start: 'top-=100 bottom', // lorsque le bas de la fenêtre atteint le haut du block
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
    
                const header = $('.block-header');
                const mainheader = $('.mainHeader:not(.mainHeader--hidden)');
    
                if (next.namespace === 'default') {
                    header.css('height', '25vh');
                    mainheader.css('height', '25vh');
                    revealBlockDefault();
                } else if (next.namespace === 'home') {
                    header.css('height', '100vh');
                    mainheader.css('height', '100vh');
                    revealBlock();
                }
    
                scrollTriggerHeader();
                
                setTimeout(function () {
                    gsap.fromTo('body', 0.3, { opacity: '0' }, { opacity: '1' });
                }, 300);
                
                gsap.fromTo('.block-header', 0.7, { x: -150 }, { x: 0 });
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
                    gsap.fromTo('.mainHeader:not(.mainHeader--hidden)', 1.5, { height: '100vh' }, { height: '25vh' });
                    gsap.fromTo('.block-header', 1.5, { height: '100vh' }, { height: '25vh' });
                }
    
                if (current.namespace === 'default' && next.namespace === 'home') {
                    gsap.fromTo('.mainHeader:not(.mainHeader--hidden)', 1.5, { height: '25vh' }, { height: '100vh' });
                    gsap.fromTo('.block-header', 1.5, { height: '25vh' }, { height: '100vh' });
                }
    
                if (current.namespace === 'default' && next.namespace === 'default') {
                    gsap.fromTo('.mainHeader:not(.mainHeader--hidden)', 1.5, { height: '25vh' }, { height: '25vh' });
                    gsap.fromTo('.block-header', 1.5, { height: '25vh' }, { height: '25vh' });
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
});