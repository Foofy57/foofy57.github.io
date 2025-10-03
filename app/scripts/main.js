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