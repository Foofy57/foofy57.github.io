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
			scrollTop: $($.attr(this, 'href')).offset().top - 70
		}, 500);
	});

	// Anchor click display WEB DEVELOPER hide others
	$('a[href^="#web-developer"]').click(function() {
		$('#gamer').fadeOut(0);
		$('#web-developer').fadeIn(1000);
	});

	// Anchor click display GAMER hide others
	$('a[href^="#gamer"]').click(function() {
		$('#web-developer').fadeOut(0);
		$('#gamer').fadeIn(1000);
	});
	
	// Go top on reload
	window.onbeforeunload = function () {
		window.scrollTo(0, 0);
	}



	$(document).ready(function(){
		$('.img').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			speed: 1000,
			dots: false,
			arrows: false,
			slide: '.lalala',
			rows: 0,
		});
	});
});