$(document).ready(function() {

	/**
		* GLOBAL
		* Anchor click change css body overflow
		* Anchors scroll to top animation
		* Anchor click display WEB DEVELOPER hide others
		* Anchor click display GAMER hide others
		* Anchor click display PAINTER hide others
		* Carousel Item Img
		* Init Isotope
		* filters functions
		* Image loaded
		* Go top on reload
		* Effect Switch filters
	*/

	// Anchor click change css body overflow
	$('.anchor').click(function() {
		$('body').css({
			'height' : 'auto',
			'overflow-y' : 'auto'
		});
	});
	
	// Anchors scroll to top animation
	$(document).on('click', 'a[href^="#"]', function (event) {
		event.preventDefault();
		$('html, body').animate({
			scrollTop: $($.attr(this, 'href')).offset().top - 0
		}, 500);
	});

	// Anchor click display WEB DEVELOPER hide others
	$('a[href^="#web-developer"]').click(function() {
		$('#gamer').css({
			'opacity' : '0',
			'height' : '0',
			'overflow' : 'hidden',
			'padding-top' : '0px',
		});
		$('#painter').css({
			'opacity' : '0',
			'height' : '0',
			'overflow' : 'hidden',
			'padding-top' : '0px',
		});
		$('#web-developer').css({
			'opacity' : '1',
			'height' : '100%',
			'overflow' : 'unset',
			'padding-top' : '70px',
		});
	});

	// Anchor click display GAMER hide others
	$('a[href^="#gamer"]').click(function() {
		$('#web-developer').css({
			'opacity' : '0',
			'height' : '0',
			'overflow' : 'hidden',
			'padding-top' : '0px',
		});
		$('#painter').css({
			'opacity' : '0',
			'height' : '0',
			'overflow' : 'hidden',
			'padding-top' : '0px',
		});
		$('#gamer').css({
			'opacity' : '1',
			'height' : '100%',
			'overflow' : 'unset',
			'padding-top' : '70px',
		});
	});

	// Anchor click display PAINTER hide others
	$('a[href^="#painter"]').click(function() {
		$('#web-developer').css({
			'opacity' : '0',
			'height' : '0',
			'overflow' : 'hidden',
			'padding-top' : '0px',
		});
		$('#gamer').css({
			'opacity' : '0',
			'height' : '0',
			'overflow' : 'hidden',
			'padding-top' : '0px',
		});
		$('#painter').css({
			'opacity' : '1',
			'height' : '100%',
			'overflow' : 'unset',
			'padding-top' : '70px',
		});
	});

	// Carousel Item Img
	if ($('.item .img')[0]) {
		$('.item .img').slick({
			autoplay: true,
			autoplaySpeed: 3000,
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			dots: false,
			slide: 'img',
			rows: 0,
			fade: true,
			speed: 1000,
			infinite: true,
			pauseOnHover: false,
			adaptiveHeight: true,
			cssEase: 'linear',
		});
	}
	
	// Init Isotope
	let $grid = $('.grid').isotope({
		itemSelector: '.grid-item',
		percentPosition: true,
		horizontalOrder: true,
		masonry: {
			columnWidth: '.grid-sizer',
			gutter: '.gutter-sizer'
		}
	});

	// filters functions
	var filterFns = {};

	$('.grid').isotope({filter: '.all'});

	// bind filter button click
	$('.filters').on('click', 'button', function() {
		var filterValue = $(this).attr('data-filter');
		$grid.isotope({ filter: filterValue });
	});
	// change is-checked class on buttons
	$('.filters').each(function(i, buttonGroup) {
		var $buttonGroup = $(buttonGroup);
		$buttonGroup.on('click', 'button', function() {
			$buttonGroup.find('.is-checked').removeClass('is-checked');
			$(this).addClass('is-checked');
		});
	});

	// Image loaded
	$grid.imagesLoaded().progress( function() {
		$grid.isotope('layout');
	});

	// Effect Switch filters
	$('.filters').on('click', '.filterRight', function () {
		$('.filters').removeClass('filterLeft filterCenter').addClass('filterRight');
	});
	$('.filters').on('click', '.filterLeft', function () {
		$('.filters').removeClass('filterRight filterCenter').addClass('filterLeft');
	});

	$('.filters').on('click', '.filterCenter', function () {
		$('.filters').removeClass('filterRight filterLeft').addClass('filterCenter');
	});

	// Go top on reload
	window.onbeforeunload = function () {
		window.scrollTo(0, 0);
	}
});