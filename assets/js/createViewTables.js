function createBuildingTable()	{

	var tableDataSession = sessionStorage.getItem('buildingSearchJSON');
	var tableData = $.parseJSON(tableDataSession);

	var tableColumnRow = '<tr class="buildingsTableColumnRow"></tr>';
	var tableColumnHeading = '<th class="buildingsTableColumnHead">';
	var columnRowCreated = false;
	var countCol = 0;
	var countRow = 0;
	var rowIDName = "";
	var skipColCountBuild = 1;

	$.each(tableData, function(columnEntry, jsonObj) { 
        
        $.each(jsonObj, function(columnValuePair, valueObj) {
            
            if(columnValuePair === "column") {
				
				if(valueObj === 'Geometry ID') {

        			//create new row
        			countRow++;
					rowIDName = "tableBodyRowBuilding" + countRow;
	        		$('#buildingsTableBody').append("<tr id='" + rowIDName + "'" + "></tr>");

	        		if(columnRowCreated === false) {
	        			countCol++;
	        			$('#buildingsTableHead').append(tableColumnRow);

	        			if(countCol === 2) {
	        				columnRowCreated = true;
	        			}
	        		}
					
					skipColCountBuild = 1;
        		}
				
				if(columnRowCreated === false && valueObj !== 'Geometry') {

					$('.buildingsTableColumnRow').append(tableColumnHeading + valueObj + "</th>");		//insert column heading
        		}
        	}
			else if(columnValuePair === "value") {

				if(skipColCountBuild !== 2) {
					$('#' + rowIDName).append("<td class='tableValue'>" + valueObj + "</td>");
				}	
				
				skipColCountBuild++;
        	}
        });
    });
}

function createResidentTable() {
	
	var tableDataSession = sessionStorage.getItem('residentSearchJSON');
	var tableData = $.parseJSON(tableDataSession);

	var tableColumnRow = '<tr id="residentsTableColumnRow"></tr>';
	var tableColumnHeading = '<th class="residentsTableColumnHead">';
	var columnRowCreated = false;
	var countCol = 0;
	var countRow = 0;
	var rowIDName = "";

	$.each(tableData, function(columnEntry, jsonObj) { 
        
        $.each(jsonObj, function(columnValuePair, valueObj) {
            
            if(columnValuePair === "column") {

        		if(valueObj === 'Resident ID') {

        			//create new row
        			countRow++;
					rowIDName = "tableBodyRowResident" + countRow;
	        		$('#residentsTableBody').append("<tr id='" + rowIDName + "'" + "></tr>");

	        		if(columnRowCreated === false) {
	        			countCol++;
	        			$('#residentsTableHead').append(tableColumnRow);

	        			if(countCol === 2) {
	        				columnRowCreated = true;
	        			}
	        		}
        		}

        		if(columnRowCreated === false) {
        			$('#residentsTableColumnRow').append(tableColumnHeading + valueObj + "</th>");		//insert column heading
        		}
        	}
			else if(columnValuePair === "value") {
        		$('#' + rowIDName).append("<td class='tableValue'>" + valueObj + "</td>");
        	}
        });
    });
}

function createIncidentTable() {
	var tableDataSession = sessionStorage.getItem('incidentSearchJSON');
	var tableData = $.parseJSON(tableDataSession);

	var tableColumnRow = '<tr id="incidentsTableColumnRow"></tr>';
	var tableColumnHeading = '<th class="incidentsTableColumnHead">';
	var columnRowCreated = false;
	var countCol = 0;
	var countRow = 0;
	var rowIDName = "";
    var skipColCountInc = 1;

	$.each(tableData, function(columnEntry, jsonObj) { 
        
        $.each(jsonObj, function(columnValuePair, valueObj) {
            
            if(columnValuePair === "column") {

        		if(valueObj === 'Geometry ID') {

        			//create new row
        			countRow++;
					rowIDName = "tableBodyRowIncidents" + countRow;
	        		$('#incidentsTableBody').append("<tr id='" + rowIDName + "'" + "></tr>");

	        		if(columnRowCreated === false) {
	        			countCol++;
	        			$('#incidentsTableHead').append(tableColumnRow);

	        			if(countCol === 2) {
	        				columnRowCreated = true;
	        			}
	        		}
                    
                    skipColCountInc = 1;
        		}

        		if(columnRowCreated === false && valueObj !== 'Geometry') {
        			$('#incidentsTableColumnRow').append(tableColumnHeading + valueObj + "</th>");		//insert column heading
        		}
        	}
			else if(columnValuePair === "value") {
                
                if(skipColCountInc !== 2) {
                    $('#' + rowIDName).append("<td class='tableValue'>" + valueObj + "</td>");
                }
                
                skipColCountInc++;
        	}
        });
    });
}

function createChildTable() {
	var tableDataSession = sessionStorage.getItem('childSearchJSON');
	var tableData = $.parseJSON(tableDataSession);

	var tableColumnRow = '<tr id="childrenTableColumnRow"></tr>';
	var tableColumnHeading = '<th class="childrenTableColumnHead">';
	var columnRowCreated = false;
	var countCol = 0;
	var countRow = 0;
	var rowIDName = "";

	$.each(tableData, function(columnEntry, jsonObj) { 
        
        $.each(jsonObj, function(columnValuePair, valueObj) {
            
            if(columnValuePair === "column") {

        		if(valueObj === 'Child ID') {

        			//create new row
        			countRow++;
					rowIDName = "tableBodyRowChild" + countRow;
	        		$('#childrenTableBody').append("<tr id='" + rowIDName + "'" + "></tr>");

	        		if(columnRowCreated === false) {
	        			countCol++;
	        			$('#childrenTableHead').append(tableColumnRow);

	        			if(countCol === 2) {
	        				columnRowCreated = true;
	        			}
	        		}
        		}

        		if(columnRowCreated === false) {
        			$('#childrenTableColumnRow').append(tableColumnHeading + valueObj + "</th>");		//insert column heading
        		}
        	}
			else if(columnValuePair === "value") {
        		$('#' + rowIDName).append("<td class='tableValue'>" + valueObj + "</td>");
        	}
        });
    });
}

function createParentInfoTable() {
	var tableDataSession = sessionStorage.getItem('residentSearchJSON');
	var tableData = $.parseJSON(tableDataSession);

	var tableColumnRow = '<tr id="parentTableColumnRow"></tr>';
	var tableColumnHeading = '<th class="parentTableColumnHead">';
	var columnRowCreated = false;
	var countCol = 0;
	var countRow = 0;
	var rowIDName = "";

	$.each(tableData, function(columnEntry, jsonObj) { 
        
        $.each(jsonObj, function(columnValuePair, valueObj) {
            
            if(columnValuePair === "column") {

        		if(valueObj === 'Resident ID') {

        			//create new row
        			countRow++;
					rowIDName = "tableBodyRowParentInfo" + countRow;
	        		$('#parentTableBody').append("<tr id='" + rowIDName + "'" + "></tr>");

	        		if(columnRowCreated === false) {
	        			countCol++;
	        			$('#parentTableHead').append(tableColumnRow);

	        			if(countCol === 2) {
	        				columnRowCreated = true;
	        			}
	        		}
        		}

        		if(columnRowCreated === false) {
        			$('#parentTableColumnRow').append(tableColumnHeading + valueObj + "</th>");		//insert column heading
        		}
        	}
			else if(columnValuePair === "value") {
        		$('#' + rowIDName).append("<td class='tableValue'>" + valueObj + "</td>");
        	}
        });
    });
}