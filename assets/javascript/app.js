//set array
var marvelArray = ["Black Widow", "Captain America", "Hawkeye", "Hulk", "Iron Man", "Maria Hill", "Nick Fury", "Thor", "War Machine"]

function renderMCUButtons() {
    $("#MCU-button").empty()
    for (var i = 0; i < marvelArray.length; i++) {
        var btnEl = $("<button type='button' class='btn btn-danger marvelGif'>").text(marvelArray[i]);
        btnEl.attr("marvel-name", marvelArray[i])
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

// meant to access GIPHY API to grab GIFs from GIPHY --> Still don't know how to NOT use JSON Stringify (JSON parse doesn't do anything)
function displayMarvelGIFs() {


    var marvelGif = $(this).attr("marvel-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + marvelGif + "&api_key=EpVK6VRMjibb8ukv94r24DuoyrPJIkgU&limit=20";
console.log(marvelGif)
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        for (var i = 0; i < response.data.length; i++) {
            var imgTag = `<img src="${response.data[i].images.original_still.url}">`
            $("#MCU-giphy").append(imgTag);
        }
        //
        //console.log(response)
    });
}

// meant to add button to the current array after clicking "Assemble"
// $("button").click(function (event) {
//     event.preventDefault();
//     //console.log("click me again")
//     var mcuGif = $("#MCU-input").val().trim();
//     marvelArray.push(mcuGif);
//     console.log(marvelArray);
//     renderMCUButtons();
// });

// meant to call the previous function to display GIFs from GIPHY
$(document).on("click", ".marvelGif", displayMarvelGIFs);

renderMCUButtons();


// Bugs:
// -- Clicking ANYWHERE - not just on buttons - causes the click function to initiate (JSON Stringify code appears)
// -- *Not a bug, but don't know how to deal with* Get rid of the "JSON Stringify" command so I can display the actual GIFs
// -- Button generation function generates an extra blank button instead of the one button upon pressing "Assemble"