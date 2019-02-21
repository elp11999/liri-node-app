//
// Project LIRI
// LIRI (Interpretation and Recognition Interface)
// LIRI will search Spotify for songs, Bands in Town for concerts,
// and OMDB for movies.
//
// usage.js - Displays usage message to user
//

// Load the log library
var LiriLog = require('./log.js');

// Function to display command ussae
var displayUsage = () => {

    // Create help message
    var help = "\nliri: Usage\n" +
           "liri concert-this {band or artist}\n" +
           "liri spotify-this-song {name of a song}\n" +
           "liri movie-this {name of a movie}\n" +
           "liri do-what-it-says\n"; 

    // Display help message
    LiriLog(help);
}

// Export the LIRI displayUsage function 
module.exports = displayUsage;
