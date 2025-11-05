"use strict";



gsap.registerPlugin(ScrollTrigger, ScrollSmoother, DrawSVGPlugin);




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
function scrollTriggerHeader() {
  ScrollTrigger.matchMedia({
    '(min-width: 801px)': function minWidth801px() {
      ScrollTrigger.create({
        trigger: '.mainHeader:not(.mainHeader--hidden) .menu',
        start: 'top top',
        end: '+=0',
        onEnter: function onEnter() {
          $('.mainHeader:not(.mainHeader--hidden)').addClass('mainHeader--fixed');
          $('.mainHeader--hidden').addClass('mainHeader--visible');
        },
        onLeaveBack: function onLeaveBack() {
          $('.mainHeader:not(.mainHeader--hidden)').removeClass('mainHeader--fixed');
          $('.mainHeader--hidden').removeClass('mainHeader--visible');
        }
      });
    },
    '(max-width: 800px)': function maxWidth800px() {
      ScrollTrigger.create({
        markers: false,
        trigger: '.mainHeader:not(.mainHeader--hidden) .menu',
        start: 'bottom top',
        end: '+=0',
        onEnter: function onEnter() {
          $('.mainHeader:not(.mainHeader--hidden)').addClass('mainHeader--fixed');
          $('.mainHeader--hidden').addClass('mainHeader--visible');
        },
        onLeaveBack: function onLeaveBack() {
          $('.mainHeader:not(.mainHeader--hidden)').removeClass('mainHeader--fixed');
          $('.mainHeader--hidden').removeClass('mainHeader--visible');
        }
      });
    }
  });
}
function revealBlock() {
  $('.block').each(function () {
    gsap.fromTo($(this), {
      y: 200,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: this,
        start: 'top-=100 bottom',
        end: 'top+=200',
        scrub: true
      }
    });
  });
}
function revealBlockDefault() {
  $('.block').each(function () {
    gsap.fromTo('.block', {
      y: 200,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.2,
      ease: 'power2.out'
    });
  });
}

function revealFooter() {
  $('.mainFooter').each(function () {
    gsap.fromTo('.mainFooter', {
      y: 200,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.7,
      stagger: 0.2,
      ease: 'power2.out'
    });
  });
}


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



let player;
let ytApiReady = false;

// Callback quand l'API YouTube est prête
function onYouTubeIframeAPIReady() {
  ytApiReady = true;
  createYouTubePlayerIfNeeded();
}

function createYouTubePlayerIfNeeded() {
  const container = document.querySelector("#banner__iframe");
  if (!container || container.dataset.playerInitialized) return;

  player = new YT.Player("banner__iframe", {
    events: {
      onReady: onPlayerReady,
    },
  });

  container.dataset.playerInitialized = true;
}

function onPlayerReady() {
  player.mute();
  player.playVideo();
  attachVideoControls();
}

