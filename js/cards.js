jQuery(function() {

  jQuery('.home-card').find('.card-img-holder').hover(

    function(){jQuery(this).children('.pc-curtain').addClass('is-showing')},

    function(){jQuery(this).children('.pc-curtain').removeClass('is-showing')}

	);

}); // end enclosing function
