//
// Project LIRI
// LIRI (Interpretation and Recognition Interface)
// LIRI will search Spotify for songs, Bands in Town for concerts,
// and OMDB for movies.
//
// song.js - Proesses song requests 
//

// Load DotEnv library
require("dotenv").config();

// Load Spotify library
var Spotify = require('node-spotify-api');

// Load key file for Spotify
var keys = require("./keys.js");

// Load the log library
var LiriLog = require('./log.js');

// Create Spotify object
var spotify = new Spotify(keys.spotify);

// Default Spotify song
const DefaultSong =  "The Sign";

// Function to display song info
var displaySongInfo = (tracks) => {
    var songLogData;

    // Loop thru tracks
    tracks.forEach(function(track) {

        // Create song data
        songLogData = "----------------------------------------------\n" +
                    "Artist: " + track.album.artists[0].name + "\n" +
                    "Song: " + track.name + "\n" +
                    //"Release Date: " + track.album.release_date + "\n" +
                    "Preview link: " + track.preview_url + "\n" +
                    "Album: " +  track.album.name; 

        // Log song data
        LiriLog(songLogData);
    });
};

// Function to get song information
var getSongInfo = (args) => {
    var song;

    if (args.length > 1)
        // Get song
        song = args.slice(1).join(" ");
    else 
        song = DefaultSong;
   
    spotify.search({ type: 'track', query: song, limit: 10 })
    .then(function(response) {      
        //console.log(JSON.stringify(response, null, 2));
        if (response.tracks.items.length > 0) {    
            // Display song information  
            displaySongInfo(response.tracks.items);
        } else {
            // Oops... No data return for the artist
            LiriLog("Liri: Sorry no information for song: " + song);
        }
    })
    .catch(function(err) {
        // Something really bad happened... :(
        LiriLog("Liri: getSongInfo: Sorry an error occured: " + err);
    });
};

// Export the LIRI getSongInfo function
module.exports = getSongInfo;
