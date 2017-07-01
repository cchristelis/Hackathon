function doCheckIDSubmitRequest() {

	var id = $('#ResidentIDNumber').val();

	var jsonID = {
		'ID' : id,
	};

	$.ajax({
		type: 'POST',
		dataType: "json",
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		data: { id: jsonID },
		url: "checkResidentID.php",
		statusCode: {
			404: function() {
			  alert( "Page not found" );
			}
		},
		success: function(data) {

			alert(data);

			var result = $.trim(data);
			
			if(result === 'true') {
				return true;
			}
			else if(result === 'false') {
				return false;
			}
		}
	});
}