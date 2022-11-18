// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // A Day.js object with current date and time
  var today = dayjs();

  // Added listener for click events on the save button:
  // Whole schedule container
  var container = $(".container-lg");
  container.on("click", ".saveBtn", function(event) {
    var btnClicked = event.target;
    // Get parent <div> corresponding to hour block
    // If user clicked on button (not save icon)
    if (btnClicked.matches(".saveBtn")) {
      var hourDiv = $(btnClicked).parent("div");
    // If user clicked on save icon
    } else if (btnClicked.matches(".fa-save")) {
      var hourDiv = $(btnClicked).parent("button").parent("div");
    }

    // Save event in local storage using id "hour-#" as key & <textarea> text content as the value
    var hourKey = $(hourDiv).attr("id");
    var hourValue = $(hourDiv).children("textarea").val();
    localStorage.setItem(hourKey, hourValue);
  })
  
  // Apply the past, present, or future class to each time block:
  // Current hour in 24-hr time as a number
  var currentHour = Number(today.format('H'));
  // Array of all <div>s denoting each hour block
  var timeblocks = $(".container-lg").children();

  // Loop through each hour <div> in timeblocks array
  $.each(timeblocks, function(i, hour) {
    // Grab hour number after the "-" from ID for each hour <div> 
    var hourID = $(hour).attr("id");
    var hourNum = Number(hourID.split("-")[1]);

    // Compare hourNum to currentHour and assign proper class to hour <div>
    if (hourNum < currentHour) {
      $(hour).addClass("past");
    } else if (hourNum === currentHour) {
      $(hour).addClass("present");
    } else {
      $(hour).addClass("future");
    }

    // Get user input saved in localStorage & set values of corresponding textarea elements:
    // Use the ID "hour-#" as key
    var savedEvents = localStorage.getItem(hourID);
    // If there is user input for that hour block (not null), put that text in the hour block
    if (savedEvents) {
      $(hour).children("textarea").val(savedEvents);
    }
  })  

  // Display the current date in the header of the page
  $("#currentDay").text(today.format('dddd, MMMM D, YYYY'));
});
