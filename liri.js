//
// Project LIRI
// LIRI (Interpretation and Recognition Interface)
// LIRI will search Spotify for songs, Bands in Town for concerts,
// and OMDB for movies.
//
// liri.js - Entry point to the LIRI application 
//

// Load the log function
var LiriLog = require('./log.js');

// Load the processCommand function
var LiriProcessCommand = require('./dispatcher.js');

// Let's get it going...
LiriLog("Liri: started.");

// Get command line arguments
var args = process.argv.slice(2);

// Ensure command line arguments are present
if (args.length == 0) {
    LiriLog("Liri: Missing command line arguments.");
    return;
}

// Log the Liri command
LiriLog("Liri: Command: " + args.join(" "));

// Process the liri command
LiriProcessCommand(args);