$(document).ready(function() {

    /**
    * realisationS - HOVER ACCORDIONS
    */
    $( '.team__people__row__button' ).on( 'mouseenter', function() {
        $(this).find('.team__people__row__image img').show();
    });
    $( '.team__people__row__button' ).on( 'mouseleave', function() {
        $(this).find('.team__people__row__image img').hide();
    });


    /**
    * CLICK ACCORDIONS
    */
    $( '.team__people__row__button' ).on( 'click', function() {

        if ( !$(this).next('.team__people__row__panel').is(':visible') ) {

            // Reset
            $('.team__people__row__button').removeClass('team__people__row__button--active').attr('aria-expanded','false');
            $('.team__people__row__panel').removeClass('team__people__row__panel--active').slideUp();
            $('.realisations__table__article__thumbnail').css('opacity','1');

            // Aria
            $(this).attr('aria-expanded','true');
            
            // Add classes
            $(this).addClass('team__people__row__button--active');
            $(this).next('.team__people__row__panel').addClass('team__people__row__panel--active');

            // Show panel
            $(this).next('.team__people__row__panel').slideDown();

            // Hide Thumbnail
            $(this).find('.realisations__table__article__thumbnail').hide().css('opacity','0');

        } else {

            // Aria
            $(this).attr('aria-expanded','false');

            // Remove classes
            $(this).removeClass('team__people__row__button--active');
            $(this).next('.team__people__row__panel').removeClass('team__people__row__panel--active');

            // Hide panel
            $(this).next('.team__people__row__panel').slideUp();

            // Change Opacity Thumbnail
            $(this).find('.realisations__table__article__thumbnail').delay(1000).animate({ opacity: 1 }, 0);
        }
    });

    // Clone Pictures
    if (window.matchMedia('(max-width: 900px)').matches) {
        $( '.team__people__row' ).each(function() {
            var clone = $(this).find('.team__people__row__image').clone();
            clone.appendTo( $(this).find('.team__people__row__panel__inner') );
        });
    }
});