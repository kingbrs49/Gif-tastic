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

    $("#MCU-giphy").empty()
    var marvelGif = $(this).attr("marvel-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + marvelGif + "&api_key=EpVK6VRMjibb8ukv94r24DuoyrPJIkgU&limit=20";
    console.log(marvelGif)
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        for (var i = 0; i < response.data.length; i++) {
            var imgTag =
                `
            <img 
            class="marvelFirstClass" 
            src="${response.data[i].images.original_still.url}"
            data-still=${response.data[i].images.original_still.url}
            data-animate=${response.data[i].images.original.url}
            active=${false}
            >`
            $("#MCU-giphy").append(imgTag);
        }
        //
        console.log(response)
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

function animateMarvelGIFs() {
    //console.log("hello hello")
    //looked for the GIF we clicked on
    var currentImage = $(this);

    //if active is false, set the src link to animate link and set active to true
    if (currentImage.attr("active") === "false") {

        //set active link
        currentImage.attr("src", currentImage.attr("data-animate"));

        //set the active status to true
        currentImage.attr("active", true);
    }
    else {

        //if that status is active, set src to still
        currentImage.attr("src", currentImage.attr("data-still"));
        currentImage.attr("active", false)

    }




    //checked its attribute of 'animate' if it's true or false
    //if it's true, make sure you have the 'animate' src 
    //if it's false, make sure you have the still src
    //switch between true and false to animate/still
}

$(document).on("click", ".marvelFirstClass", animateMarvelGIFs)

renderMCUButtons();


// Bugs:
// -- Clicking ANYWHERE - not just on buttons - causes the click function to initiate (JSON Stringify code appears)
// -- *Not a bug, but don't know how to deal with* Get rid of the "JSON Stringify" command so I can display the actual GIFs
// -- Button generation function generates an extra blank button instead of the one button upon pressing "Assemble"