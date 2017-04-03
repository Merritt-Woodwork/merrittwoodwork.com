(function() {

  // visual grid
  var k = new Kibo();
  k.down(['g'], function() {
    $('body').addClass('grid');
  }).up('g', function() {
    $('body').removeClass('grid');
  });

  // touch links
  $(document).ready(function() {
    $('.touch a').bind('touchstart', function(e) {
      $(this).toggleClass('touched');
    });
  });

  // remove 300ms delay on mobile
  $(function() {
      FastClick.attach(document.body);
  });

  // fade-in content
  var main = $('main');
  setTimeout(function(){
    $(main).fadeIn().removeClass('load').addClass('loaded');
  }, 250);

  // mobile menu
  (function() {
    var triggerBttn = document.getElementById( 'trigger-overlay' ),
      overlay = document.querySelector( 'div.overlay' ),
      body = document.querySelector( 'body' ),
      burger = document.querySelector(".c-hamburger");
      closeBttn = overlay.querySelector( 'button.overlay-close' );
      transEndEventNames = {
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'msTransition': 'MSTransitionEnd',
        'transition': 'transitionend'
      },
      transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
      support = { transitions : Modernizr.csstransitions };

    function toggleOverlay() {
      if( classie.has( overlay, 'open' ) ) {
        classie.remove( overlay, 'open' );
        classie.remove( burger, 'is-active' );
        classie.add( overlay, 'close' );
        classie.remove( body, 'open' );
        var onEndTransitionFn = function( ev ) {
          if( support.transitions ) {
            if( ev.propertyName !== 'visibility' ) return;
            this.removeEventListener( transEndEventName, onEndTransitionFn );
          }
          classie.remove( overlay, 'close' );
        };
        if( support.transitions ) {
          overlay.addEventListener( transEndEventName, onEndTransitionFn );
        }
        else {
          onEndTransitionFn();
        }
      }
      else if( !classie.has( overlay, 'close' ) ) {
        classie.add( overlay, 'open' );
        classie.add( body, 'open' );
        classie.add( burger, 'is-active' );
      }
    }

    triggerBttn.addEventListener( 'click', toggleOverlay );
    closeBttn.addEventListener( 'click', toggleOverlay );
  })();

  // hamburger
  var toggle = document.querySelector(".c-hamburger");

    toggleHandler(toggle);

    function toggleHandler(toggle) {
      toggle.addEventListener( "click", function(e) {
        e.preventDefault();
        (this.classList.contains("is-active") === true) ? this.classList.remove("is-active") : this.classList.add("is-active");
      });
    }

})();