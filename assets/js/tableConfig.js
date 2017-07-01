function setTableConfig() {

	//setter and getter in setMaxColumnSizes.js
	//count start at 0 (columns in db - 1)

	setMaxColumnsForRowBuilding(7);			//Set Number of columns in Building Table
	setMaxColumnsForRowResident(14);		//Set Number of columns in Resident Table
	setMaxColumnsForRowIncident(22);		//Set Number of columns in Incident Table
	setMaxColumnsForRowChild(12);		//Set Number of columns in Child Table
	setMaxColumnsForRowParent(14);	//Set Number of columns in ParentRef Table
}