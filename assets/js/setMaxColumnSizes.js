//********************* Getters and Setters for max number of columns in each table ********************
//********************* Use for setting search data and building table in view      ********************

//Building
function setMaxColumnsForRowBuilding(value) {
	sessionStorage.setItem('buildingMaxColumns', value);
}

function getMaxColumnsForRowBuilding() {
	//INFO: parseInt - convert string to int
	return parseInt(sessionStorage.getItem('buildingMaxColumns'));
}

//Resident
function setMaxColumnsForRowResident(value) {
	sessionStorage.setItem('residentMaxColumns', value);
}

function getMaxColumnsForRowResident() {
	//INFO: parseInt - convert string to int
	return parseInt(sessionStorage.getItem('residentMaxColumns'));
}

//Incident
function setMaxColumnsForRowIncident(value) {
	sessionStorage.setItem('incidentMaxColumns', value);
}

function getMaxColumnsForRowIncident() {
	//INFO: parseInt - convert string to int
	return parseInt(sessionStorage.getItem('incidentMaxColumns'));
}

//Child
function setMaxColumnsForRowChild(value) {
	sessionStorage.setItem('childMaxColumns', value);
}

function getMaxColumnsForRowChild() {
	//INFO: parseInt - convert string to int
	return parseInt(sessionStorage.getItem('childMaxColumns'));
}

//ParentRef
function setMaxColumnsForRowParent(value) {
	sessionStorage.setItem('parentRefMaxColumns', value);
}

function getMaxColumnsForRowParent() {
	//INFO: parseInt - convert string to int
	return parseInt(sessionStorage.getItem('parentRefMaxColumns'));
}