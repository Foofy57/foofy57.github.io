$(document).ready(function() {

    $('.recruitment__jobs').each(function () {
        var $this = $(this);

        const swiper = new Swiper($this.find('.swiper-container')[0], {
            speed: 800,
            draggable: true,
            cssMode: true,
            slidesPerView: 1,
            spaceBetween: 30,
            rewind: true,
            navigation: {
                nextEl: '.recruitment__jobs__nav__next',
                prevEl: '.recruitment__jobs__nav__prev',
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
            on: {
                lock: function() {
                    $this.addClass('is-locked');
                },
                unlock: function() {
                    $this.removeClass('is-locked');
                },
            },
        });
    });

    // Equal height
    $('.recruitment__jobs__item').each(function() {
        var width = $(this).width();
        $(this).height(width);
    });
    $(window).resize(function() {
        $('.recruitment__jobs__item').each(function() {
            var width = $(this).width();
            $(this).height(width);
        });
    });
});