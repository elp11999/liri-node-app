//
// Project LIRI
// LIRI (Interpretation and Recognition Interface)
// LIRI will search Spotify for songs, Bands in Town for concerts,
// and OMDB for movies.
//
// whatitsays.js - Proesses command requests in file random.txt
//

// Load File System library
var fs = require("fs");

// Load the log function
var LiriLog = require('./log.js');

// Load the dispatcher function
var LiriProcessCommand = require('./dispatcher.js');

// Command file
const commandFile = "random.txt";

// Function to get what-it-says information
var LiriWhatItSaysInfo = (args) => {
    var fileData;
    var commands;
    var args = [];

    // Read command data from file
    try {
        var fileData = fs.readFileSync(commandFile, "utf8");
    } catch (err) {
        LiriLog("Liri: Sorry an error occured reading from " + commandFile + ": " + err);
        return;
    }

    // Check for file data
    if (fileData.length == 0) {
        LiriLog("Liri: Sorry an error occured reading from " + commandFile + ": No command data found.");
        return;
    }

    // Split file data by new lines
    commands = fileData.split("\r\n");

    // Process each command in the file
    commands.forEach(function(data) {
        // Create command array
        args.push(data.substring(0, data.indexOf(" ")));
        args.push(data.substring(data.indexOf(" ")).trim());

        // Log command            
        LiriLog("Liri: Command: " + args.join(" "));

        // Process command
        LiriProcessCommand(args);

        // Clear argument array
        args.splice(0, args.length);
    });
};

// Export the whatItSaysTestFunction
module.exports = LiriWhatItSaysInfo;