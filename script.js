$(document).ready(function() {
	$("#contentSteps").hide();

	$("#addBooking").click(function(){
		$("#contentMain").hide();
		$("#contentSteps").show();
	})

	$("#contentSteps > div").smartWizard({
		theme: 'arrows'
	});
})