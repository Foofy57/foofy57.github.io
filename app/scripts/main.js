$(document).ready(function() {

	// Anchor click change css overflow
	$('.anchor').click(function() {
		$('body').css({
			'height' : 'auto',
			'overflow-y' : 'auto'
		});
	});
	
	// Anchors scroll animation
	$(document).on('click', 'a[href^="#"]', function (event) {
		event.preventDefault();
		$('html, body').animate({
			scrollTop: $($.attr(this, 'href')).offset().top - 30
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
		$('#web-developer').css({
			'opacity' : '1',
			'height' : '100%',
			'overflow' : 'auto',
			'padding-top' : '50px',
		});
	});

	// Anchor click display WEB DEVELOPER hide others
	$('a[href^="#gamer"]').click(function() {
		$('#web-developer').css({
			'opacity' : '0',
			'height' : '0',
			'overflow' : 'hidden',
			'padding-top' : '0px',
		});
		$('#gamer').css({
			'opacity' : '1',
			'height' : '100%',
			'overflow' : 'auto',
			'padding-top' : '50px',
		});
	});

	// Img carousel
	$(document).ready(function(){
		$('.img').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			speed: 1000,
			autoplay: true,
			dots: false,
			fade: true,
			arrows: false,
			infinite: true,
			rows: 0,
			slide: 'img',
			adaptiveHeight: true,
			pauseOnHover: true,
		});
	});
	
	// Go top on reload
	window.onbeforeunload = function () {
		window.scrollTo(0, 0);
	}
});