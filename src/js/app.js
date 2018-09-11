var appKeyrus = function () {
	var init = function () {
		$( "#send" ).click(function(event) {
			event.preventDefault();
			var email = $('input#txtEmail').val(),
				password = $('input#txtPassword').val();

			email && password ? $('.custom-alert-box-succes').fadeIn() : $('.custom-alert-box-error').fadeIn();
			
			var obj = [
				{
					'email': email,
					'pass': password
				}
			]
			console.log('Info:', obj);
			setTimeout(function(){$('.custom-alert').fadeOut()}, 5000)
		});
	};

	return {init:init};

}();

$(document).ready(function () {
	appKeyrus.init();
});