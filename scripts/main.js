"use strict";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, DrawSVGPlugin, SplitText);


function introDrawSvg() {
  $('.intro__logo svg path').each(function () {
  var element = $(this);
  var intro = $('.intro');
  var logo = $('.mainHeader__logo');

  gsap.fromTo(element, 
    { drawSVG: '0%' },
    { 
      duration: 2,
      drawSVG: '100%',
      repeat: 0,
      ease: 'power1.inOut',
      onStart: function() {
        setTimeout(function() {
          element.parents('.intro__logo').addClass('intro__logo--fill');
        }, 1950);

        setTimeout(function() {
          intro.addClass('intro--fixed');
        }, 2500);

        setTimeout(function() {
          intro.addClass('intro--green');
        }, 2700);

        setTimeout(function() {
          intro.addClass('intro--hidden');
        }, 3500);

        setTimeout(function() {
          logo.addClass('mainHeader__logo--display');
        }, 3500);
      },
    }
  );
});
}

function createScrollSmoother() {
  return ScrollSmoother.create({
    smooth: 1.5,
    effects: true,
    normalizeScroll: true,
    smoothTouch: 0.15,
    onFocusIn: function onFocusIn() {
      return true;
    }
  });
}


function playVideoBanner() {
  const video = $(".banner__video").get(0);

  // --- Play / Pause ---
  $(".play-pause").off("click").on("click", function () {
    if (!video.paused && !video.ended) {
      video.pause();
      $(this).addClass("paused");
    } else {
      video.play();
      $(this).removeClass("paused");
    }
  });

  // --- Mute / Unmute ---
  $(".mute-unmute").off("click").on("click", function () {
    if (video.muted) {
      video.muted = false;
      $(this).addClass("muted");
    } else {
      video.muted = true;
      $(this).removeClass("muted");
    }
  });
}

function scrollToFirst() {
  $('.scrollToFirst').on('click', function (e) {
    e.preventDefault();
    
    const target = document.querySelector('.hero');
    if (!target) return;

    // Récupère le ScrollSmoother si existant
    const smoother = ScrollSmoother.get() || null;

    if (smoother) {
      // Scroll smooth via ScrollSmoother
      smoother.scrollTo(target, true); // true = animate
    } else {
      // Fallback pour mobile / pas de smoother
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}


function swiper() {
  $('.carousel .mySwiper').each(function (index, element) {
    const $this = $(this);
    $this.addClass('swiper-instance-' + index);

    new Swiper('.swiper-instance-' + index, {
      loop: true,
      slidesPerView: 5,
      spaceBetween: 0,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
    });
  });
}



 $('.faq__header button').click(function(){
    const expanded = $(this).attr('aria-expanded') === 'true';
    
    $('.faq__header button').attr('aria-expanded', 'false');
    $('.faq__content').slideUp();
    
    if (!expanded) {
      $(this).attr('aria-expanded', 'true');
      $('#' + $(this).attr('aria-controls')).slideDown();
    }
});

function init() {

  barba.init({
    transitions: [{
      name: 'default-transition',
      once: function once() {

        createScrollSmoother();
        playVideoBanner();
        scrollToFirst();
        
        swiper();
      },
      afterLeave: function afterLeave() {

      },
      beforeEnter: function beforeEnter() {

      },
      enter: function enter() {
       
      },
      after: function after() {

        setTimeout(function() {
          $('.intro__logo, .intro__text, main, .mainHeader').css('opacity', '1');
        }, 100);

        swiper();
        scrollToFirst();
        playVideoBanner();
      }
    }]
  });
}
$(document).ready(function () {
  init();
  introDrawSvg();

  setTimeout(function() {
    $('.intro__logo, .intro__text, main, .mainHeader').css('opacity', '1');
  }, 100);


   const el = document.querySelector('.intro__text');
  // split
  const split = new SplitText(el, { type: "chars" });
  // animez
  gsap.from(split.chars, {
    duration: 1,
    y: 20,
    opacity: 0,
    rotateX: 8,
    scale: 0.98,
    ease: "power3.out",
    stagger: { each: 0.08, from: "start" }
  });

  
});