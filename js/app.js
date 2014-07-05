$(window).on("load", function () {

	// Animación de entrada
	$(".wrapper").fadeIn("slow", function () {

		$(".todo-list").fadeIn();
		$(".top-sites").fadeIn();
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
	var templateStart = "<div class='pure-g item'><div class='pure-u-sm-3-24 cell'><p><span class='icon-checkbox-unchecked icon'></span></p></div><div class='pure-u-sm-18-24 cell'><p class='task'>";
	var templateEnd = "</p></div><div class='pure-u-sm-3-24 cell right'><p><span class='icon-close icon'></span></p></div></div>";

	var tasks = localStorage.getItem('tasks');

	if(tasks !== null) {

		$("#items-list").html(tasks);
		$("#items-list .item").css("opacity", 1);
		AddToDoListEvents();
	}

	$("#input").on("keypress", function (key) {

		if(key.which == 13 && $(this).val() !== "") {

			// Se eliminan los eventos asignados
			DeleteToDoListEvents();

			var text = $(this).val();

			// Se agrega el elemento
			$(templateStart + text +templateEnd).hide().appendTo("#items-list").fadeIn("slow");

			$(this).val("");

			// Se reasignan los eventos
			AddToDoListEvents();

			// Se actualiza la data en localStorage
			UpdateLocalStorageData();
		}
	});

	function DeleteToDoListEvents () {

		$(".cell:not(.right)").off("click", ChangeTaskStatus);
		$(".cell.right").off("click", DeleteTask);
	}

	function AddToDoListEvents () {

		$(".cell:not(.right)").on("click", ChangeTaskStatus);
		$(".cell.right").on("click", DeleteTask);
	}

	function UpdateLocalStorageData () {

		localStorage.setItem('tasks', $("#items-list").html());
	}

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

	function DeleteTask (event) {

		event.preventDefault();

		$(this).closest(".item").slideUp("fast", function () {

			$(this).remove();

			UpdateLocalStorageData();
		});
	}

	$("#quote").load("http://www.iheartquotes.com/api/v1/random?max_lines=1&format=json", function (data) {

		if(data) {

			var json = JSON.parse(data);
			var text = "<span class='italic'>" + json.quote +  "</span>";

			$("#quote").html(text).addClass("animated fadeInUp");
		}
	});

	chrome.topSites.get(function (MostVisitedURLs) {

		var html = "";
		var count = 0;

		$.grep(MostVisitedURLs, function (site) {

			if(count < 9) {

				html = html + "<a href='" + site.url + "' target='_blank' class='italic'>" + site.title + "</a>";
				count ++;
			}
		});

		$(html).hide().appendTo("#sites-list").fadeIn();
	});
});