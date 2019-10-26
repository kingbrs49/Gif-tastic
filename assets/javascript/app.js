//set array
var marvelArray = ["Black Widow", "Captain America", "Hawkeye", "Hulk", "Iron Man", "Maria Hill", "Nick Fury", "Thor", "War Machine"]

function renderMCUButtons() {
    $("#MCU-button").empty()
    for (var i = 0; i < marvelArray.length; i++) {
        var btnEl = $("<button type='button' class='btn btn-danger'>").text(marvelArray[i]);
        $("#MCU-button").append(btnEl);
    }
}

renderMCUButtons();

// Creates a new button via user input
$("#MCU-input").click(function (event) {
    event.preventDefault();
    //console.log("click me")
    var name = $("#MCU-name").val();
    //console.log(name)
    marvelArray.push(name);
    renderMCUButtons();
})

// meant to access GIPHY API to grab GIFs from GIPHY --> Still don't know how to NOT use JSON Stringify
function displayMarvelGIFs() {
    var marvelGif = $(this).attr("marvel-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + marvelGif + "&api_key=EpVK6VRMjibb8ukv94r24DuoyrPJIkgU&limit=20";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $("#MCU-giphy").text(JSON.stringify(response));
    });
}

// meant to add button to the current array after clicking "Assemble"
$("button").click(function (event) {
    event.preventDefault();
    //console.log("click me again")
    var marvelGif = $("#MCU-input").val().trim();
    marvelArray.push(marvelGif);
    console.log(marvelArray);
    renderMCUButtons();
});

// meant to call the previous function to display GIFs from GIPHY
$(document).click(".marvelGif", displayMarvelGIFs);

renderMCUButtons();

//console.log that sh*t


// Bugs:
// -- Clicking ANYWHERE - not just on buttons - causes the click function to initiate (JSON Stringify code appears)
// -- *Not a bug, but don't know how to deal with* Get rid of the "JSON Stringify" command so I can display the actual GIFs
// -- Button generation function generates an extra blank button instead of the one button upon pressing "Assemble"