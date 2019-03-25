'use strict';

$('#signupForm').submit(function (evt) {
	evt.preventDefault(); //prevent automatic form submission

	let isValid = true,
		$email = $('#email'),
		$pw = $('#password'),
		$name = $('#name'),
		$surname = $('#surname'),
		$bday = $('#bday'),

		nameInvalid = (str) => (/[^a-zA-Z\s]/.test(str)), // returns true if string contains anything but letters
		setInvalid = function (el, text) { //sets isValid to false and shows a warning
			isValid = false;
			showPopover(el, text);
		};

	// checking if every input element's value is of required length,
	// setting isValid to false and showing popovers otherwise

	// email
	if ($email.val().length === 0)
		setInvalid($email, 'Email must be specified');

	// password
	if ($pw.val().length < 7)
		setInvalid($pw, 'Password is too short');
	else if ($pw.val().length > 21)
		setInvalid($pw, 'Password is too long');

	// name
	if ($name.val().length < 2)
		setInvalid($name, 'Name should be at least 2 characters long');
	else if (nameInvalid($name.val()))
		setInvalid($name, 'Name should only contain letters')

	// surname
	if ($surname.val().length < 2)
		setInvalid($surname, 'Surname should be at least 3 characters long');
	else if (nameInvalid($surname.val()))
		setInvalid($surname, 'Surname should only contain letters')

	// birthday
	if (!$bday.val())
		setInvalid($bday, 'Please enter your birth date');

	let ageMs = Date.now() - new Date($bday.val()).getTime(), //difference in milliseconds
		ageDate = new Date(ageMs), // milliseconds from epoch
		age = Math.abs(ageDate.getUTCFullYear() - 1970); //user's age in years

	if (age < 12)
		setInvalid($bday, 'You should be at least 12 years old to register :(');

	isValid ? $(this)[0].submit() : false; //if validation is successful submit the form manually
});