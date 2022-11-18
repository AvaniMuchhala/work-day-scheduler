// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var today = dayjs();

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  // Whole schedule container
  var container = $(".container-lg");
  container.on("click", ".saveBtn", function(event) {
    console.log("button clicked");

    var btnClicked = event.target;
    if (btnClicked.matches(".saveBtn")) {
      var hourDiv = $(btnClicked).parent("div");
    } else if (btnClicked.matches(".fa-save")) {
      var hourDiv = $(btnClicked).parent("button").parent("div");
    }
    console.log(hourDiv);

    var hourKey = $(hourDiv).attr("id");
    var hourValue = $(hourDiv).children("textarea").val();
    localStorage.setItem(hourKey, hourValue);
  })
  
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  // Current hour in 24-hr time as a number
  var currentHour = Number(today.format('H'));
  // Array of all <div>s denoting each hour block
  var timeblocks = $(".container-lg").children();

  // Loop through each hour <div> in timeblocks array
  $.each(timeblocks, function(i, hour) {
    console.log($(hour).attr("id"));
    // Grab hour number after the "-" from ID for each hour <div> 
    var hourID = $(hour).attr("id");
    var hourNum = Number(hourID.split("-")[1]);

    // Compare hourNum to currentHour and assign proper class to hour <div>
    if (hourNum < currentHour) {
      console.log("<");
      $(hour).addClass("past");
    } else if (hourNum === currentHour) {
      console.log("=");
      $(hour).addClass("present");
    } else {
      console.log(">");
      $(hour).addClass("future");
    }

    var savedEvents = localStorage.getItem(hourID);
    if (savedEvents) {
      $(hour).children("textarea").val(savedEvents);
    }
  })  

  
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  
  // TODO: Add code to display the current date in the header of the page.
  $("#currentDay").text(today.format('dddd, MMMM D, YYYY'));
});
