'use strict';

$('body').outerHeight($(document).height());

//shows a popover with given text above a given jquery object
function showPopover(el, text) {
	el.popover({content:text, trigger:'manual', placement:'top'}).popover('show');
	setTimeout(function() {
		$(el).popover('hide');
	}, 2000);
}