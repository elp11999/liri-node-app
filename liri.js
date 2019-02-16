//
// LIRI Bot
// LIRI (Interpretation and Recognition Interface)
//

// Load DotEnv library
require("dotenv").config();

// Load Moment library
var moment = require('moment');

// Load Axios library
var axios = require('axios');

// Load key file for Spotify
var keys = require("./keys.js");

// Load Spotify library
var Spotify = require('node-spotify-api');

// Create Spotify object
var spotify = new Spotify(keys.spotify);

// Function to get concert information
var getConcertInfo = (args) => {
    console.log("getConcertInfo: started.");
    if (args.length > 1) {
        var artist = args.slice(1).join(" ");
        axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    } else    
        console.log("Missing command line argument. Please specify a band or artist.");
};

// Function to get song information
var getSongInfo = (args) => {
    console.log("getSongInfo: started.");
};

// Function to get movie information
var getMovieInfo = (args) => {
    console.log("getMovieInfo: started.");
};

// Function to get what-it-says information
var getWhatItSaysInfo = (args) => {
    console.log("getWhatItSaysInfo: started.");
};

// Let's get it going...
console.log("Liri: started!!!");

// Get command line arguments
var args = process.argv.slice(2);

// Ensure command line (arguments are present
if (args.length == 0) {
    console.log("Missing command line arguments.");
    return;
}

// Process command
switch (args[0]) {
    case "concert-this" :
        getConcertInfo(args);
        break;
    case "spotify-this-song" :
        getSongInfo(args);
        break;
    case "movie-this" :        
        getMovieInfo(args);
        break;
    case "do-what-it-says" :
        getWhatItSaysInfo(args);
        break;
    default:
        console.log("Unknown command \"" + args[0] + "\"");
}

    