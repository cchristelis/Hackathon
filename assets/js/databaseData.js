//********************* Table Functions ******************
//Building Table
function saveBuildingTable(tableDataJSON) {

	var tableDataArray = $.parseJSON(tableDataJSON);
	var columnCount = 0
	var buildingSearchJSON = [];

	$.each(tableDataArray, function(index, value) {
 
		var colName = setColumnNameBuilding(columnCount); 		//setTableColumns.js
	
		//create JSON search object for table
		buildingSearchJSON.push({
	        column: colName,
	        value: value
	    });

		if(columnCount === getMaxColumnsForRowBuilding()) {		//if max columns in table -> reset to start at new row
 			columnCount = 0;
 		}
 		else {
 			columnCount++;
 		}
	});

	//Test response data
	/*alert(JSON.stringify(buildingSearchJSON));*/

	//place JSON object in session storage to access on other pages
	sessionStorage.setItem('buildingSearchJSON', JSON.stringify(buildingSearchJSON));
}

//Resident Table
function saveResidentTable(tableDataJSON) {
	
	var tableDataArray = $.parseJSON(tableDataJSON);
	var columnCount = 0;
	var residentSearchJSON = [];
	
	$.each(tableDataArray, function(index, value) {
 
		var colName = setColumnNameResident(columnCount); 		//setTableColumns.js
		
		//create JSON search object for table
		residentSearchJSON.push({
	        column: colName,
	        value: value
	    });
		
		if(columnCount === getMaxColumnsForRowResident()) {		//if max columns in table -> reset to start at new row
 			columnCount = 0;
 		}
 		else {
 			columnCount++;
 		}
	});
	
	//Test response data
	/*alert(JSON.stringify(residentSearchJSON));*/

	//place JSON object in session storage to access on other pages
	sessionStorage.setItem('residentSearchJSON', JSON.stringify(residentSearchJSON));
}

//Incident Table
function saveIncidentTable(tableDataJSON) {
	
	var tableDataArray = $.parseJSON(tableDataJSON);
	var columnCount = 0;
	var incidentSearchJSON = [];
	
	$.each(tableDataArray, function(index, value) {
 
		var colName = setColumnNameIncident(columnCount); 		//setTableColumns.js
		
		//create JSON search object for table
		incidentSearchJSON.push({
	        column: colName,
	        value: value
	    });
		
		if(columnCount === getMaxColumnsForRowIncident()) {		//if max columns in table -> reset to start at new row
 			columnCount = 0;
 		}
 		else {
 			columnCount++;
 		}
	});
	
	//Test response data
	/*alert(JSON.stringify(incidentSearchJSON));*/

	//place JSON object in session storage to access on other pages
	sessionStorage.setItem('incidentSearchJSON', JSON.stringify(incidentSearchJSON));

}

//Save Child Table
function saveChildTable(tableDataJSON) {

	var tableDataArray = $.parseJSON(tableDataJSON);
	var columnCount = 0;
	var childSearchJSON = [];
	
	$.each(tableDataArray, function(index, value) {
 
		var colName = setColumnNameChild(columnCount); 			//setTableColumns.js
		
		//create JSON search object for table
		childSearchJSON.push({
	        column: colName,
	        value: value
	    });
		
		if(columnCount === getMaxColumnsForRowChild()) {		//if max columns in table -> reset to start at new row
 			columnCount = 0;
 		}
 		else {
 			columnCount++;
 		}
	});
	
	//Test response data
	/*alert(JSON.stringify(childSearchJSON));*/

	//place JSON object in session storage to access on other pages
	sessionStorage.setItem('childSearchJSON', JSON.stringify(childSearchJSON));
}

//Parent Info Table 
//INFO: (**not in db -> data query from Resident table, using Parent Ref Table (resID))
function saveParentInfoTable(tableDataJSON) {
	
	var tableDataArray = $.parseJSON(tableDataJSON);
	var columnCount = 0;
	var parentInfoSearchJSON = [];
	
	$.each(tableDataArray, function(index, value) {
 
 		//same as resident
		var colName = setColumnNameResident(columnCount); 		//setTableColumns.js
		
		//create JSON search object for table
		parentInfoSearchJSON.push({
	        column: colName,
	        value: value
	    });
		
		if(columnCount === getMaxColumnsForRowParent()) {		//if max columns in table -> reset to start at new row
 			columnCount = 0;
 		}
 		else {
 			columnCount++;
 		}
	});
	
	//Test response data
	/*alert(JSON.stringify(parentInfoSearchJSON));*/

	//place JSON object in session storage to access on other pages
	sessionStorage.setItem('parentInfoSearchJSON', JSON.stringify(parentInfoSearchJSON));
}
