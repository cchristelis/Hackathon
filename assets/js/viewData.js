$(document).ready(function() {

	//on page load, show buildings table firsts
	hideAllTables();
	$('#buildingsTab').addClass('active');
	$('#buildingsTable').show();
	
	$.ajax({
		type: 'POST',
		dataType: "json",
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		url: "ViewData.php",
		success: function(response) {

			//call configuration function to set number of columns for each table
			setTableConfig(); //tableConfig.js

            $.each(response, function (i, tableData) {
            	setTable(i, tableData);
            });
		}
	});

	function setTable(arrayCount, tableData) {

		//each if for number of tables in db

		if(arrayCount === 0) {
			saveBuildingTable(tableData);	//databaseData.js
			createBuildingTable();			//createViewTables.js
		} 
		else if(arrayCount === 1) {
			saveResidentTable(tableData);	//databaseData.js
			createResidentTable();			//createViewTables.js
			createParentInfoTable();
		}
		else if(arrayCount === 2) {
			saveIncidentTable(tableData);	//databaseData.js
			createIncidentTable();			//createViewTables.js
		}
		else if(arrayCount === 3) {
			saveChildTable(tableData);		//databaseData.js
			createChildTable();				//createViewTables.js
		}
/*		else if(arrayCount === 4) {
			saveParentInfoTable(tableData);	//databaseData.js
            createParentInfoTable();		//createViewTables.js
		}*/
	}

	//on Search type event
	$('#inpSearch').on('input',function(e){

		if($(this).val().length === 0 ) {
			hideAllTables();
			$('#buildingsTab').addClass('active');
			$('#buildingsTable').show();
		}
		else {
			event.preventDefault();
     		hideAllTables();
		}
    });

	//Tab click handlers
	$('#buildingsTab').click(function(event) {

		event.preventDefault();

		hideAllTables();
		$('#buildingsTable').show();
		$('#buildingsTab').addClass('active');
	});

	$('#residentsTab').click(function(event) {

		event.preventDefault();

		hideAllTables();
		$('#residentsTable').show();
		$('#residentsTab').addClass('active');
	});

	$('#incidentsTab').click(function(event) {

		event.preventDefault();

		hideAllTables();
		$('#incidentsTable').show();
		$('#incidentsTab').addClass('active');
	});

	$('#childrenTab').click(function(event) {

		event.preventDefault();

		hideAllTables();
		$('#childrenTable').show();
		$('#childrenTab').addClass('active');
	});

	$('#parentsTab').click(function(event) {

		event.preventDefault();

		hideAllTables();
		$('#parentsTable').show();
		$('#parentsTab').addClass('active');
	});

	//Hide all tables and set tabs neutral
	function hideAllTables() {

		$('#buildingsTable').hide();
		$('#residentsTable').hide();
		$('#incidentsTable').hide();
		$('#childrenTable').hide();
		$('#parentsTable').hide();

		$('#buildingsTab').removeClass("active");
		$('#residentsTab').removeClass("active");
		$('#incidentsTab').removeClass("active");
		$('#childrenTab').removeClass("active");
		$('#parentsTab').removeClass("active");
	}
});

