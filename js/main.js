/*global $:false */
$(document).ready(function () {
	'use strict';

	$('.dropdown-trigger').each(function () {
		var self = $(arguments[1]);


		self.click(function (e) {
			e.preventDefault();

			self.parent().toggleClass('active');

			// bind `mouseup` event
			$(document).on('mouseup', function closeNav(e) {
				self.parent().removeClass('active');

				// unbind `mouseup` event
				$(e.currentTarget).off('mouseup', closeNav);
			});

		});

	});

	var form = $('form');

	if (form.length > 0) {
		form.on('submit', function (e) {
			e.preventDefault();

			// remove all errors first
			form.find('.error').removeClass('error');

			var errors = 0;
			var target = e.currentTarget;

			var firstName = target.firstName;
			var lastName  = target.lastName;
			var email     = target.email;
			var phone     = target.phone;
			var message   = target.message;

			if (!isValid(firstName.value.trim(), /.{3}/)) {
				$(firstName).addClass('error');
				errors += 1;
			}

			if (!isValid(lastName.value.trim(), /.{3}/)) {
				$(lastName).addClass('error');
				errors += 1;
			}

			if (!isValid(email.value.trim(), /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i)) {
				$(email).addClass('error');
				errors += 1;
			}

			if (!isValid(phone.value.trim(), /[0-9\-\(\)\+\s]{11}/)) {
				$(phone).addClass('error');
				errors += 1;
			}

			if (!isValid(message.value.trim(), /.{3}/)) {
				$(message).addClass('error');
				errors += 1;
			}

			if (errors === 0) {
				// disable fields first while sending ajax request
				form.find('input, textarea').prop('disabled', true).css('opacity', '0.7');
				form.find('input[type="submit"]').val('Please Wait...');

				var data = {};

				data.email   = email.value;
				data.phone   = phone.value;
				data.message = message.value;
				data.name    = firstName.value + ' ' + lastName.value;

				$.post('http://gzmail.herokuapp.com', data)
					.done(function (d) {
						form.find('input, textarea').prop('disabled', false).css('opacity', '1').val('');
						form.find('input[type="submit"]').val('SUBMIT');

						$('.flash').addClass('success').html('Message Sent!').slideDown(300, 'swing');
						$('.flash').delay(5000).fadeOut(200);
					});
			}


		});
	}

	function isValid(str, regexp) {
		return regexp.test(str);
	}

});