function attachVideoControls() {
  $(".play-pause").off("click").on("click", function () {
    const state = player.getPlayerState();
    if (state === 1) {
      player.pauseVideo();
      $(this).addClass("paused");
    } else {
      player.playVideo();
      $(this).removeClass("paused");
    }
  });

  $(".mute-unmute").off("click").on("click", function () {
    if (player.isMuted()) {
      player.unMute();
      $(this).addClass("muted");
    } else {
      player.mute();
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

function init() {
  barba.hooks.before(function () {});
  barba.hooks.after(function () {});
  barba.hooks.enter(function () {
    // window.scrollTo(0, 0);
    // ScrollTrigger.refresh();

    
  });
  barba.init({
    transitions: [{
      name: 'default-transition',
      once: function once(_ref) {
        var current = _ref.current,
          next = _ref.next;
        var smoother = null;

          smoother = createScrollSmoother();
        
        ScrollTrigger.refresh();
        scrollToFirst()
        // var $mainHeader = $('.mainHeader:not(.mainHeader--hidden)');
        // var $bodyContainer = $('body');
        // $bodyContainer.prepend($mainHeader.clone().addClass('mainHeader--hidden'));
        // var mainheader = $('.mainHeader:not(.mainHeader--hidden)');
        // if (next.namespace === 'default') {
        //   mainheader.css('height', '25svh');
        //   revealBlockDefault();
        // } else if (next.namespace === 'home') {
        //   // mainheader.css('height', '100svh');
        //   revealBlock();
        // }
        // scrollTriggerHeader();
        // setTimeout(function () {
        //   gsap.fromTo('body', 0.3, {
        //     opacity: '0'
        //   }, {
        //     opacity: '1'
        //   });
        // }, 300);
        // gsap.fromTo('.mainHeader .logo', 1, {
        //   x: -600
        // }, {
        //   x: 0
        // });

        // revealFooter();
        // $('.burger-menu').on('click', function () {
        //   var isExpanded = $(this).attr('aria-expanded') === 'true';
        //   $(this).attr('aria-expanded', !isExpanded);
        //   if (isExpanded) {
        //     if (smoother) {
        //       smoother.paused(false);
        //     }
        //     $(this).next('.menu').css('visibility', 'hidden');
        //   } else {
        //     if (smoother) {
        //       smoother.paused(true);
        //     }
        //     $(this).next('.menu').css('visibility', 'visible');
        //     $('.burger-menu-close').attr('aria-expanded', 'true');
        //   }
        // });
        // $(document).on('click', function (e) {
        //   var $menu = $('.menu');
        //   if ($menu.is(e.target) && $menu.has(e.target).length === 0) {
        //     $('.burger-menu-close').attr('aria-expanded', 'false');
        //     $('.burger-menu').attr('aria-expanded', 'false');
        //     if (smoother) {
        //       smoother.paused(false);
        //     }
        //   }
        // });
        // $('.burger-menu-close').on('click', function () {
        //   $('.burger-menu-close').attr('aria-expanded', 'false');
        //   $('.burger-menu').attr('aria-expanded', 'false');
        //   if (smoother) {
        //     smoother.paused(false);
        //   }
        // });
      },
      // afterLeave: function afterLeave(data) {
      //   var triggers = ScrollTrigger.getAll();
      //   triggers.forEach(function (trigger) {
      //     return trigger.kill();
      //   });
      // },
      // beforeEnter: function beforeEnter(_ref2) {
      //   var current = _ref2.current,
      //     next = _ref2.next;
      // },
      enter: function enter(_ref3) {
        var current = _ref3.current,
          next = _ref3.next;
        setTimeout(function () {
          $('.mainHeader:not(.mainHeader--hidden)').removeClass('mainHeader--fixed');
          $('.mainHeader--hidden').removeClass('mainHeader--visible');
        }, 10);
        if (current.namespace === 'home' && next.namespace === 'default') {
          gsap.fromTo('.mainHeader:not(.mainHeader--hidden)', 1.5, {
            // height: '100svh'
          }, {
            height: '25svh'
          });
        }
        if (current.namespace === 'default' && next.namespace === 'home') {
          gsap.fromTo('.mainHeader:not(.mainHeader--hidden)', 1.5, {
            height: '25svh'
          }, {
            // height: '100svh'
          });
        }
        if (current.namespace === 'default' && next.namespace === 'default') {
          gsap.fromTo('.mainHeader:not(.mainHeader--hidden)', 1.5, {
            height: '25svh'
          }, {
            height: '25svh'
          });
        }
        revealFooter();
        if (next.namespace === 'default') {
          revealBlockDefault();
        } else if (next.namespace === 'home') {
          revealBlock();
        }
        var smoother = null;

          smoother = createScrollSmoother();
        
        ScrollTrigger.refresh();
      },
      after: function after(_ref4) {
        var current = _ref4.current,
        next = _ref4.next;
        var smoother = null;
   
          smoother = createScrollSmoother();
        
        ScrollTrigger.refresh();
        if (ytApiReady) {
          createYouTubePlayerIfNeeded();
          
        }
        scrollToFirst()
        $('.mainHeader--hidden').remove();
        var $mainHeader = $('.mainHeader:not(.mainHeader--hidden)');
        var $bodyContainer = $('body');
        $bodyContainer.prepend($mainHeader.clone().addClass('mainHeader--hidden'));
        scrollTriggerHeader();
        if (current.namespace === 'default' && next.namespace === 'home' || current.namespace === 'home' && next.namespace === 'default') {
          if (smoother) {
            smoother.paused(true);
          }
          if (window.matchMedia('(max-width: 800px)').matches) {
            $('body').css('overflow', 'hidden');
          }
          setTimeout(function () {
            if (smoother) {
              smoother.paused(false);
            }
            if (window.matchMedia('(max-width: 800px)').matches) {
              $('body').css('overflow', 'visible');
            }
            ScrollTrigger.refresh();
          }, 1500);
        } else {
          if (smoother) {
            smoother.paused(false);
          }
        }
        $('.burger-menu').on('click', function () {
          var isExpanded = $(this).attr('aria-expanded') === 'true';
          $(this).attr('aria-expanded', !isExpanded);
          if (isExpanded) {
            if (smoother) {
              smoother.paused(false);
            }
            $(this).next('.menu').css('visibility', 'hidden');
          } else {
            if (smoother) {
              smoother.paused(true);
            }
            $(this).next('.menu').css('visibility', 'visible');
            $('.burger-menu-close').attr('aria-expanded', 'true');
          }
        });
        $(document).on('click', function (e) {
          var $menu = $('.menu');
          if ($menu.is(e.target) && $menu.has(e.target).length === 0) {
            $('.burger-menu-close').attr('aria-expanded', 'false');
            $('.burger-menu').attr('aria-expanded', 'false');
            if (smoother) {
              smoother.paused(false);
            }
          }
        });
        $('.burger-menu-close').on('click', function () {
          $('.burger-menu-close').attr('aria-expanded', 'false');
          $('.burger-menu').attr('aria-expanded', 'false');
          if (smoother) {
            smoother.paused(false);
          }
        });
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
});




$(window).on('scroll', function() {
  if ($(this).scrollTop() > 0) {
    $('.mainHeader').addClass('mainHeader--scrolled');
  } else {
    $('.mainHeader').removeClass('mainHeader--scrolled');
  }
});






// window.addEventListener("load", () => {
//   let attempts = 0;
//   const maxAttempts = 20;

//   const hideElfsightLink = () => {
//     const links = document.querySelectorAll('a[href*="elfsight.com/google-reviews-widget"]');
//     links.forEach(el => el.remove());
//     attempts++;
//     if (attempts < maxAttempts && links.length === 0) {
//       setTimeout(hideElfsightLink, 500);
//     }
//   };

//   hideElfsightLink();
// });