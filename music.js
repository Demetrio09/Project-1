var musicQuery = "http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=classical&api_key=d1d906a5cf18290e5ce9ee6df2fa0f87&format=json"
var playlist = $('#playlist');
// var aQuai = new Audio('songs/A quai.mp3')
// var sonata = new Audio("songs/Moonlight Sonata.mp3")
// var divenire = new Audio("songs/Divenire.mp3")
// var primavera = new Audio("songs/Primavera.mp3")
// var Valkyries = new Audio("songs/Ride of the Valkyries.mp3")
// var spiegels = new Audio("songs/Spiegel im Spiegel.mp3")
// var sky = new Audio("songs/Written On The Sky.mp3")
var songs = [
  "songs/Moonlight Sonata.mp3",
  "songs/A quai.mp3",
  "songs/Divenire.mp3",
  "songs/Primavera.mp3",
  "songs/Ride of the Valkyries.mp3",
  "songs/Spiegel im Spiegel.mp3",
  "songs/Written On The Sky.mp3",
];

var songTittle = $('#songTittle');
var song = new Audio();
var currentSong = 0;
// var fillBar = $('#fill');

window.onload = playSong;
// $('#play').on('click', playSong);

function playSong(){
  song.src = songs[currentSong];
  songTittle.text(songs[currentSong]);
  song.play();
}

function playOrPauseSong(){
  if (song.paused){
    song.play();
    $("#play material-icons").attr("data-name", "play_circle_filled")
  } else {
    song.pause();
    $("#play material-icons").attr("data-name", "pause_circle_filled")
  }
}

song.addEventListener('timeupdate', function () {
  // var position = song.currentTime / song.duration;
  // fillBar.style.width = position*100+'%';
  if(song.ended){
    next();
  }
})

function next(){
  currentSong ++;
  if(currentSong > 6){
    currentSong = 0;
  }
  playSong();
  $("play material-icons").attr("data-name", "pause_circle_filled");
}

function pre(){
  currentSong --;
  if(currentSong < 0){
    currentSong = 6;
  }
  playSong();
  $("play material-icons").attr("data-name", "pause_circle_filled");
}


$.ajax({
  url: musicQuery,
  method: "GET"
}).then(function (response) {
  for (var i = 2; i < response.tracks.track.length; i = i + 7) {
      // console.log(musicQuery);
      console.log(response);
    var songInfo = response.tracks.track[i]
    // console.log(songInfo);
    var songList = $('<ul>')
    songList.addClass('inside')
    var songTittle = songInfo.name
    // console.log(songTittle);
    $('<li>').text(songTittle);
    var artist = songInfo.artist.name
    $('<li>').text(artist);
    var ref = songInfo.artist.url
    var link = $('<p>').text(ref)
    console.log(ref);
    var songURL = $('<a>',{
      href : link,
      text : "Discover more from this artist"
    });
    songList.append(songTittle, artist, songURL)
    playlist.append(songList);
  } 

});

