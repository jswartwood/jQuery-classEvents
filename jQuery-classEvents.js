/*!
 * jQuery classEvents
 * 
 * Copyright (c) 2011 Jacob Swartwood
 */

(function( $, undefined ) {
	var baseEvt = "classchange";
	
	function triggerEvts( el, val, action ) {
		var data = { "action": "add" };
		for (var i = 0, j = val.length; i < j; i++) {
			data["class"] = val[i];
			(el = $(el)).triggerHandler(baseEvt + "!", data)
			el.triggerHandler(baseEvt + "." + val[i] + "!", data);  // Possibly replace "!" with ("." + action)
		}
	}
	
	var evts = [
			{
				"name": "addClass",
				"func": function( value ) {
					triggerEvts(this, (value || "").split(" "), "add");
				}
			},
			{
				"name": "removeClass",
				"func": function( value, oldClassName ) {
					triggerEvts(this, (value || oldClassName || "").split(" "), "remove");
				}
			},
			{
				"name": "toggleClass",
				"func": function( value, oldClassName ) {
					var newClassName = this.className;
					if ($.type(value) !== "string" && oldClassName !== newClassName) {
						triggerEvts(this, (newClassName || oldClassName || "").split(" "), oldClassName ? "add" : "remove");
					}
				}
			}
		];
	
	for (var i = 0, j = evts.length; i < j; i++) {
		(function( action ) {
			var oldAction = $.fn[action.name];
			$.fn[action.name] = function( value ) {
				var args = Array.prototype.slice.call(arguments);
				return this.each(function() {
					var oldClassName = this.className;
					oldAction.apply($(this), args);
					// TODO: handle typeof value === "function"
					action.func.call(this, value, oldClassName);
				});
			};
		})(evts[i]);
	}
	
})(jQuery);