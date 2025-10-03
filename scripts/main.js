gsap.registerPlugin(ScrollTrigger, ScrollSmoother, DrawSVGPlugin);

// ScrollSmoother
const smoother = ScrollSmoother.create({
  smooth: 1.5,
  effects: true,
  smoothTouch: 0.1,
  ignoreMobileResize: true
});

const anchorLinks = document.querySelectorAll('.mainHeader__nav a[href^="#"]');

anchorLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();

    const targetID = this.getAttribute('href');
    const targetEl = document.querySelector(targetID);

    if (targetEl) {
      const offset = window.innerHeight;
      const targetPosition = targetEl.offsetTop + offset;

      smoother.scrollTo(targetPosition, {
        duration: 2,
        ease: "power2.inOut"
      });
    }
  });
});

// Pin section bg
$('.section').each(function () {
  let section = this;
  let bg = section.querySelector('.section__bg');
  const viewportHeight = window.innerHeight;

  if (bg) {
    gsap.to(bg, {
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom+=' +  viewportHeight + 'px bottom',
        scrub: true,
        markers: false,
        pin: bg,
      }
    });



const span1 = bg.querySelectorAll('span:nth-child(1)');
const span2 = bg.querySelectorAll('span:nth-child(2)');
const span3 = bg.querySelectorAll('span:nth-child(3)');
const span4 = bg.querySelectorAll('span:nth-child(4)');

gsap.fromTo(
  span1,
  { opacity: 0, x: 400, rotate: 0 }, // départ
  { 
    opacity: 1,
    x: 0,
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: 'top+=' + viewportHeight + 'px top',
      scrub: true,
      markers: false,
      onUpdate: self => {
        const progress = self.progress; // de 0 à 1
        span1.forEach(span1 => {
          if (progress >= 0.3) {
            const localProgress = (progress - 0.3) / 0.7; // 0 à 1 sur les 10% restants
            span1.style.transform = `translateX(${gsap.getProperty(span1, "x")}px) rotate(${localProgress * -10}deg)`; 
          }
        });
      }
    }
  }
);

gsap.fromTo(
  span2,
  { opacity: 0, x: -400, rotate: 0 }, // départ
  { 
    opacity: 1,
    x: 0,
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: 'top+=' + viewportHeight + 'px top',
      scrub: true,
      markers: false,
      onUpdate: self => {
        const progress = self.progress; // de 0 à 1
        span2.forEach(span2 => {
          if (progress >= 0.3) {
            const localProgress = (progress - 0.3) / 0.7; // 0 à 1 sur les 10% restants
            span2.style.transform = `translateX(${gsap.getProperty(span2, "x")}px) rotate(${localProgress * 0.5}deg)`; 
          }
        });
      }
    }
  }
);

gsap.fromTo(
  span3,
  { opacity: 0, x: 400, rotate: 0 }, // départ
  { 
    opacity: 1,
    x: 0,
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: 'top+=' + viewportHeight + 'px top',
      scrub: true,
      markers: false,
      onUpdate: self => {
        const progress = self.progress; // de 0 à 1
        span3.forEach(span3 => {
          if (progress >= 0.3) {
            const localProgress = (progress - 0.3) / 0.7; // 0 à 1 sur les 10% restants
            span3.style.transform = `translateX(${gsap.getProperty(span3, "x")}px) rotate(${localProgress * 4}deg)`; 
          }
        });
      }
    }
  }
);

gsap.fromTo(
  span4,
  { opacity: 0, x: -400, rotate: 0 }, // départ
  { 
    opacity: 1,
    x: 0,
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: 'top+=' + viewportHeight + 'px top',
      scrub: true,
      markers: false,
      onUpdate: self => {
        const progress = self.progress; // de 0 à 1
        span4.forEach(span4 => {
          if (progress >= 0.3) {
            const localProgress = (progress - 0.3) / 0.7; // 0 à 1 sur les 10% restants
            span4.style.transform = `translateX(${gsap.getProperty(span4, "x")}px) rotate(${localProgress * -10}deg)`; 
          }
        });
      }
    }
  }
);

  }
});

