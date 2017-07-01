$(document).ready(function(){
	
	var user = sessionStorage.getItem('username');
	
	if(user !== 'adminedit') {
		$('#AddResident').hide();
		$('#ReportIncident').hide();
	}
});