// taken from h5bp
// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

/*
// snippet ready for simple vanilla js dom manipulation
(function(w, d) {
	[].forEach.call(document.getElementsByClassName('js-hplan-Stuff'), function(el) {
		el.doSomething();
	});
	
	// same thing as before
	[].forEach.call(document.querySelectorAll('.js-hplan-Stuff'), function(el) {
		el.doSomething();
	});
	
}(window, document));
*/