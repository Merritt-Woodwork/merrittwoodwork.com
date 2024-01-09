/**
 * The main JavaScript entrypoint
 *
 * @note All scripts are included via /gulp/tasks/assets.js
 */

(function() {

  // visual grid
  var k = new Kibo();
  k.down(['g'], function() {
    $('body').addClass('grid');
  }).up('g', function() {
    $('body').removeClass('grid');
  });

  // fade-in content
  $(document).ready(function() {
     var html = $('html');
     var header = $('.fixed-header-wrapper'); // hack for IE 11 which made header visible otherwise
     setTimeout(function(){
      $(header).removeClass('load').addClass('loaded');
      $(html).removeClass('load').addClass('loaded');
     }, 250);
  });
  
  // hide jobs banner content
  $(document).ready(function() {
    var head = $("#iframe").contents().find("head");
    var css = '<style type="text/css">' +
              '#gnewtonGeneric{display:none}; ' +
              '</style>';
    head.append(css);
  });


  // touch links
  $('.overlay').bind('touchstart', function() {});

  // remove 300ms delay on mobile
  $(function() {
      FastClick.attach(document.body);
  });

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

  // Audio players
  var players = Plyr.setup('audio, video, .plyr__video-embed', {
    controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'airplay', 'pip'],
  });

})();
