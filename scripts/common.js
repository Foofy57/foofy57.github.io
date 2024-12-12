"use strict";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, DrawSVGPlugin);
function drawSvg() {
  $('.block-header path').each(function () {
    var element = $(this);
    gsap.fromTo(element, {
      drawSVG: '0%'
    }, {
      duration: 2,
      drawSVG: '100%',
      repeat: 0,
      ease: 'power1.inOut',
      onStart: function onStart() {
        setTimeout(function () {
          element.parents('.block-header').addClass('block-header--fill');
        }, 900);
      }
    });
  });
}
function createScrollSmoother() {
  return ScrollSmoother.create({
    smooth: 1.5,
    effects: true,
    // normalizeScroll: true,
    ignoreMobileResize: true,
    smoothTouch: 0.1
    // onFocusIn: () => false,
  });
}
function scrollTriggerHeader() {
  ScrollTrigger.matchMedia({
    '(min-width: 800px)': function minWidth800px() {
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
    '(max-width: 799px)': function maxWidth799px() {
      ScrollTrigger.create({
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
        // lorsque le bas de la fenêtre atteint le haut du block
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
function init() {
  barba.hooks.before(function () {});
  barba.hooks.after(function () {});
  barba.hooks.enter(function () {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  });
  barba.init({
    transitions: [{
      name: 'default-transition',
      once: function once(_ref) {
        var current = _ref.current,
          next = _ref.next;
        var smoother = createScrollSmoother();
        ScrollTrigger.refresh();
        var $mainHeader = $('.mainHeader:not(.mainHeader--hidden)');
        var $bodyContainer = $('body');
        $bodyContainer.prepend($mainHeader.clone().addClass('mainHeader--hidden'));
        var header = $('.block-header');
        var mainheader = $('.mainHeader:not(.mainHeader--hidden)');
        if (next.namespace === 'default') {
          header.css('height', '25dvh');
          mainheader.css('height', '25dvh');
          revealBlockDefault();
        } else if (next.namespace === 'home') {
          header.css('height', '100dvh');
          mainheader.css('height', '100dvh');
          revealBlock();
        }
        scrollTriggerHeader();
        setTimeout(function () {
          gsap.fromTo('body', 0.3, {
            opacity: '0'
          }, {
            opacity: '1'
          });
        }, 300);
        gsap.fromTo('.block-header', 0.7, {
          x: -150
        }, {
          x: 0
        });
        drawSvg();
        revealFooter();
        $('.burger-menu').on('click', function () {
          var isExpanded = $(this).attr('aria-expanded') === 'true';
          $(this).attr('aria-expanded', !isExpanded);
          if (isExpanded) {
            smoother.paused(false);
            $(this).next('.menu').css('visibility', 'hidden');
          } else {
            smoother.paused(true);
            $(this).next('.menu').css('visibility', 'visible');
            $('.burger-menu-close').attr('aria-expanded', 'true');
          }
        });
        $(document).on('click', function (e) {
          var $menu = $('.menu');
          if ($menu.is(e.target) && $menu.has(e.target).length === 0) {
            $('.burger-menu-close').attr('aria-expanded', 'false');
            $('.burger-menu').attr('aria-expanded', 'false');
            smoother.paused(false);
          }
        });
        $('.burger-menu-close').on('click', function () {
          $('.burger-menu-close').attr('aria-expanded', 'false');
          $('.burger-menu').attr('aria-expanded', 'false');
          smoother.paused(false);
        });
      },
      afterLeave: function afterLeave(data) {
        var triggers = ScrollTrigger.getAll();
        triggers.forEach(function (trigger) {
          return trigger.kill();
        });
      },
      beforeEnter: function beforeEnter(_ref2) {
        var current = _ref2.current,
          next = _ref2.next;
      },
      enter: function enter(_ref3) {
        var current = _ref3.current,
          next = _ref3.next;
        setTimeout(function () {
          $('.mainHeader:not(.mainHeader--hidden)').removeClass('mainHeader--fixed');
          $('.mainHeader--hidden').removeClass('mainHeader--visible');
        }, 10);
        if (current.namespace === 'home' && next.namespace === 'default') {
          gsap.fromTo('.mainHeader:not(.mainHeader--hidden)', 1.5, {
            height: '100dvh'
          }, {
            height: '25dvh'
          });
          gsap.fromTo('.block-header', 1.5, {
            height: '100dvh'
          }, {
            height: '25dvh'
          });
        }
        if (current.namespace === 'default' && next.namespace === 'home') {
          gsap.fromTo('.mainHeader:not(.mainHeader--hidden)', 1.5, {
            height: '25dvh'
          }, {
            height: '100dvh'
          });
          gsap.fromTo('.block-header', 1.5, {
            height: '25dvh'
          }, {
            height: '100dvh'
          });
        }
        if (current.namespace === 'default' && next.namespace === 'default') {
          gsap.fromTo('.mainHeader:not(.mainHeader--hidden)', 1.5, {
            height: '25dvh'
          }, {
            height: '25dvh'
          });
          gsap.fromTo('.block-header', 1.5, {
            height: '25dvh'
          }, {
            height: '25dvh'
          });
        }
        drawSvg();
        revealFooter();
        if (next.namespace === 'default') {
          revealBlockDefault();
        } else if (next.namespace === 'home') {
          revealBlock();
        }
        ScrollTrigger.refresh();
      },
      after: function after(_ref4) {
        var current = _ref4.current,
          next = _ref4.next;
        var smoother = createScrollSmoother();
        ScrollTrigger.refresh();
        $('.mainHeader--hidden').remove();
        var $mainHeader = $('.mainHeader:not(.mainHeader--hidden)');
        var $bodyContainer = $('body');
        $bodyContainer.prepend($mainHeader.clone().addClass('mainHeader--hidden'));
        scrollTriggerHeader();
        if (current.namespace === 'default' && next.namespace === 'home' || current.namespace === 'home' && next.namespace === 'default') {
          smoother.paused(true);
          setTimeout(function () {
            smoother.paused(false);
            ScrollTrigger.refresh();
          }, 1500);
        } else {
          smoother.paused(false);
        }
        $('.burger-menu').on('click', function () {
          var isExpanded = $(this).attr('aria-expanded') === 'true';
          $(this).attr('aria-expanded', !isExpanded);
          if (isExpanded) {
            smoother.paused(false);
            $(this).next('.menu').css('visibility', 'hidden');
          } else {
            smoother.paused(true);
            $(this).next('.menu').css('visibility', 'visible');
            $('.burger-menu-close').attr('aria-expanded', 'true');
          }
        });
        $(document).on('click', function (e) {
          var $menu = $('.menu');
          if ($menu.is(e.target) && $menu.has(e.target).length === 0) {
            $('.burger-menu-close').attr('aria-expanded', 'false');
            $('.burger-menu').attr('aria-expanded', 'false');
            smoother.paused(false);
          }
        });
        $('.burger-menu-close').on('click', function () {
          $('.burger-menu-close').attr('aria-expanded', 'false');
          $('.burger-menu').attr('aria-expanded', 'false');
          smoother.paused(false);
        });
      }
    }]
  });
}
$(document).ready(function () {
  init();
});