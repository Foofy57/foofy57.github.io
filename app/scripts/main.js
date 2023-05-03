barba.init({

  transitions: [{

    name: 'transition',

    leave(data) {
      // gsap.fromTo('.head',0,{opacity:'0'},{opacity:'1'});
      gsap.fromTo('.head',0.7,{y:'0'},{y:'-100%'});

      gsap.fromTo('.content',0.7,{y:'0'},{y:'100%'});
      // gsap.fromTo('.wipe',0.2,{y:"100%",duration:1,stagger:0.1},{y:"0%",duration:1,stagger:0.1});

      return gsap.from(data.current.container,0.7, {
        
      });
    },

    enter(data) {
      // gsap.fromTo('.wipe',1,{y:"0",duration:1,stagger:0.1},{y:"-100%",duration:1,stagger:0.1});

      gsap.fromTo('.head',0.7,{y:'-100%'},{y:'0'});

      gsap.fromTo('.content',0.7,{y:'100%'},{y:'0'});

      gsap.from(data.next.container,0.7, {
        
      });
    }
  }]
});


document.addEventListener("keyup", function(event) {
  if (event.keyCode == 84) {
    gsap.fromTo('.head',0.7,{y:'0'},{y:'-100%'});
    gsap.fromTo('.content',0.7,{y:'0'},{y:'100%'});
    setTimeout(function() { 
      window.location = 'team.html';
    }, 700);
  }
});

document.addEventListener("keyup", function(event) {
  if (event.keyCode == 83) {
    gsap.fromTo('.head',0.7,{y:'0'},{y:'-100%'});
    gsap.fromTo('.content',0.7,{y:'0'},{y:'100%'});
    setTimeout(function() { 
      window.location = 'shop.html';
    }, 700);
  }
});

document.addEventListener("keyup", function(event) {
  if (event.keyCode == 80) {
    gsap.fromTo('.head',0.7,{y:'0'},{y:'-100%'});
    gsap.fromTo('.content',0.7,{y:'0'},{y:'100%'});
    setTimeout(function() { 
      window.location = 'partners.html';
    }, 700);
  }
});

window.addEventListener("load", (event) => {
  gsap.fromTo('.head',0.7,{y:'-100%'},{y:'0'});
  gsap.fromTo('.content',0.7,{y:'100%'},{y:'0'});
});




var btnContainer = document.getElementById('menu__list');
var btns = btnContainer.getElementsByClassName('menu__item');

// Loop through the buttons and add the active class to the current/clicked button
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener('click', function() {
    var current = document.getElementsByClassName('--is-active');

    // If there's no active class
    if (current.length > 0) {
      current[0].className = current[0].className.replace(' --is-active', '');
    }

    // Add the active class to the current/clicked button
    this.className += ' --is-active';
  });
}