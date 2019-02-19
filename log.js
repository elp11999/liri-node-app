//
// Project LIRI
// LIRI (Interpretation and Recognition Interface)
// LIRI will search Spotify for songs, Bands in Town for concerts,
// and OMDB for movies.
//
// log.js - Writes log messages to a log file "log.txt".
//

// Load File System library
var fs = require("fs");

// Log file
const logFile = "log.txt";

// Logging function
var log = (data) => {

    // Write to data to console
    console.log(data);

    // Write data to log file
    try {
        fs.appendFileSync(logFile, (data + "\n"), "utf8");
    } catch (err) {
        console.log("Liri: Sorry an error occured writing to " + logFile + ": " + err);
    }
   
};

// Export the LIRI logger function
module.exports = log;