// Items + SVG
gsap.utils.toArray('.item').forEach(item => {
  const viewportHeight = window.innerHeight;

  // Animation fade + translate
  gsap.fromTo(item, 
    { opacity: 0, y: 400 }, 
    { 
      opacity: 1, 
      y: 0, 
      scrollTrigger: {
        trigger: item,
        start: () => 'top-=200 bottom',
        end: () => 'top+=100 bottom',
        markers: false,
        scrub: true
      } 
    }
  );

  // === Animation du SVG avec DrawSVG ===
  let paths = $(item).find('svg path');

    let tl = gsap.timeline({
    scrollTrigger: {
        trigger: $(item).find('.svgText'), // ✅ le trigger est l'élément global
        start: () => `top+=${0.1 * viewportHeight} bottom`,
        end: () => `top+=${0.5 * viewportHeight} bottom`,
        scrub: true,
        markers: true
    }
    });

    // reset
    gsap.set(paths, { drawSVG: "0%" });

    // séquence
    tl.to(paths.eq(0), { drawSVG: "100%", ease: "power1.inOut" })
    .to(paths.eq(1), { drawSVG: "100%", ease: "power1.inOut" },)
    .to(paths.eq(2), { drawSVG: "100%", ease: "power1.inOut" },);
    
});

    
// gsap.registerPlugin(ScrollTrigger, ScrollSmoother, DrawSVGPlugin);
// function drawSvg() {
//   $('.mainHeader .logo path').each(function () {
//     var element = $(this);
//     gsap.fromTo(element, {
//       drawSVG: '0%'
//     }, {
//       duration: 2,
//       drawSVG: '100%',
//       repeat: 0,
//       ease: 'power1.inOut',
//       onStart: function onStart() {
//         setTimeout(function () {
//           element.parents('.mainHeader .logo').addClass('logo--fill');
//         }, 900);
//       }
//     });
//   });
// }
// function createScrollSmoother() {
//   return ScrollSmoother.create({
//     smooth: 1.5,
//     effects: true,
//     // normalizeScroll: true,
//     ignoreMobileResize: true,
//     smoothTouch: 0.1,
//     onFocusIn: function onFocusIn() {
//       return true;
//     }
//   });
// }
// function scrollTriggerHeader() {
//   ScrollTrigger.matchMedia({
//     '(min-width: 801px)': function minWidth801px() {
//       ScrollTrigger.create({
//         trigger: '.mainHeader:not(.mainHeader--hidden) .menu',
//         start: 'top top',
//         end: '+=0',
//         onEnter: function onEnter() {
//           $('.mainHeader:not(.mainHeader--hidden)').addClass('mainHeader--fixed');
//           $('.mainHeader--hidden').addClass('mainHeader--visible');
//         },
//         onLeaveBack: function onLeaveBack() {
//           $('.mainHeader:not(.mainHeader--hidden)').removeClass('mainHeader--fixed');
//           $('.mainHeader--hidden').removeClass('mainHeader--visible');
//         }
//       });
//     },
//     '(max-width: 800px)': function maxWidth800px() {
//       ScrollTrigger.create({
//         markers: true,
//         trigger: '.mainHeader:not(.mainHeader--hidden) .menu',
//         start: 'bottom top',
//         end: '+=0',
//         onEnter: function onEnter() {
//           $('.mainHeader:not(.mainHeader--hidden)').addClass('mainHeader--fixed');
//           $('.mainHeader--hidden').addClass('mainHeader--visible');
//         },
//         onLeaveBack: function onLeaveBack() {
//           $('.mainHeader:not(.mainHeader--hidden)').removeClass('mainHeader--fixed');
//           $('.mainHeader--hidden').removeClass('mainHeader--visible');
//         }
//       });
//     }
//   });
// }
// function revealBlock() {
//   $('.block').each(function () {
//     gsap.fromTo($(this), {
//       y: 200,
//       opacity: 0
//     }, {
//       y: 0,
//       opacity: 1,
//       ease: 'power3.out',
//       scrollTrigger: {
//         trigger: this,
//         start: 'top-=100 bottom',
//         end: 'top+=200',
//         scrub: true
//       }
//     });
//   });
// }
// function revealBlockDefault() {
//   $('.block').each(function () {
//     gsap.fromTo('.block', {
//       y: 200,
//       opacity: 0
//     }, {
//       y: 0,
//       opacity: 1,
//       duration: 1,
//       stagger: 0.2,
//       ease: 'power2.out'
//     });
//   });
// }
// function revealFooter() {
//   $('.mainFooter').each(function () {
//     gsap.fromTo('.mainFooter', {
//       y: 200,
//       opacity: 0
//     }, {
//       y: 0,
//       opacity: 1,
//       duration: 0.7,
//       stagger: 0.2,
//       ease: 'power2.out'
//     });
//   });
// }
// function init() {
//   barba.hooks.before(function () {});
//   barba.hooks.after(function () {});
//   barba.hooks.enter(function () {
//     window.scrollTo(0, 0);
//     ScrollTrigger.refresh();
//   });
//   barba.init({
//     transitions: [{
//       name: 'default-transition',
//       once: function once(_ref) {
//         var current = _ref.current,
//           next = _ref.next;
//         var smoother = createScrollSmoother();
//         ScrollTrigger.refresh();
//         var $mainHeader = $('.mainHeader:not(.mainHeader--hidden)');
//         var $bodyContainer = $('body');
//         $bodyContainer.prepend($mainHeader.clone().addClass('mainHeader--hidden'));
//         var mainheader = $('.mainHeader:not(.mainHeader--hidden)');
//         if (next.namespace === 'default') {
//           mainheader.css('height', '25svh');
//           revealBlockDefault();
//         } else if (next.namespace === 'home') {
//           mainheader.css('height', '100svh');
//           revealBlock();
//         }
//         scrollTriggerHeader();
//         setTimeout(function () {
//           gsap.fromTo('body', 0.3, {
//             opacity: '0'
//           }, {
//             opacity: '1'
//           });
//         }, 300);
//         gsap.fromTo('.mainHeader .logo', 1, {
//           x: -600
//         }, {
//           x: 0
//         });
//         drawSvg();
//         revealFooter();
//         $('.burger-menu').on('click', function () {
//           var isExpanded = $(this).attr('aria-expanded') === 'true';
//           $(this).attr('aria-expanded', !isExpanded);
//           if (isExpanded) {
//             smoother.paused(false);
//             $(this).next('.menu').css('visibility', 'hidden');
//           } else {
//             smoother.paused(true);
//             $(this).next('.menu').css('visibility', 'visible');
//             $('.burger-menu-close').attr('aria-expanded', 'true');
//           }
//         });
//         $(document).on('click', function (e) {
//           var $menu = $('.menu');
//           if ($menu.is(e.target) && $menu.has(e.target).length === 0) {
//             $('.burger-menu-close').attr('aria-expanded', 'false');
//             $('.burger-menu').attr('aria-expanded', 'false');
//             smoother.paused(false);
//           }
//         });
//         $('.burger-menu-close').on('click', function () {
//           $('.burger-menu-close').attr('aria-expanded', 'false');
//           $('.burger-menu').attr('aria-expanded', 'false');
//           smoother.paused(false);
//         });
//       },
//       afterLeave: function afterLeave(data) {
//         var triggers = ScrollTrigger.getAll();
//         triggers.forEach(function (trigger) {
//           return trigger.kill();
//         });
//       },
//       beforeEnter: function beforeEnter(_ref2) {
//         var current = _ref2.current,
//           next = _ref2.next;
//       },
//       enter: function enter(_ref3) {
//         var current = _ref3.current,
//           next = _ref3.next;
//         setTimeout(function () {
//           $('.mainHeader:not(.mainHeader--hidden)').removeClass('mainHeader--fixed');
//           $('.mainHeader--hidden').removeClass('mainHeader--visible');
//         }, 10);
//         if (current.namespace === 'home' && next.namespace === 'default') {
//           gsap.fromTo('.mainHeader:not(.mainHeader--hidden)', 1.5, {
//             height: '100svh'
//           }, {
//             height: '25svh'
//           });
//         }
//         if (current.namespace === 'default' && next.namespace === 'home') {
//           gsap.fromTo('.mainHeader:not(.mainHeader--hidden)', 1.5, {
//             height: '25svh'
//           }, {
//             height: '100svh'
//           });
//         }
//         if (current.namespace === 'default' && next.namespace === 'default') {
//           gsap.fromTo('.mainHeader:not(.mainHeader--hidden)', 1.5, {
//             height: '25svh'
//           }, {
//             height: '25svh'
//           });
//         }
//         drawSvg();
//         revealFooter();
//         if (next.namespace === 'default') {
//           revealBlockDefault();
//         } else if (next.namespace === 'home') {
//           revealBlock();
//         }
//         var smoother = createScrollSmoother();
//         ScrollTrigger.refresh();
//       },
//       after: function after(_ref4) {
//         var current = _ref4.current,
//           next = _ref4.next;
//         var smoother = createScrollSmoother();
//         ScrollTrigger.refresh();
//         $('.mainHeader--hidden').remove();
//         var $mainHeader = $('.mainHeader:not(.mainHeader--hidden)');
//         var $bodyContainer = $('body');
//         $bodyContainer.prepend($mainHeader.clone().addClass('mainHeader--hidden'));
//         scrollTriggerHeader();
//         if (current.namespace === 'default' && next.namespace === 'home' || current.namespace === 'home' && next.namespace === 'default') {
//           smoother.paused(true);
//           setTimeout(function () {
//             smoother.paused(false);
//             ScrollTrigger.refresh();
//           }, 1500);
//         } else {
//           smoother.paused(false);
//         }
//         $('.burger-menu').on('click', function () {
//           var isExpanded = $(this).attr('aria-expanded') === 'true';
//           $(this).attr('aria-expanded', !isExpanded);
//           if (isExpanded) {
//             smoother.paused(false);
//             $(this).next('.menu').css('visibility', 'hidden');
//           } else {
//             smoother.paused(true);
//             $(this).next('.menu').css('visibility', 'visible');
//             $('.burger-menu-close').attr('aria-expanded', 'true');
//           }
//         });
//         $(document).on('click', function (e) {
//           var $menu = $('.menu');
//           if ($menu.is(e.target) && $menu.has(e.target).length === 0) {
//             $('.burger-menu-close').attr('aria-expanded', 'false');
//             $('.burger-menu').attr('aria-expanded', 'false');
//             smoother.paused(false);
//           }
//         });
//         $('.burger-menu-close').on('click', function () {
//           $('.burger-menu-close').attr('aria-expanded', 'false');
//           $('.burger-menu').attr('aria-expanded', 'false');
//           smoother.paused(false);
//         });
//       }
//     }]
//   });
// }
// $(document).ready(function () {
//   init();
//   function setEqualHeightTitles() {
//     if (window.matchMedia('(min-width: 801px)').matches) {
//       $('.threeBlocks').each(function () {
//         var maxHeight = 0;
//         $(this).find('.threeBlocks__title').each(function () {
//           $(this).css('height', 'auto');
//           maxHeight = Math.max(maxHeight, $(this).outerHeight());
//         });
//         $(this).find('.threeBlocks__title').css('height', maxHeight);
//       });
//     } else {
//       $('.threeBlocks__title').css('height', 'auto');
//     }
//   }
//   setEqualHeightTitles();
//   $(window).on('resize', setEqualHeightTitles);
// });