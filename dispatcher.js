//
// Project LIRI
// LIRI (Interpretation and Recognition Interface)
// LIRI will search Spotify for songs, Bands in Town for concerts,
// and OMDB for movies.
//
// dispatcher.js - Dispatches or routes the user's request to the appropriate destination for processing
//

// Load the log function
var LiriLog = require('./log.js');

// Load the Liri usage function
var LiriUsage = require('./usage.js');

// Load the getConcertInfo function
var LiriConcertInfo = require('./concert.js');

// Load the getMovieInfo function
var LiriMovieInfo = require('./movie.js');

// Load the getSongInfo function
var LiriSongInfo = require('./song.js');

// Process Command
var processCommand = (args) => {

    // Process command line arguments
    switch (args[0]) {
        case "concert-this" :
            LiriConcertInfo(args);
            break;
        case "spotify-this-song" :
            LiriSongInfo(args);
            break;
        case "movie-this" :        
            LiriMovieInfo(args);
            break;
        case "do-what-it-says" :
            LiriWhatItSaysInfo(args);
            break;
        case "?" :
        case "-?" :
        case "h" :
        case "-h" :
        case "help" :
        case "-help" :
            LiriUsage();
            break;
        default:
            LiriLog("Liri: Unknown command \"" + args[0] + "\"");
            LiriUsage();
            break;
    }    
};

// Export processCommand function
module.exports = processCommand;

// Load the WhatItSays function
var LiriWhatItSaysInfo = require('./whatitsays.js');