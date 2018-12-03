//pre populated House button array
$(document).ready(function() {
  var houses = ["Stark", "Lannister", "Targaryen", "Baratheon", "Tyrell"];

  //Function for calling GIFs from API
  function displayHouse() {
    var house = $(this).attr("data-name");
    var queryURL =
      "http://api.giphy.com/v1/gifs/search?q=" +
      house +
      "&api_key=x7OGB6N6Rv3hE6q4JQ3bHV43uvhd2W0R&limit=10";

    $.ajax({ url: queryURL, method: "GET" }).then(function(response) {
      console.log(response.data);
      for (var i = 0; i < response.data.length; i++) {
        $("#gifArea").prepend("<p>Rating: " + response.data[i].rating + "</p>");
        $("#gifArea").prepend(
          "<img src ='" + response.data[i].images.downsized.url + "'>"
        );
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
  });

  //Function for pausing and playing GIF
  // Function gifChangeState()

  $(document).on("click", ".house-btn", displayHouse);

  renderButtons();
});
