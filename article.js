// API key
var apiKey = "j35DYxgdTMaAnK6LR98HkviwSyGhfIul"
var userSearch = "George Washington";
var queryURL = "https:core.ac.uk:443/api-v2/search/" + userSearch + "?page=5&pageSize=10&apiKey=" + apiKey;

    // Make the AJAX request to the API - GETs the JSON data at the queryURL.
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
    });

/*
var apiKey = "j35DYxgdTMaAnK6LR98HkviwSyGhfIul";

// function to clear value on users input
function clearInput() {
    $("#search-tearm").empty();
};

// on click event to run the search function
$("#run-search").on("click", function(event) {
    // This line allows us to take advantage of the HTML "submit" property
    // This way we can hit enter on the keyboard and it registers the search
    // (in addition to clicks) prevents the page from reloading on form submit.
    event.preventDefault();

    // set a varible in order to save the value from users input
    var searchTearm = $("#search-tearm").val().trim();

    // call function to clear users input
    clearInput();

    // Build the query URL for te ajax request to the CORE API
    var queryURL = "https:core.ac.uk:443/api-v2/search/george%20washington?page=5&pageSize=10&apiKey=" + apiKey;

    // Make the AJAX request to the API - GETs the JSON data at the queryURL.
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(response);

    console.log(response);
});
*/
// clear the input after click on search
// request information form API
// console.log response
// retrive 5 articles
// append to the page