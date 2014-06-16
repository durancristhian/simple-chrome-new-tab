$(document).on("ready", function () {
	var months = new Array (
		"Enero",
		"Febrero",
		"Marzo",
		"Abril",
		"Mayo",
		"Junio",
		"Julio",
		"Agosto",
		"Septiembre",
		"Octubre",
		"Noviembre",
		"Diciembre"
	);
	var days = new Array(
		"Domingo",
		"Lunes",
		"Martes",
		"Miércoles",
		"Jueves",
		"Viernes",
		"Sábado"
	);
	var dateElement = $("#date");
	var clockElement = $("#clock");

	UpdateElements();

	setInterval(function () {

		UpdateElements();
	}, 60000);

	function UpdateElements () {

		var date = new Date();

		var dateText = "Hoy es " + days[date.getDay()] + ", " + date.getDate() + " de " + months[date.getMonth()] + " de " + date.getFullYear();
		$(dateElement).text(dateText);

		var clockText;

		var hours = date.getHours();
		var minutes = date.getMinutes();

		if(hours < 10) {

			clockText = "0" + hours;
		} else {

			clockText = hours;
		}

		clockText = clockText + ":";

		if(minutes < 10) {

			clockText = clockText + "0" + minutes;
		} else {

			clockText = clockText + minutes;
		}

		$(clockElement).text(clockText);
	}
});