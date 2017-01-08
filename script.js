$(document).ready(function() {
	$("#contentSteps").hide();

	$("#addBooking").click(function(){
		init();
		$("#contentMain").hide();
		$("#busWrapper").hide();
		$("#contentSteps").show();
	})

	$("#datepicker").datepicker();

	$("#contentSteps > div").smartWizard({
		theme: 'arrows',
	});

	$("#contentSteps > div").on("showStep", function(e, anchorObject, stepNumber, stepDirection) {
         if (stepNumber == 3){
         	finalConclusion();
         }
    });

	calcPrice();

})

	art = "Autonom";
	typ = "Kleinwagen";
	person = "1";
	ort = "Welfengarten 1";
	dauer = "1";
	zugang = "Öffentlich";
	dj = false;
	security = false;
	snacks = false;
	barkeeper = false;
	betrunkene = "0";
	zeit = "15:00";
	
function init(){
	art = "Autonom";
	typ = "Kleinwagen";
	person = "1";
	ort = "Welfengarten 1";
	dauer = "1";
	zugang = "Öffentlich";
	dj = false;
	security = false;
	snacks = false;
	barkeeper = false;
	betrunkene = "0";
	zeit = "15:00";
	$('#contentSteps > div').smartWizard("reset")
}

function finalConclusion(){
	calcPrice();

	document.getElementById("finalTyp").innerHTML = typ;
	document.getElementById("finalArt").innerHTML = art;
	document.getElementById("finalPerson").innerHTML = person;
	document.getElementById("finalOrt").innerHTML = ort;
	document.getElementById("finalDauer").innerHTML = dauer;
	document.getElementById("finalZeit").innerHTML = zeit;
	document.getElementById("finalZugang").innerHTML = zugang;
}

function calcPrice(){
	document.getElementById('wizardStep1PricePerHour').innerHTML = calcPricePerHour();

	var finalPrice = calcPricePerHour();
	if(dj == true){
		document.getElementById("finalDj").innerHTML = "DJ";
		finalPrice +=  10.20;
		//preis += 10.20 * dauer;
	} else {
		document.getElementById("finalDj").innerHTML = "";
	}

	if(security == true){
		document.getElementById("finalSecurity").innerHTML = "Security";
		finalPrice +=  20;
	} else {
		document.getElementById("finalSecurity").innerHTML = "";
	}

	if(snacks == true){
		document.getElementById("finalSnacks").innerHTML = "Snacks";
	} else {
		document.getElementById("finalSnacks").innerHTML = "";
	}

	if(barkeeper == true){
		document.getElementById("finalBarkeeper").innerHTML = "Barkeeper";
		finalPrice +=  10;
	} else {
		document.getElementById("finalBarkeeper").innerHTML = "";
	}

	document.getElementById("finalBetrunkene").innerHTML = betrunkene;
	if (betrunkene != 0) finalPrice += betrunkene *2 ;
	finalPrice *= dauer;
	if (snacks) finalPrice += 20;
	document.getElementById("finalPreis").innerHTML = Math.ceil(finalPrice * 100) / 100;
	document.getElementById("wizardStep2Price").innerHTML = Math.ceil(finalPrice * 100) / 100;
	document.getElementById("wizardStep3Price").innerHTML = Math.ceil(finalPrice * 100) / 100;
}

function calcPricePerHour(){
	if (art == "Autonom") price = 7.99;
	if (art == "Manuell") price = 9.99;
	if (typ == "Kleinwagen") price += 1;
	if (typ == "Partybus") price += 2;
	if (typ == "Kombi") price += 3;

	return price;
}

function setArt(variable){
	art = variable.value;
	calcPrice();
}

function setTyp(variable){
	typ = variable.value;
	if (typ == "Partybus"){
		document.getElementById('selConfArt').value = "Autonom"
		art = "Autonom";
		document.getElementById('selConfArt').disabled = true;
	} else {
		document.getElementById('selConfArt').disabled = false;
	}
	calcPrice();
}

function setPerson(variable){
	var p = variable.value;
	if (p <= 0){
		var x = document.getElementById('wizardPersons') ;
		x.value = '1';
		p = x.value;
	}
	person = p;
	calcPrice();
}

function setOrt(variable){
	ort = variable.value;
}

function setActualPlace(){
	ort = "Appelstrasse 4";
	document.getElementById('selConfOrtID').value = ort;
	calcPrice();
}

function setDauer(variable){
	var p = variable.value;
	if (p <= 0){
		var x = document.getElementById('wizardDauer') ;
		x.value = '1';
		p = x.value;
	}
	dauer = p;
	calcPrice();
}

//Time und datepicker functions HIER

function setZugang(variable){
	zugang = getCheckedRadio(variable.name);
	calcPrice();
}

function setDJ(variable){
	dj = variable.checked;
	calcPrice();
}

function setSecurity(variable){
	security = variable.checked;
	calcPrice();
}

function setSnacks(variable){
	snacks = variable.checked;
	calcPrice();
}

function setBarkeeper(variable){
	barkeeper = variable.checked;
	calcPrice();
}

function setBetrunkene(variable){
	var p = variable.value;
	if (p < 0){
		var x = document.getElementById('wizardBetrunkene') ;
		x.value = '0';
		p = x.value;
	}
	betrunkene = p;
	calcPrice();
}

function onOrder(variable){
	alert("Vielen Dank für Ihre Bestellung. Die Mitfahrgelegenheit ist schon zu Ihnen unterwegs!");
	$("#contentSteps").hide();
	$("#contentMain").show();
	$("#busWrapper").show();
	width = $(window).width() / 1.5;


	$("#busImg").animate({ left: "-=30px",}, 750 ).animate({ left: "+="+width,}, 10000);
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
