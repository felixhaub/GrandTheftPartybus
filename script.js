$(document).ready(function() {
	/**
	*	UI-"Init" via hiding
	*/
	$("#contentSteps").hide();
	$("#logout").hide();
	$("#busWrapper").hide();


	/**
	*	Setup library-elements
	*/
	//enable all tooltips in document
	$('[data-toggle="tooltip"]').tooltip();

	$("#datepicker").datepicker({
		dateFormat: "dd.mm.yy",
		firstDay: 1,
		minDate: +0
	});

	$("#timepicker").wickedpicker({
		twentyFour: true,
		minutesInterval: 5
	});

	wizard = $("#contentSteps > div").smartWizard({
		theme: 'arrows',
		transitionEffect: 'fade',
		toolbarSettings: {
			toolbarExtraButtons: [$('<button class="btn btn-danger" onclick="cancelWizard()">Cancel</button>')]
		},
		disabledSteps: [2]
	});

	/**
	*	Handlers
	*/
	$("#addBooking").click(function(){
		init(false);
		calcPrice();
		$("#contentMain").hide();
		$("#busWrapper").hide();
		$("#contentSteps").show();
	})

	$("#addBookingPartybus").click(function(){
		init(true);
		calcPrice();
		$("#contentMain").hide();
		$("#busWrapper").hide();
		$("#contentSteps").show();
		$(wizard).smartWizard("stepState", [2], "enable");
	})

	$("#contentSteps > div").on("showStep", function(e, anchorObject, stepNumber, stepDirection) {
         if (stepNumber == 3){
         	finalConclusion();
         }
    });
})


function init(partybusSelected){
	art = "Autonom";
	if (partybusSelected) {
		typ = "Partybus";
		$("#selConfTyp").val("Partybus");
		partybusUI(true);
	} else {
		typ = "Kleinwagen";
		$("#selConfTyp").val("Kleinwagen");
		partybusUI(false);
	}
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
	datum = "Heute";

	$(wizard).smartWizard("reset")

}

function finalConclusion(){
	calcPrice();

	document.getElementById("finalTyp").innerHTML = typ;
	document.getElementById("finalArt").innerHTML = art;
	document.getElementById("finalPerson").innerHTML = person;
	document.getElementById("finalOrt").innerHTML = ort;
	document.getElementById("finalDauer").innerHTML = dauer + " Stunde(n)";
	// get chosen time from timepicker
	zeit = $("#timepicker").wickedpicker('time');
	document.getElementById("finalZeit").innerHTML = zeit + " Uhr";
	document.getElementById("finalDatum").innerHTML = datum;
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

function setZeit(variable){
	/**
	*	We don't update the time-variable on every change now.
	*	This could be completely removed in future
	*/
	zeit = variable.value;
	calcPrice();
}
function setDatum(variable){
	datum = variable.value;
	calcPrice();
}

function setTyp(variable){
	typ = variable.value;
	if (typ == "Partybus"){
		partybusUI(true);
	} else {
		partybusUI(false);
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
	width = $(window).width() / 1.2;



	$("#busImg").animate({ left: "0px",}, 0).animate({ left: "-=10px",}, 750 ).animate({ left: "+="+width,}, 120000);

}

function cancelWizard() {
	$(wizard).smartWizard("reset");
	$("#contentMain").show();
	$("#contentSteps").hide();
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

function loginToggle() {
	$("#login").toggle();
	$("#logout").toggle();
}

function partybusUI(isPartybus) {
	if (isPartybus){
		document.getElementById('selConfArt').value = "Autonom"
		art = "Autonom";
		document.getElementById('selConfArt').disabled = true;
		//$("#step-3 input").prop('disabled', false);
		//.prop('checked', false)
		$(wizard).smartWizard("stepState", [2], "enable");
	} else {
		document.getElementById('selConfArt').disabled = false;
		//$("#step-3 input").prop('disabled', false);
		//.prop('checked', false)
		$(wizard).smartWizard("stepState", [2], "disable");
	}
}
