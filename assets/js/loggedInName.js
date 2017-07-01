$(document).ready(function(){
	$("#loggedInAsName").html(sessionStorage.getItem('username'));
});