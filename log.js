//
// LIRI Bot
// LIRI (Interpretation and Recognition Interface)
//
// LIRI Log function

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