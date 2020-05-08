var musicQuery = "http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=classical&api_key=d1d906a5cf18290e5ce9ee6df2fa0f87&format=json"
var playlist = $('#playlist');

var songs = [
  "songs/Moonlight Sonata.mp3",
  "songs/A quai.mp3",
  "songs/Divenire.mp3",
  "songs/Primavera.mp3",
  "songs/Ride of the Valkyries.mp3",
  "songs/Written On The Sky.mp3",
  "songs/Spiegel im Spiegel.mp3",
];

var songTitle = $('#songTitle');
var song = new Audio();
var currentSong = 0;

window.onload = playSong;

function playSong(){
  song.src = songs[currentSong];
  songTitle.text(songs[currentSong]);
  song.play();
}
//play or pause 
function playOrPauseSong(){
  if (song.paused){
    song.play();
    $("#play").text("play_circle_filled")
  } else {
    song.pause();
    $("#play").text("pause_circle_filled")
  }
}
// keep song playing one after another
song.addEventListener('timeupdate', function () {
  if(song.ended){
    next();
  }
})
//next song 
function next(){
  currentSong ++;
  if(currentSong > 6){
    currentSong = 0;
  }
  playSong();
}
//previous song 
function pre(){
  currentSong --;
  if(currentSong < 0){
    currentSong = 6;
  }
  playSong();
}
//ajax call to get information on the playlist
$.ajax({
  url: musicQuery,
  method: "GET"
}).then(function (response) {
  for (var i = 2; i < response.tracks.track.length; i = i + 7) {
    var songInfo = response.tracks.track[i]
    var songList = $('<ul>')
    songList.addClass('inside')
    var songName = songInfo.name
    var songTitleEl = $('<li>')
    songTitleEl.text(songName);
    var artist = songInfo.artist.name
    var artistNameEl = $('<li>')
    artistNameEl.text(artist)
    var libraryLinkEl = $('<li>')
    var ref = songInfo.artist.url
    var songURL = $('<a>',{
      href : ref,
      text : "Discover more from this artist"
    });
    songURL.attr('target', '_blank');
    libraryLinkEl.html(songURL)
    songList.append(songTitleEl, artistNameEl, libraryLinkEl)
    playlist.append(songList);
  } 

});

// $('#play').on('click', playSong);
