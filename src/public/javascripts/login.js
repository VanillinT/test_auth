'use strict';

// validate email and password inputs:
//
$('#loginForm').submit(function (evt) {
	evt.preventDefault(); //stop form from submission
	let $email = $('#email'),
		$password = $('#password'),
		isValid = true,

		validate = el => {
			if(el.val().length < 6) {
				isValid = false;
				showPopover(el, 'Check the input')
			}
		};

	for (let el of [$email, $password]) {
		validate(el);
	}

	isValid ? ($(this)[0].submit()) : false; //if validation is successful submit the form
});