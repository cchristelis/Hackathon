$(document).ready(function() {

	if(!sessionStorage.getItem('username')) {
		location.href = "../index.html";
	}

	$("#Logout").click(function(event) {

		event.preventDefault();

		if(sessionStorage.getItem('username')) {
			//clear session
			sessionStorage.clear();

			//redirect to home page
			location.href = "../index.html";
		}
	});
});