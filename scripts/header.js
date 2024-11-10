$(document).ready(function() {

    /**
	* 
	* MENU
	* 
	*/

    // Clone footer in menu
    $('.mainFooter').clone().appendTo('.mainHeader__menu');

    // Open Menu
    function openMenu() {

        // Add class
        $('.mainHeader').addClass('mainHeader--open');
        $('.mainHeader__menuButton').attr('aria-expanded', 'true');

        // Trap focus
        setTimeout(function() {
            findInsiders('.mainHeader__menu');
        }, 500);

        // Overflow
        $('body').css('overflow','hidden');

        // Show modale
        $('.mainHeader__menu').css('display', 'flex').hide().fadeIn();

        setTimeout(function() {
            $('.mainHeader__menu__container').css('overflow-y','auto');
        }, 2700);

        // Show links
        gsap.fromTo( $('.mainHeader__menu ul li') , 0.5,
            {
                y: 50,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                stagger: 0.15,
                delay: 0.25
            }
        );

        // Show Footer
        gsap.fromTo( $('.mainHeader .mainFooter__column') , 0.5,
            {
                opacity: 0
            },
            {
                opacity: 1,
                stagger: 0.15,
                delay: 1.25
            }
        );
    }


    // Close Menu
    function closeMenu() {
        
        // Hide links
        gsap.to( $('.mainHeader__menu__item, .mainHeader .mainFooter__column') , 0.1,
            {
                opacity: 0,
                delay: 0.5
            }
        );

        // Hide modale
        $('.mainHeader__menu').fadeOut();

        // Overflow
        $('body').css('overflow','auto');

        // Remove classe
        $('.mainHeader').removeClass('mainHeader--open');
        $('.mainHeader__menuButton').attr('aria-expanded', 'false');

        $('.mainHeader__menu__container').css('overflow-y','hidden');
    }

    // Accessibility Menu
    var findInsiders = function(elem) {

        var tabbable = $(elem).find('select, input, textarea, button, a').filter(':visible');

        var firstTabbable = tabbable.first();
        var lastTabbable = tabbable.last();
        
        /* Set focus on first input */
        firstTabbable.focus();

        /* Redirect last tab to first input */
        lastTabbable.on('keydown', function (e) {
            if ((e.which === 9 && !e.shiftKey)) {
                e.preventDefault();
                firstTabbable.focus();
            }
        });

        /* Redirect first shift+tab to last input */
        firstTabbable.on('keydown', function (e) {
            if ((e.which === 9 && e.shiftKey)) {
                e.preventDefault();
                lastTabbable.focus();
            }
        });
    };
    

    // Show hide header on scroll
    var lastScrollTop = 0,
        delta = 0,
        menuOpen = false;
    
    $(window).scroll(function() {
        if (!menuOpen) {
            var scrollTop = $(this).scrollTop();
            if (scrollTop > 5) { // Check if scrolled more than 10px from the top
                if (scrollTop > lastScrollTop) {
                    // Scrolling down
                    $('header').css('transform', 'translateY(-100px)');
                } else {
                    // Scrolling up
                    $('header').css('transform', 'translateY(0)');
                }
            } else {
                // Reset header if scroll is less than 10px
                $('header').css('transform', 'translateY(0)');
            }
            lastScrollTop = scrollTop;
        }
    });


    // Burger Menu
    $('.mainHeader__menuButton').on('click', function () {
        if (!$('.mainHeader__menu').is(':visible')) {
            $('.mainHeader').css('transform','translateY(0px)');
            openMenu();
            menuOpen = true;
        } else {
            closeMenu();
            menuOpen = false;
        }
    });

    
    /* Allow escape key to close insiders div */
    if ( !$('.mainHeader__menu').is(':visible') ) {

        $(document).keyup(function (e) {
            if (e.keyCode === 27 ) {

                closeMenu();
                menuOpen = false;
                $('.mainHeader__menuButton').focus();
            };
        });
    }

    // Clone langues
    if (window.matchMedia('(max-width: 900px)').matches) {
        var clone = $('.mainHeader__languages').clone();
        clone.prependTo('.mainHeader__menu__container');
    }
});