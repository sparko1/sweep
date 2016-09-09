jQuery(function() {

  jQuery('a[href^="#pc-cards-row"]').on('click',function (e) {
      e.preventDefault();

      var target = this.hash;
      var jQuerytarget = jQuery(target);

      jQuery('html, body').stop().animate({
          'scrollTop': jQuerytarget.offset().top
      }, 900, 'swing', function () {
          window.location.hash = target;
      });
  });

}); // end enclosing function
