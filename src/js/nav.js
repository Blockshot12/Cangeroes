/**
 * Nav.
 *
 * @since 1.0.0
 * @author Blockshot
 */
+ function($) {
  "use strickt";

  //console.log('nav.js');

  $('.menu-item--active-trail').addClass('open');

  $('.menu-item--active-trail.megamenu').removeClass('open');

  $('.menu-item--expanded > a').click(function(e) {
    if (!$(this).parent('.menu-item').hasClass('open')) {

      $('.open > .menu').slideToggle(300, function() {
        $('.open').toggleClass('open');
      });
    }

    $(this).next('.menu').slideToggle(300, function() {
      $(this).parent('.menu-item').toggleClass('open');
    });

    e.preventDefault();
  });

}(jQuery);
