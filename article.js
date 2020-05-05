// API key
var apiKey = "j35DYxgdTMaAnK6LR98HkviwSyGhfIul"

// Event listener for the search button
$("#search-button").on("click", function (event) {
    // event.preventDefault() function prevents the forms from trying to submit itself.
    event.preventDefault();

    // call search function
    searchArticle();
})

// access api in order to retrive articles

function searchArticle() {
    
    // grab the value form users input
        // save the value to varible userSearch
    var userSearch = $("#search").val().trim();
    var queryURL = "https://core.ac.uk:443/api-v2/search/" + userSearch + "?page=1&pageSize=10&apiKey=" + apiKey;

    // clear input value after user clicks on search
    $("#search").val("");

    // Make the AJAX request to the API - GETs the JSON data at the queryURL.
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);

        for (var i = 0; i < 5; i++) {
            var authors = response.data[i]._source.authors[i];
            var description = response.data[i]._source.description;
            var datePublished = response.data[i]._source.datePublished;
            var topics = response.data[i]._source.topics[i];
            var urls = response.data[i]._source.urls[i];
            var itWorks = $("<h2>");
            var authorsEl = $("<h3>");
            var descriptionEl = $("<h5>");
            var datePublishedEl = $("<p>");
            var topicsEl = $("<p>");
            var urlsEl = $("<a>");
            authorsEl.attr("style", "background: yellow; font-family: Arial");
            descriptionEl.attr("style", "background: yellow; font-family: Arial");
            datePublishedEl.attr("style", "background: yellow; font-family: Arial");
            topicsEl.attr("style", "background: yellow; font-family: Arial");
            urlsEl.attr("style", "background: yellow; font-family: Arial");
            urlsEl.attr("href", urls);
            urlsEl.attr("target", "_blank");
            itWorks.attr("style", "background: yellow; font-family: Arial");
            itWorks.attr("data-name", userSearch);
            itWorks.text("It works");
            authorsEl.text(authors);
            descriptionEl.text(description);
            datePublishedEl.text(datePublished);
            topicsEl.text(topics);
            urlsEl.text(urls);
        // prepend the results on div #main-content
            $("#main-content").prepend(itWorks);
            $("#main-content").prepend(authorsEl);
            $("#main-content").prepend(descriptionEl);
            $("#main-content").prepend(datePublishedEl);
            $("#main-content").prepend(topicsEl);
            $("#main-content").prepend(urlsEl);
            console.log(authors);
            console.log(description);
            console.log(datePublished);
            console.log(topics);
            console.log(urls);
        }
        authorsEl.empty();
        descriptionEl.empty();
        datePublishedEl.empty();
        topicsEl.empty();
        urlsEl.empty();
        
    });

}
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

// console.log response