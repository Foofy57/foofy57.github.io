$(document).ready(function() {

    /**
	* 
	* REALISATION
	* 
	*/
    if ($('.block--realisation').length > 0) {

        // Realisation - Add spacer
        $('.block--realisation').each(function() {
            $(this).find('.block--realisation__filters').append('<div class="block__spacer block__spacer--filters"></div>');
        });
        
        // Realisation - Equal height img
        function updateImageHeightsRealisation() {
            var maxImgHeight = 0;
            
            $('.block--realisation__table__item__imgContainer').css('height', '');
            $('.block--realisation__table__item__imgContainer').each(function() {
                var imgHeight = $(this).find('img').height();
                if (imgHeight > maxImgHeight) {
                    maxImgHeight = imgHeight;
                }
            });
            $('.block--realisation__table__item__imgContainer').css('height', maxImgHeight);
        }
        $('.block--realisation img').on('load', function() {
            updateImageHeightsRealisation();
        });
        $(window).on('resize', updateImageHeightsRealisation);

        
        // Realisation - Filters
        var rows = $('.block--realisation__table__item').length;
        var items = $('.block--realisation__table__item');

        rows = rows ;
        $('.block--realisation__filter__button sup').html(rows)
        $( '.block--realisation__filters__button' ).each(function( index ) {
            var filter = $(this).attr('data-filter');
            if ( 'all' === filter ) {
                $(this).find('sup').html(rows)
            } else {
                var table_rows = items.filter(function() { return $(this).data('tag').indexOf(filter) != -1;}).length;
                table_rows = table_rows;
                $(this).find('sup').html(table_rows);   
            }
        });


    
        // Realisation - Filters on click
        $('.block--realisation__filters__button').on('click', function() {
            var value = $(this).data('filter');
        
            if ($(this).hasClass('block--realisation__filters__button--active')) {
                // If the button is already active, show all items
                $(this).removeClass('block--realisation__filters__button--active');
                items.hide().fadeIn().css('display', 'flex');
            } else {
                // Apply the filter normally
                if (value == 'all') {
                    items.hide().fadeIn().css('display', 'flex');
                } else {
                    var $selected = items.filter(function() {
                        return $(this).data('tag').indexOf(value) != -1;
                    });
                    items.hide();
                    $selected.fadeIn().css('display', 'flex');
                }
                $('.block--realisation__filters__button').removeClass('block--realisation__filters__button--active');
                $(this).addClass('block--realisation__filters__button--active');
            }
        });

        $('.block--realisation').each(function () {
            var $this = $(this);

            const swiper = new Swiper($this.find('.swiper-container')[0], {
                slidesPerView: 'auto',
                freemode: true,
                spaceBetween: 20,
                resistance: false,
            });
        });
    }
});