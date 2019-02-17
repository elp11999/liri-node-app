//
// LIRI Bot
// LIRI (Interpretation and Recognition Interface)
//

// Load DotEnv library
require("dotenv").config();

// Load File System library
var fs = require("fs");

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

// Deault Spotify song
var DefaultSong =  "The Sign";

// Log function
var log = (data) => {

    // Write to data to console
    console.log(data);

    // Write data to log file
    try {
        fs.appendFileSync("log.txt", (data + "\n"), "utf8");
    } catch (err) {
        console.log("Liri: Sorry an error occured: " + err);
    }
   
};

// Function to display song info
var displaySongInfo = (song, tracks) => {
    var songLogData;
    //log(JSON.stringify(tracks, null, 2));
    // Loop thru track
    tracks.forEach(function(track) {

        // Create song data
        songLogData = "----------------------------------------------\n" +
                    "Artist: " + track.album.artists[0].name + "\n" +
                    "Song: " + song + "\n" +
                    "Preview link: " + track.preview_url + "\n" +
                    "Album: " +  track.album.name; 

        // Log song data
        log(songLogData);
    });
};

// Function to display concert event Info
var displayConcertEventInfo = (artist, events) => {
    var location;
    var date;
    var eventLogData;
    
    // Loop thru each event
    events.forEach(function(event) {

        // Format the event location
        if (event.venue.region.length > 0)
            location = event.venue.city + ", " + event.venue.region + ", " + event.venue.country;
        else
            location = event.venue.city + ", " + event.venue.country;

        // Format the event date
        date = moment(event.datetime, moment.ISO_8601).format("MM/DD/YYYY");

        // Create event data
        eventLogData = "--------------------------------\n" +
                    "Artist: " + artist + "\n" +
                    "Venue: " + event.venue.name + "\n" +
                    "Location: " + location + "\n" +
                    "Date: " +  date;

        // Log event data
        log(eventLogData);
    });
}

// Function to get concert information
var getConcertInfo = (args) => {
    if (args.length > 1) {

        // Get artist
        var artist = args.slice(1).join(" ");

        // Query events for the artist
        axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (response) {     
            //console.log(JSON.stringify(response, null, 2));
            if (response.data.length > 0) {
                // Display the query results
                displayConcertEventInfo(artist, response.data);
            } else {
                // Oops... No data return for the artist
                log("Liri: Sorry no events scheduled for artist: " + artist);
            }
        })
        .catch(function (error) {
            // Something really bad happened... :(
            log("Liri: getConcertInfo: Sorry an error occured: " + error);
        });
    } else { 
        // User didn't give enough information  
        log("Missing command line argument. Please specify a band or artist.");
    }
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
            displaySongInfo(song, response.tracks.items);
        } else {
            // Oops... No data return for the artist
            log("Liri: Sorry no information for song: " + song);
        }
    })
    .catch(function(err) {
        // Something really bad happened... :(
        log("Liri: getSongInfo: Sorry an error occured: " + error);
    });
};

// Function to get movie information
var getMovieInfo = (args) => {
    log("getMovieInfo: started.");
};

// Function to get what-it-says information
var getWhatItSaysInfo = (args) => {
    log("getWhatItSaysInfo: started.");
};

// Let's get it going...
log("Liri: started!!!");

// Get command line arguments
var args = process.argv.slice(2);

// Ensure command line (arguments are present
if (args.length == 0) {
    log("Missing command line arguments.");
    return;
}

// Log the Liri command
log("Liri command: " + args.join(" "));

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
       log("Unknown command \"" + args[0] + "\"");
}

    