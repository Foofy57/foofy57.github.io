$(document).ready(function() {

    /**
	* 
	* DarkMode
	* 
	*/
    // Fonction pour activer le mode sombre
    function darkmode() {
        $('body').addClass('darkMode');
        localStorage.setItem('darkMode', 'true');
        $('.block--homeIntro h2 .char').css('color', '#FFFFFF');
    }

    // Fonction pour désactiver le mode sombre
    function nodark() {
        $('body').removeClass('darkMode');
        localStorage.setItem('darkMode', 'false');
        $('.block--homeIntro h2 .char').css('color', '#0F0F23');
    }

    // Vérifier le stockage pour savoir si le mode sombre était activé ou désactivé
    if (localStorage.getItem('darkMode') === 'true') {
            darkmode();
    } else if (localStorage.getItem('darkMode') === 'false') {
            nodark();
    } else {
        // Si aucune préférence stockée, détecter la préférence du système
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            darkmode();
        } else {
            nodark();
        }
    }

    // Activer darkMode
    $('.mainHeader__darkmode').on('click', function(event) {
        if ($('body').hasClass('darkMode')) {
            nodark();
        } else {
            darkmode();
        }
    });

    /**
	* 
	* INIT SCROLL SMOOTHER
	* 
	*/
	let smoother;
    ScrollTrigger.normalizeScroll({allowNestedScroll: true});

    // Create the smooth scroller
    smoother = ScrollSmoother.create({
        smooth: 2,
        normalizeScroll: false,
        allowNestedScroll: true,
        effects: true,
        smoothTouch: 0.1,
    });

    $('.mainHeader__menuButton').on('click', function () {
        if (!$('.mainHeader__menu').is(':visible')) {
            smoother.paused(true);
        } else {
            smoother.paused(false);
        }
    });

    if ( !$('.mainHeader__menu').is(':visible') ) {

        $(document).keyup(function (e) {
            if (e.keyCode === 27 ) {

                smoother.paused(false);
            };
        });
    }
});