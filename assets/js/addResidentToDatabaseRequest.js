function addResidentToDatabaseRequest() {

	var inpPriAddress = sessionStorage.getItem('inpPriAddress', $('#inpPriAddress').val());
	var inpSecAddress = sessionStorage.getItem('inpSecAddress', $('#inpSecAddress').val());
	var inpTerAddress = sessionStorage.getItem('inpTerAddress', $('#inpTerAddress').val());
	var inpHouseOwner = sessionStorage.getItem('inpHouseOwner', $('#inpHouseOwner').val());
	var buildingMaterial = sessionStorage.getItem('buildingMaterial', buildingMaterial);
	var buildingType = sessionStorage.getItem('buildingType', buildingType);
	var inpFullName = sessionStorage.getItem('inpFullName', $('#inpFullName').val());
	var inpLastName = sessionStorage.getItem('inpLastName', $('#inpLastName').val());
	var inpMarriedID = sessionStorage.getItem('inpMarriedID', $('#inpMarriedID').val());
	var rSex = sessionStorage.getItem('rSex', $("input[name='rSex']:checked").val());
	var rResidentRace = sessionStorage.getItem('rResidentRace', $("input[name='rResidentRace']:checked").val());
	var rEducation = sessionStorage.getItem('rEducation', $("input[name='rEducation']:checked").val());
	var rIncome = sessionStorage.getItem('rIncome', $("input[name='rIncome']:checked").val());
	var inpPostBox = sessionStorage.getItem('inpPostBox', $("#inpPostBox").val());
	var inpPostCode = sessionStorage.getItem('inpPostCode', $("#inpPostCode").val());
	var inpLPostArea = sessionStorage.getItem('inpLPostArea', $("#inpLPostArea").val());
	var inpPhoneNumber = sessionStorage.getItem('inpPhoneNumber', $("#inpPhoneNumber").val());
	var inpEmail = sessionStorage.getItem('inpEmail', $("#inpEmail").val());
	var rChildNum = sessionStorage.getItem('rChildNum', $("input[name='rChildNum']:checked").val());
	var residentGID = localStorage.getItem('residentGID');

	
}