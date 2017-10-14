$(document).ready(function () {
	$.get("navibar.html", function(data) {
		$("#navibar-placeholder").replaceWith(data);
	});
});