//Match Column Name in database for each table - order sensitive

function setColumnNameBuilding(index) {

	switch(index) {
						
		case 0:
			return "Geometry ID";
			break;
		case 1:
			return "Geometry";
			break;
		case 2:
			return "Primary Address";
			break;
		case 3:
			return "Secondary Address";
			break;
		case 4:
			return "Tertiary Address";
			break;
		case 5:
			return "Building Owner";
			break;
		case 6:
			return "Materials";
			break;
		case 7:
			return "Building Type";
			break;
	}
}

function setColumnNameResident(index) {

	switch(index) {
			
		case 0:
			return "Resident ID";
			break;
		case 1:
			return "Lastname";
			break;
		case 2:
			return "Firstname";
			break;
		case 3:
			return "Contact";
			break;
		case 4:
			return "Post Box";
			break;
		case 5:
			return "Post Code";
			break;
		case 6:
			return "Post Area";
			break;
		case 7:
			return "Email";
			break;
		case 8:
			return "Employed";
			break;
		case 9:
			return "Monthly Income";
			break;
		case 10:
			return "Education";
			break;
		case 11:
			return "Married Partner ID";
			break;
        case 12:
			return "Identification Number (ID)";
			break;
		case 13:
			return "Gender";
			break;
        case 14:
			return "Race";
			break;
	}
}

function setColumnNameIncident(index) {

	switch(index) {
			
		case 0:
			return "Geometry ID";
			break;
		case 1:
			return "Geometry";
			break;	
		case 2:
			return "ID";
			break;
		case 3:
			return "Reporter Name";
			break;
		case 4:
			return "Victim Firstname";
			break;
		case 5:
			return "Victim Surname";
			break;
		case 6:
			return "Victim ID";
			break;
		case 7:
			return "Victim Gender";
			break;
		case 8:
			return "Victim Contact No.";
			break;
		case 9:
			return "Victim Email";
			break;
		case 10:
			return "Victim Postcode";
			break;
		case 11:
			return "Victim Postbox";
			break;
		case 12:
			return "Victim Post Area";
			break;
		case 13:
			return "Incident Date";
			break;
		case 14:
			return "Abuse Repeat";
			break;
		case 15:
			return "Incident Summary";
			break;
		case 16:
			return "Police Contacted";
			break;
		case 17:
			return "Ongoing Investigation";
			break;
		case 18:
			return "Request Contact";
			break;
		case 19:
			return "Request Service";
			break;
		case 20:
			return "Extra Info";
			break;
		case 21:
			return "Knows Perpetrator";
			break;
		case 22:
			return "Contact Perpetrator";
			break;
	}
}

function setColumnNameChild(index) {

	switch(index) {
			
		case 0:
			return "Child ID";
			break;
		case 1:
			return "Lastname";
			break;
		case 2:
			return "Firstname";
			break;
		case 3:
			return "Date Of Birth";
			break;
		case 4:
			return "Alternative Contact Name";
			break;
		case 5:
			return "Alternative Contact Telephone";
			break;
		case 6:
			return "Alternative Contact Relation";
			break;
		case 7:
			return "Orphan";
			break;
		case 8:
			return "Sibling";
			break;
		case 9:
			return "Parent ID";
			break;
        case 10:
			return "Identification Number (ID)";
			break;
        case 11:
			return "Gender";
			break;
        case 12:
			return "Race";
			break;
	}
}

/*function setColumnNameParentRef(index) {

	switch(index) {
			
		case 0:
			return "Parent ID";
			break;
		case 1:
			return "Resident ID";
			break;
		case 2:
			return "Child ID";
			break;
	}
}*/
