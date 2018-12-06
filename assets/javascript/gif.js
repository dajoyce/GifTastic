//pre populated House button array
$(document).ready(function() {
  var houses = ["Stark", "Lannister", "Targaryen", "Baratheon", "Tyrell"];

  //Function for calling GIFs from API
  function displayHouse() {
    var house = $(this).attr("data-name");
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      house +
      "&api_key=x7OGB6N6Rv3hE6q4JQ3bHV43uvhd2W0R&limit=10";

    $.ajax({ url: queryURL, method: "GET" }).then(function(response) {
      console.log(response.data);
      for (var i = 0; i < response.data.length; i++) {
        var houseImage = $("<img>");
        houseImage.attr("src", response.data[i].images.downsized_still.url);
        houseImage.attr(
          "data-still",
          response.data[i].images.downsized_still.url
        );
        houseImage.attr("data-animate", response.data[i].images.downsized.url);
        houseImage.attr("data-state", "still");
        houseImage.attr("class", "gif");
        $("#gifArea").prepend("<p>Rating: " + response.data[i].rating + "</p>");
        $("#gifArea").prepend(houseImage);
      }
    });
  }
  //Function for displaying House data in button
  function renderButtons() {
    $("#buttonArea").empty();

    for (var i = 0; i < houses.length; i++) {
      var a = $("<button>");
      a.addClass("house-btn");
      a.attr("data-name", houses[i]);
      a.text(houses[i]);
      $("#buttonArea").append(a);
    }
  }

  //Function for turning search into a button
  $("#addHouse").on("click", function(event) {
    event.preventDefault();
    var house = $("#houseInput")
      .val()
      .trim();

    houses.push(house);

    renderButtons();
    document.getElementById("addButtonSearch").reset();
  });

  //Function for pausing and playing GIF
  $("#gifArea").on("click", ".gif", function() {
    var state = $(this).attr("data-state");
    console.log("Gif Clicked");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $(document).on("click", ".house-btn", displayHouse);

  renderButtons();
});
