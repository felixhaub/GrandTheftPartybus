$(document).ready(function() {
	$("#contentSteps").hide();

	$("#addBooking").click(function(){
		$("#contentMain").hide();
		$("#contentSteps").show();
	})

	$("#contentSteps > div").smartWizard({
		theme: 'arrows'
	});
})


var art = "Autonom";
var typ = "Kleinwagen";
var person = "1";
var ort = "Welfengarten 1";
var dauer = "1";
var zugang = "Öffentlich";
var dj = false;
var security = false;
var snacks = false;
var barkeeper = false;
var betrunkene = "0";



function setArt(variable){
	art = variable.value;
}

function setTyp(variable){
	typ = variable.value;
}

function setPerson(variable){
	var p = variable.value;
	if (p <= 0){
		var x = document.getElementById('wizardPersons') ;
		x.value = '1';
		p = x.value;
	}
	person = p;
}

function setOrt(variable){
	ort = variable.value;
}

function setActualPlace(){
	ort = "Appelstrasse 4";
	document.getElementById('selConfOrtID').value = ort;
}

function setDauer(variable){
	var p = variable.value;
	if (p <= 0){
		var x = document.getElementById('wizardDauer') ;
		x.value = '1';
		p = x.value;
	}
	dauer = p;
}

//Time und datepicker functions HIER

function setZugang(variable){
	zugang = getCheckedRadio(variable.name);
}

function setDJ(variable){
	dj = variable.checked;
}

function setSecurity(variable){
	security = variable.checked;
}

function setSnacks(variable){
	snacks = variable.checked;
}

function setBarkeeper(variable){
	barkeeper = variable.checked;
}

function setBetrunkene(variable){
	var p = variable.value;
	if (p < 0){
		var x = document.getElementById('wizardBetrunkene') ;
		x.value = '0';
		p = x.value;
	}
	betrunkene = p;
}



//Hilfsfunktionen

function getCheckedRadio(name) {
	var options = document.getElementsByName(name);
	for (i = 0; i < options.length; i++) {
		var option = options[i];
		if (option.checked) {
			return option.value;
		}
	}
	return null;
}
