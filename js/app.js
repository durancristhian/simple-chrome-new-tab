$(window).on("load", function () {

	// Animación de entrada
	$(".wrapper").fadeIn("slow", function () {

		$(".main-card").fadeIn("slow");
		$(".todo-list").fadeIn("slow");
	});

	// Reloj
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

	// ToDo list
	var tasks = localStorage.getItem('tasks');

	// Si había tareas en localStorage las asigno
	if(tasks !== null) {

		$("#items-list").html(tasks);
		AddToDoListEvents();
	}

	var templateStart = "<div class='pure-g item'><div class='pure-u-sm-3-24 row left'><p><span class='icon-checkbox-unchecked icon'></span></p></div><div class='pure-u-sm-18-24 row'><p class='task'>";
	var templateEnd = "</p></div><div class='pure-u-sm-3-24 row right'><p><span class='icon-close icon'></span></p></div></div>";

	// Se agrega una nueva tarea
	$("#input").on("keypress", function (key) {

		if(key.which == 13 && $(this).val() !== "") {

			// Se eliminan los eventos asignados
			DeleteToDoListEvents();

			var text = $(this).val();

			// Se agrega el elemento
			$(templateStart + text +templateEnd).hide().appendTo("#items-list").fadeIn();

			$(this).val("");

			// Se reasignan los eventos
			AddToDoListEvents();

			// Se actualiza la data en localStorage
			UpdateLocalStorageData();
		}
	});

	// Se modifica el estado de un item de la lista
	function ChangeTaskStatus (event) {

		event.preventDefault();

		var item = $(this).closest(".item");

		if($(item).hasClass("clicked")) {

			$(item).find(".icon-checkbox-checked").removeClass("icon-checkbox-checked").addClass("icon-checkbox-unchecked");
		} else {

			$(item).find(".icon-checkbox-unchecked").removeClass("icon-checkbox-unchecked").addClass("icon-checkbox-checked");
		}

		$(item).toggleClass("clicked");

		UpdateLocalStorageData();
	}

	// Se elimina una tarea
	function DeleteTask (event) {

		event.preventDefault();

		$(this).closest(".item").remove();

		UpdateLocalStorageData();
	}

	function UpdateLocalStorageData () {

		localStorage.setItem('tasks', $("#items-list").html());
	}

	function DeleteToDoListEvents () {

		$(".row:not(.right)").off("click", ChangeTaskStatus);
		$(".row.right").off("click", DeleteTask);
	}

	function AddToDoListEvents () {

		$(".row:not(.right)").on("click", ChangeTaskStatus);
		$(".row.right").on("click", DeleteTask);
	}
});