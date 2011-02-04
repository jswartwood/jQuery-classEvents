/*!
 * jQuery classEvents
 * 
 * Copyright (c) 2011 Jacob Swartwood
 */

(function( $ ) {
	// TODO: prevent applying this plugin more than once...
	var evts = [ "addClass", "removeClass" ];
	
	for (var i = 0, j = evts.length; i < j; i++) {
		(function( action ) {
			var oldAction = $.fn[action];
			$.fn[action] = function( value ) {
				var that = oldAction.apply(this, Array.prototype.slice.call(arguments));

				if ($.type(value) === "string") {
					this.trigger("classchange", { "type": action, "class": value });
				}

				return that;
			};
		})(evts[i]);
	}
	
})(jQuery);