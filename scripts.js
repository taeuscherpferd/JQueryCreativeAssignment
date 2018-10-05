$(document).ready(function () {
  $("#searchButton").click(function (e) {
    var param = $("#searchField").val().toLowerCase();
    console.log(param);
    var pokeURL = "https://pokeapi.co/api/v1/pokemon/" + param + "/";

    // new URL for 3rd GET request
    var pokeURL2 = "https://pokeapi.co/api/v2/pokemon/" + param + "/";

    $.ajax({
      type: "GET",
      url: pokeURL2,
      datatype: "jsonp",
      success: function (data) {
        console.log(data);
        var pokeid = data.id;
        console.log(pokeid);
        var pokename = data.name;
        console.log(pokename);
        var poketype1 = data.types[0].type.name;
        console.log(poketype1);
        if (data.types.length == 2) {
          var poketype2 = data.types[1].type.name;
          console.log(poketype2);
        }
        else var poketype2 = null;
        var descriptionuri = data.species.url;
        console.log(descriptionuri);
        var sprite = data.sprites.front_default;

        var resultsToHTML = "<img src=\"" + sprite + "\" alt=\"Pokemon Image\">";
        resultsToHTML += "<br><h3>" + "#" + pokeid + ": " + pokename.charAt(0).toUpperCase() + pokename.slice(1) + "</h3>";
        resultsToHTML += "<p> Type: " + poketype1;
        if (data.types.length == 2) {
          resultsToHTML += "/" + poketype2;
        }
        resultsToHTML += "</p>";
        console.log("displayed the Pokemon");

        var pokedescription = "";
        $.ajax({
          type: "GET",
          url: descriptionuri,
          datatype: "jsonp",
          success: function (data2) {
            console.log(data2);
            if (data2.flavor_text_entries[1].language.name != "en") {
              pokedescription = data2.flavor_text_entries[2].flavor_text;
            }
            else {
              pokedescription = data2.flavor_text_entries[1].flavor_text;
            }
            console.log(pokedescription);
            resultsToHTML += "<p>" + pokedescription + "</p>";

            $(pokemon).html(resultsToHTML);
          }
        });
      }
    });
  })
});