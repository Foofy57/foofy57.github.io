$(document).ready(function() {

    /**
    * CLICK ACCORDIONS
    */
    $( '.expertises__list__button' ).on( 'click', function() {

        if ( !$(this).next('.expertises__list__panel').is(':visible') ) {

            // Reset
            $('.expertises__list__button').removeClass('expertises__list__button--active').attr('aria-expanded','false');
            $('.expertises__list__panel').removeClass('expertises__list__panel--active').slideUp(800);
            $('.realisations__table__article__thumbnail').css('opacity','1');

            // Aria
            $(this).attr('aria-expanded','true');
            
            // Add classes
            $(this).addClass('expertises__list__button--active');
            $(this).next('.expertises__list__panel').addClass('expertises__list__panel--active');

            // Show panel
            $(this).next('.expertises__list__panel').slideDown(800);

            // Hide Thumbnail
            $(this).find('.realisations__table__article__thumbnail').hide().css('opacity','0');

        } else {

            // Aria
            $(this).attr('aria-expanded','false');

            // Remove classes
            $(this).removeClass('expertises__list__button--active');
            $(this).next('.expertises__list__panel').removeClass('expertises__list__panel--active');

            // Hide panel
            $(this).next('.expertises__list__panel').slideUp(800);

            // Change Opacity Thumbnail
            $(this).find('.realisations__table__article__thumbnail').delay(1000).animate({ opacity: 1 }, 0);
        }
    });

});