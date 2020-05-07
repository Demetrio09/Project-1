// API key
var apiKey = "j35DYxgdTMaAnK6LR98HkviwSyGhfIul"

// Event listener for the search button
$("#search-button").on("click", function (event) {
    // event.preventDefault() function prevents the forms from trying to submit itself.
    event.preventDefault();

    // call search function
    // $("#new-article-div").remove();
    searchArticle();
    // wikipediaFunc();
    // doWiki()
})

// access api in order to retrive articles

function searchArticle() {

    var articleNumberCount = 6;

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
    }).then(function (response) {
        console.log(response);

        for (var i = 0; i < 5; i++) {
            var authors = response.data[i]._source.authors[i];
            var description = response.data[i]._source.description;
            var datePublished = response.data[i]._source.datePublished;
            var topics = response.data[i]._source.topics[i];
            var urls = response.data[i]._source.urls[i];
            var articlesDiv = $("<div>");
            var inquiryEl = $("<h3>");
            var authorsEl = $("<h4>");
            var descriptionEl = $("<h5>");
            var datePublishedEl = $("<p>");
            var topicsEl = $("<p>");
            var urlsEl = $("<a>");
            articlesDiv.attr("id", "new-article-div");
            urlsEl.attr("href", urls);
            urlsEl.attr("target", "_blank");
            inquiryEl.addClass("new-class");
            inquiryEl.attr("data-name", userSearch);
            descriptionEl.attr("style", "text-align: justify");
            inquiryEl.text("Article " + articleNumberCount-- + ": " + userSearch);
            authorsEl.text(authors);
            descriptionEl.text(description);
            datePublishedEl.text(datePublished);
            topicsEl.text(topics);
            urlsEl.text(urls);
            // append the results on div #main-content
            if (authors === "undefined") {
                console.log("authors are not present");
            } if (description === "undefined") {
                console.log("authors are not present");
            } if (datePublished === "undefined") {
                console.log("authors are not present");
            } if (topics === "undefined") {
                console.log("authors are not present");
            } if (urls === "undefined") {
                console.log("authors are not present");
            } else {
                $("#main-content").prepend(articlesDiv);
                $("#new-article-div").prepend(authorsEl);
                $("#new-article-div").prepend(descriptionEl);
                $("#new-article-div").prepend(datePublishedEl);
                $("#new-article-div").prepend(topicsEl);
                $("#new-article-div").prepend(urlsEl);
                $("#new-article-div").prepend(inquiryEl);

            }
            // console.log(authors);
            // console.log(description);
            // console.log(datePublished);
            // console.log(topics);
            // console.log(urls);
        }
        doWiki();
    });
}

function doWiki() {

    var searchWiki = $(".new-class").attr("data-name");
    var after = (encodeURIComponent(searchWiki.trim()));
    console.log(searchWiki);
    console.log(after);

    var wikiURL = "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=" + after;

    $.ajax({
        url: wikiURL,
        dataType: 'jsonp',
        success: function (data) {

            console.log(data);
            var id = Object.keys(data.query.pages)[0];
            // console.log(data.query.pages[id].extract);
            // console.log(data.query.pages[id].title);
            console.log(id);
            var wikiExtract = data.query.pages[id].extract;
            var wikiTitle = data.query.pages[id].title;
            console.log(wikiExtract);
            console.log(wikiTitle);

            // appending new Wikipedia elements on document
            for (var i = 0; i < 1; i++) {
                var newWikiDiv = $("<div>");
                var wikiExtDiv = $("<div>");
                var wikiTitleDiv = $("<div>");
                newWikiDiv.attr("id", "new-wiki-div");
                wikiExtDiv.attr("id", "wikipedia-extract");
                wikiTitleDiv.attr("id", "wikipedia-title");
                wikiExtDiv.attr("style", "text-align: justify");
                wikiExtDiv.text(wikiExtract);
                wikiTitleDiv.text(wikiTitle);
                $("#main-content").prepend(newWikiDiv);
                $("#new-wiki-div").prepend(wikiExtDiv);
                $("#new-wiki-div").prepend("<h3>" + "Article 1: " + wikiTitle + "</h3>");
                // $("#wikipedia-title").append("<h3>" + wikiTitle + "</h3>");
                // $("#wikipedia-extract").append(wikiTitleDiv);
                // $("#wikipedia-extract").append(wikiExtract);
            }
        }
    });
}