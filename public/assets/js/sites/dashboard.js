$(document).ready(function () {
	$("#get").click(function () {
		$.get("/api/test", function (data, status) {
			alert("Data: " + data + "\nStatus: " + status);
		});
	});
});


// changes text on load
//$("#push-change").load("/api/test");


$("form").submit(function(e) {
	e.preventDefault();
	var txt = $("#take_my_value_to_push").val();
	$.post("/api/test", { number: txt }, function (result) {
		$("#push_change").html(result.number);
	});
});