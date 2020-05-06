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
  'songs/A quai.mp3',
  "songs/Moonlight Sonata.mp3",
  "songs/Divenire.mp3",
  'songs/Primavera.mp3',
  "songs/Ride of the Valkyries.mp3",
  "songs/Spiegel im Spiegel.mp3",
  "songs/Written On The Sky.mp3",
]
function createPlaylist(){
  var list = $('<ul>')
  for (var i = 0; i < songs.length; i++){
    var item = $('<li>')
    item.append(document.createTextNode(songs[i]))
    list.append(item);
  }
  return list 
}

$('#playlist').append(createPlaylist());
$('#playlist').on('click', function (e){
  console.log(e)
})

// $.ajax({
//   url: musicQuery,
//   method: "GET"
// }).then(function (response) {
//   for (var i = 2; i < response.tracks.track.length; i = i + 7) {
//       // console.log(musicQuery);
//       // console.log(response);
//     var songInfo = response.tracks.track[i]
//     // console.log(songInfo);
//     var songList = $('<ul>')
//     var songTittle = songInfo.name
//     // console.log(songTittle);
//     $('<li>').text(songTittle);
//     var artist = songInfo.artist.name
//     $('<li>').text(artist);
//     var ref = songInfo.url
//     var link = $('<p>').text(ref)
//     console.log(link);
//     var songURL = $('<a>',{
//       href : link,
//       text : "Discover more from this artist"
//     });
//     songList.append(songTittle, artist, songURL)
//     playlist.append(songList);
//   }

// });
//create an song folder with all the mp3 files 
//create ajax function to get information from API 
  //get song tittle and artist and image 
//append info to music div 
//write function to play mp3 
//write function to display only info related to the mp3 file that is playing 
  //compare name? somehow tie the audio file to the info? 
