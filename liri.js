//
// Project LIRI
// LIRI (Interpretation and Recognition Interface)
// LIRI will search Spotify for songs, Bands in Town for concerts,
// and OMDB for movies. 
//

// Load DotEnv library
require("dotenv").config();

// Load File System library
var fs = require("fs");

// Load the log function
var LiriLog = require('./log.js');

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
        default:
        LiriLog("Liri: Unknown command \"" + args[0] + "\"");
    }    
};

// Export processCommand function
module.exports = processCommand;

// Load the WhatItSays function
var LiriWhatItSaysInfo = require('./whatitsays.js');

// Let's get it going...
LiriLog("Liri: started.");

// Get command line arguments
var args = process.argv.slice(2);

// Ensure command line (arguments are present
if (args.length == 0) {
    LiriLog("Liri: Missing command line arguments.");
    return;
}

// Log the Liri command
LiriLog("Liri: Command: " + args.join(" "));

// Process the liri command
processCommand(args);



    