// API key
var apiKey = "j35DYxgdTMaAnK6LR98HkviwSyGhfIul"

// Event listener for the search button
$("#search-button").on("click", function (event) {
    // event.preventDefault() function prevents the forms from trying to submit itself.
    event.preventDefault();

    // call search function
    searchArticle();
})

// function remove created divs
function clearDivs() {
    var removeDiv1 = $(".new-article-div");
    var removeDiv2 = $("#wikipedia-div");
    var removeDiv3 = $("#wikipedia-extract");
    var removeDiv4 = $("#wikipedia-title");

    removeDiv1.remove();
    removeDiv2.remove();
    removeDiv3.remove();
    removeDiv4.remove();
}


// access api in order to retrive articles
function searchArticle() {

    var articleNumberCount = 5;

    // grab the value form users input
    // save the value to varible userSearch
    var userSearch = $("#search").val().trim();
    var queryURL = "https://core.ac.uk:443/api-v2/search/" + userSearch + "?page=1&pageSize=10&apiKey=" + apiKey;

    // clear input value after user clicks on search
    $("#search").val("");

    // call function to remove divs
    clearDivs();

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
            articlesDiv.addClass("new-article-div");
            urlsEl.attr("href", urls);
            urlsEl.attr("target", "_blank");
            inquiryEl.addClass("new-class");
            datePublishedEl.addClass("date-published");
            inquiryEl.attr("data-name", userSearch);
            inquiryEl.text("Article " + articleNumberCount-- + ": " + userSearch);
            authorsEl.text(authors);
            descriptionEl.text(description);
            datePublishedEl.text(datePublished);
            topicsEl.text(topics);
            urlsEl.text(urls);
            // prepend the results on div #main-content
                $("#main-content").prepend(articlesDiv);
                $(".new-article-div").prepend(authorsEl);
                $(".new-article-div").prepend(descriptionEl);
                $(".new-article-div").prepend(datePublishedEl);
                $(".new-article-div").prepend(topicsEl);
                $(".new-article-div").prepend(urlsEl);
                $(".new-article-div").prepend(inquiryEl);
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
    // console.log(searchWiki);
    // console.log(after);

    var wikiURL = "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=" + after;

    $.ajax({
        url: wikiURL,
        dataType: 'jsonp',
        success: function (data) {

            // console.log(data);
            var id = Object.keys(data.query.pages)[0];
            // console.log(data.query.pages[id].extract);
            // console.log(data.query.pages[id].title);
            var wikiExtract = data.query.pages[id].extract;
            var wikiTitle = data.query.pages[id].title;
            // console.log(id);
            // console.log(wikiExtract);
            // console.log(wikiTitle);

            // prepending new Wikipedia elements on document
                var newWikiDiv = $("<div>");
                var wikiTitleEl = $("<h3>");
                newWikiDiv.attr("id", "wikipedia-div");
                wikiTitleEl.attr("id", "wikipedia-return");
                wikiTitleEl.text("Article 1: " + wikiTitle);
                $("#main-content").prepend(newWikiDiv);
                $("#wikipedia-div").prepend(wikiExtract);
                $("#wikipedia-div").prepend(wikiTitleEl);
        }
    });
}