# jQuery classEvents

This plugin is meant as a helper for OOCSS design patterns.  It was mainly created as an experiment
which would allow state changes (as defined by classNames) to drive additional Javascript changes.
Abstracting animations seem like a reasonable use-case; they could be implemented in JS now, and
eventually be replaced by CSS3 transitions/animations without much refactoring.  Progressive browser
support may be eased with this pattern.

---

## Detail

The **classchange** event fires whenever classes are changed with jQuery.  **Please note that if
classes are changed with standard Javascript or any other library; this event system will likely
fail to trigger.**  The **classchange** event will also fire with a namespace equivalent to the
class added/removed.  Data will also be passed to the event with properties for *action*
(add/remove) and *class*.

---

## Quick usage

	<form id="myForm">
		<input type="text" name="firstName" placeholder="First Name"/>
		<input type="text" name="lastName" placeholder="Last Name"/>
	</form>
	<script type="text/javascript">
		$("#myForm").bind("classchange.dim", function( evt, data ) {
			$(this).find("input").attr("disabled", data.action === "add");
		});
	</script>
