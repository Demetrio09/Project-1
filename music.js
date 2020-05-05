var musicQuery = "http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=classical&api_key=d1d906a5cf18290e5ce9ee6df2fa0f87&format=json"
var musicDiv = $('#music-div');
var aQuai = new Audio('songs/A quai.mp3')
var sonata = new Audio("Moonlight Sonata.mp3")
var divenire = new Audio("Divenire.mp3")
var pimavera = new Audio("Pimavera.mp3")
var Valkyries =  new Audio("Ride of the Valkyries.mp3")
var spiegels = new Audio("Spiegel im Spiegel.mp3")
var sky = new Audio("Written On The Sky.mp3")
var songs = [aQuai,sonata]
// var musicList = $("<audio>")
// musicList.attr("src", songs)
var playButton = $('#play');

playButton.on('click', function () {
  for ( var i = 0; i <songs.length; i++){

    if (i.paused) {
      i.play();
    } else {
      i.pause();
    }
  }
});

$.ajax({
  url: musicQuery,
  method: "GET"
}).then(function (response) {
  for (var i = 2; i < response.tracks.track.length; i = i + 7) {
    //   console.log(musicQuery);
    //   console.log(response);
    var songInfo = response.tracks.track[i]
    console.log(songInfo);
    var songTittle = $('<h4>').text(songInfo.name)
    console.log(songTittle);
    var artist = $('<h5>').text(songInfo.artist.name)
    console.log(artist);
    var songImg = songInfo.image[0]
    console.log(songImg);
    musicDiv.append(songTittle, artist);
    //is there a way to capture the image from API and append to page?
  }

});
//create an song folder with all the mp3 files 
//create ajax function to get information from API 
  //get song tittle and artist and image 
//append info to music div 
//write function to play mp3 
//write function to display only info related to the mp3 file that is playing 
  //compare name? somehow tie the audio file to the info? 
