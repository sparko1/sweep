jQuery(function() {

	jQuery('#pc-footer #footer-section-1').find('.alert').hide();

	jQuery('.close[data-hide]').click(function () {
		jQuery(this).closest('.alert').slideUp();
	});

	jQuery('#phone_alert_trigger').click(function(e) {

       e.preventDefault();

       jQuery('#phone_alert').slideDown();

   });

}); // end enclosing function
