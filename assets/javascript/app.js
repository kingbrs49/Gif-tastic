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

$("#MCU-input").click(function (event) {
    event.preventDefault();
    //console.log("click me")
    var name = $("#MCU-name").val();
    //console.log(name)
    marvelArray.push(name);
    renderMCUButtons();
})

function displayMarvelGIFs() {
    var marvelGif = $(this).attr("marvel-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + marvelGif + "&api_key=EpVK6VRMjibb8ukv94r24DuoyrPJIkgU";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $("#MCU-giphy").text(JSON.stringify(response));
    });
}

$("button").click(function (event) {
    event.preventDefault();
    //console.log("click me again")
    var marvelGif = $("#MCU-input").val().trim();
    marvelArray.push(marvelGif);
    console.log(marvelArray);
    renderMCUButtons();
});

$(document).click(".marvelGif", displayMarvelGIFs);

renderMCUButtons();

//console.log that sh*t


//