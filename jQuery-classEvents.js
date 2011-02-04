/*!
 * jQuery classEvents
 * 
 * Copyright (c) 2011 Jacob Swartwood
 */

(function( $, undefined ) {
	if ($.classchangeNamespace !== undefined) return;
	
	$.classchangeNamespace = false;
	
	function evtName( val ) {
		return "classchange" + ($.classchangeNamespace ? "." + val : "");
	}
	
	var CHANGE_EVT = "classchange"
		evts = [
			{
				"name": "addClass",
				"func": function( value ) {
					value = (value || "").split(" ");
					for (var i = 0, j = value.length; i < j; i++) {
						$(this).triggerHandler(evtName(value[i]), { "class": value[i], "action": "add" });
					}
				}
			},
			{
				"name": "removeClass",
				"func": function( value, oldClassName ) {
					value = (value || oldClassName || "").split(" ");
					for (var i = 0, j = value.length; i < j; i++) {
						$(this).triggerHandler(evtName(value[i]), { "class": value[i], "action": "remove" });
					}
				}
			},
			{
				"name": "toggleClass",
				"func": function( value, oldClassName ) {
					var newClassName = this.className;
					if ($.type(value) !== "string" && oldClassName !== newClassName) {
						value = (newClassName || oldClassName || "").split(" ");
						for (var i = 0, j = value.length; i < j; i++) {
							$(this).triggerHandler(evtName(value[i]), { "class": value[i], "action": oldClassName ? "add" : "remove" });
						}
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
					action.func.call(this, value, oldClassName);
				});
			};
		})(evts[i]);
	}
	
})(jQuery);