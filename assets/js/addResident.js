$(document).ready(function() {

/*	hideAllForms();*/

	$('#statusText').hide();
	$('#IDCheck').show();
	$('#formIdCheck').addClass("fieldsetFormEnabled");

	//SCRIPT TO CHANGE VISIBILITY ON SUCCESS OF PREVOUIS FORM
	$(".hidethis").hide();
	
	$("#rMarried1").click(function () {
		$(".hidethis").show();
	});
	
	$("#rMarried2").click(function () {
		$(".hidethis").hide();
	});


	//event handlers for forms
	$('#btnCheckIDSubmit').click(function(e) {

		e.preventDefault();

		//check if resident exists in db
		if(doCheckIDSubmitRequest()) {  //doCheckIDSubmitRequest.js

			//add styling to current fieldset
			$('#building').show();
			$('#formIdCheck').removeClass("fieldsetFormEnabled");
			$('#formBuilding').addClass("fieldsetFormEnabled");
		}
		else {
			var id = $('#ResidentIDNumber').val();
			$('#statusText').html("Person with ID:" + id + " is already a resident.");
		}

	});

	$('#btnBuildingSubmit').click(function(e) {

		e.preventDefault();

		//save user input
		sessionStorage.setItem('inpPriAddress', $('#inpPriAddress').val());
		sessionStorage.setItem('inpSecAddress', $('#inpSecAddress').val());
		sessionStorage.setItem('inpTerAddress', $('#inpTerAddress').val());
		sessionStorage.setItem('inpHouseOwner', $('#inpHouseOwner').val());

		//get selected options' values
		var buildingMaterial = $('#inpBuildingMaterial option:selected').text();
		var buildingType = $('#inpBuildingType option:selected').text();

		sessionStorage.setItem('buildingMaterial', buildingMaterial);
		sessionStorage.setItem('buildingType', buildingType);

		//add styling to current fieldset
		$('#resident').show();
		$('#formIdCheck').removeClass("fieldsetFormEnabled");
		$('#formBuilding').removeClass("fieldsetFormEnabled");
		$('#formResident').addClass("fieldsetFormEnabled");
	});

	$('#btnResidentSubmit').click(function(e) {

		e.preventDefault();

		sessionStorage.setItem('inpFullName', $('#inpFullName').val());
		sessionStorage.setItem('inpLastName', $('#inpLastName').val());
		sessionStorage.setItem('inpMarriedID', $('#inpMarriedID').val());
		sessionStorage.setItem('rSex', $("input[name='rSex']:checked").val());
		sessionStorage.setItem('rResidentRace', $("input[name='rResidentRace']:checked").val());
		sessionStorage.setItem('rEducation', $("input[name='rEducation']:checked").val());
		sessionStorage.setItem('rIncome', $("input[name='rIncome']:checked").val());


		sessionStorage.setItem('inpPostBox', $("#inpPostBox").val());
		sessionStorage.setItem('inpPostCode', $("#inpPostCode").val());
		sessionStorage.setItem('inpLPostArea', $("#inpLPostArea").val());

		sessionStorage.setItem('inpPhoneNumber', $("#inpPhoneNumber").val());
		sessionStorage.setItem('inpEmail', $("#inpEmail").val());

		sessionStorage.setItem('resNumberChildren', $("#resNumberChildren").val());

		//add styling to current fieldset

		if($("#resNumberChildren").val().length === 0) {
			$("#btnSave").removeAttr("disabled");
		}
		else {

		var numberOfChildren = $("#resNumberChildren").val();

		for (i = 0; i < numberOfChildren; i++) { 
	    	
			//create child forms for number of children specified
			
			var childForm = '<fieldset id="formChild' + i + '">' + '<h3>Full Name</h3>' + '<input id="CFullName" type="text" placeholder="Full Name...">' +
			'<input id="CNickName" type="text" placeholder="What do people call you...">' +
			'<input id="CLastName" type="text" placeholder="Last Name...">' +				
			'<h3>Age</h3>' +
			'<input id="CAge" type="text" placeholder="Age...">' +
			'<h3 class="radio-toolbar">Sex<br></br>' +
			'<input type="radio" id="crSexMale" name="crSex" value="Male">' +
			'<label for="crSexMale">Male</label>' +
			'<input type="radio" id="crSexFemale" name="crSex"value="Female" checked>' +
			'<label for="crSexFemale">Female</label>' +
			'</h3>' +
			'<h3 class="radio-toolbar">Race <br></br>' +
			'<input type="radio" id="cradio1" name="rChildRace" value="Not Given" checked>' +
			'<label for="cradio1">Other</label>' +
			'<input type="radio" id="cradio2" name="rChildRace" value="Black">' +
			'<label for="cradio2">Black</label>' +
			'<input type="radio" id="cradio3" name="rChildRace" value="White">' +
			'<label for="cradio3">White</label>' +
			'<input type="radio" id="cradio4" name="rChildRace" value="Coloured">' +
			'<label for="cradio4">Coloured</label>' +
			'<input type="radio" id="cradio5" name="rChildRace" value="Asian">' +
			'<label for="cradio5">Asian</label>' + 
			'<input type="radio" id="cradio6" name="rChildRace" value="Indian">' +
			'<label for="cradio6">Indian</label>' +
			'</h3>' +
			'<h3>ID Number</h3>' +
			'<input id="CIDNumber" type="text" placeholder="ID Number...">' +
			'<br></br>' +
			'<br></br>'	+						
			'<button type="submit" class="btn dark-orange-btn" id="btnChildSubmit' + i + '"' + '>Add Child</button>' +
			'<br></br>'	+
			'</fieldset>';

			$('#childForms').append(childForm);

			$('#children').show();
			$('#formIdCheck').removeClass("fieldsetFormEnabled");
			$('#formBuilding').removeClass("fieldsetFormEnabled");
			$('#formResident').removeClass("fieldsetFormEnabled");
			$('#formChild').addClass("fieldsetFormEnabled");
		}
	});

	$('#btnChildSubmit').click(function(e) {

		e.preventDefault();

		var numberOfChildren = $("#resNumberChildren").val();

		for (i = 0; i < numberOfChildren; i++) { 

			

		}

		$("#btnSave").removeAttr("disabled");
	});

	$('#btnSave').click(function(e) {

		e.preventDefault();
		location.href = "ViewData.html";

		addResidentToDatabaseRequest(); //addResidentToDatabaseRequest.js
	});

	function hideAllForms() {

		//hide all fieldset styles
		$('#IDCheck').hide();
		$('#building').hide();
		$('#resident').hide();
		$('#children').hide();
	}

});