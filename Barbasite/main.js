barba.hooks.enter(() => {
    $(window).scrollTop(0);
});

barba.init({
    transitions: [{
        name: 'transition',
        leave(data) {
            gsap.fromTo('.head',0.7,{y:'0'},{y:'-100%'});
            gsap.fromTo('.content',0.7,{y:'0'},{y:'100%'});
            return gsap.from(data.current.container,0.7, {});
        },
        enter(data) {
            gsap.fromTo('.head',0.7,{y:'-100%'},{y:'0'});
            gsap.fromTo('.content',0.7,{y:'100%'},{y:'0'});
            gsap.from(data.next.container,0.7, {});
        }
    }]
});



// Gestion des raccourcis clavier pour la navigation
$(document).on('keyup', function(event) {
    if (event.key === "t") {
        transitionAndNavigate('team.html');
    } else if (event.key === "s") {
        transitionAndNavigate('shop.html');
    } else if (event.key === "p") {
        transitionAndNavigate('partners.html');
    }
});

function transitionAndNavigate(targetUrl) {
    gsap.fromTo('.head', 0.7, { y: '0' }, { y: '-100%' });
    gsap.fromTo('.content', 0.7, { y: '0' }, { y: '100%' });
    setTimeout(function() { 
        window.location = targetUrl;
    }, 700);
}

// Animation de chargement de page
$(window).on("load", function() {
    gsap.fromTo('.head', 0.7, { y: '-100%' }, { y: '0' });
    gsap.fromTo('.content', 0.7, { y: '100%' }, { y: '0' });
});

// Gestion de l'état actif dans le menu
$('#menu__list .menu__item').on('click', function() {
    $('.menu__item.--is-active').removeClass('--is-active');
    $(this).addClass('--is-active');
});