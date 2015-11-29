$(window).on("load", function () {
  var clockElement = $("#clock");
  var dateElement = $("#date");
  var days = new Array(
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  );
  var months = new Array (
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  );

  $(".wrapper").fadeIn("slow", function () {
    $(".todo-list").fadeIn();
    $(".top-sites").fadeIn();
  });

  UpdateElements();

  setInterval(function () {
    UpdateElements();
  }, 60000);

  function UpdateElements () {
    var clockText;
    var date = new Date();
    var dateText = days[date.getDay()] + ", " + months[date.getMonth()] + " " + date.getDate();

    $(dateElement).text(dateText);

    var hours = date.getHours();
    var minutes = date.getMinutes();

    if (hours < 10) {
      clockText = "0" + hours;
    } else {
      clockText = hours;
    }

    clockText = clockText + ":";

    if (minutes < 10) {
      clockText = clockText + "0" + minutes;
    } else {
      clockText = clockText + minutes;
    }

    $(clockElement).text(clockText);
  }

  var templateEnd = "</p></div><div class='pure-u-sm-3-24 cell right'><p><span class='icon-close icon'></span></p></div></div>";
  var templateStart = "<div class='pure-g item'><div class='pure-u-sm-3-24 cell'><p><span class='icon-checkbox-unchecked icon'></span></p></div><div class='pure-u-sm-18-24 cell'><p class='task'>";

  var tasks = localStorage.getItem("tasks");

  if (tasks !== null) {
    $("#items-list").html(tasks);
    $("#items-list .item").css("opacity", 1);
    AddToDoListEvents();
  }

  $("#input").on("keypress", function (key) {
    if (key.which == 13 && $(this).val() !== "") {
      var text = $(this).val();
      DeleteToDoListEvents();

      $(templateStart + text +templateEnd).hide().appendTo("#items-list").fadeIn("slow");
      $(this).val("");

      AddToDoListEvents();
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
    localStorage.setItem("tasks", $("#items-list").html());
  }

  function ChangeTaskStatus (event) {
    event.preventDefault();

    var item = $(this).closest(".item");

    if ($(item).hasClass("clicked")) {
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
});