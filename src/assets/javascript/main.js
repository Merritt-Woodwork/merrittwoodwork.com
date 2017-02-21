(function() {


  // visual grid: use 'g' key to toggle body class
  var k = new Kibo();
  k.down(['g'], function() {
    $('body').addClass('grid');
  }).up('g', function() {
    $('body').removeClass('grid');
  });


})();