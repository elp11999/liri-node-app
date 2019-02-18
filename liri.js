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

// Default Spotify song
const DefaultSong =  "The Sign";

// Default Movie
const DefaultMovie = "Mr. Nobody";

// Command file
const commandFile = "random.txt";

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

// Display Movie data
var displayMovieInfo = (movie, data) => {
    var movieLogData;

    // Create movie data
    movieLogData = "--------------------------------\n" +
                "Title: " + movie + "\n" +
                "Year Release: " + data.Year + "\n" +
                "IMDB Rating: " + data.Ratings[0].Value + "\n" +
                "Rotten Tomatoes Rating: " + data.Ratings[1].Value + "\n" +
                "Country: " + data.Country + "\n" +
                "Plot: " + data.Plot + "\n" +
                "Actors: " + data.Actors + "\n";

    // Log event data
    log(movieLogData);
};

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
        log("Liri: Missing command line argument. Please specify a band or artist.");
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
    var movie;
    var queryResult;

    // Get movie to query
    if (args.length > 1)
        movie = args.slice(1).join(" ");
    else 
        movie = DefaultMovie;

    // Query movie information
    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy")
    .then(function (response) {   
        //console.log(JSON.stringify(response.data, null, 2));
        if (response.data.Response === "True")
            // Display movie information  
            displayMovieInfo(movie, response.data);
        else
            log("Liri: getMovieInfo: Sorry an error occured: " + response.data.Error);
    })
    .catch(function (error) {
        // Something really bad happened... :(
        log("Liri: getMovieInfo: Sorry an error occured: " + error);
    });
};

// Function to get what-it-says information
var getWhatItSaysInfo = (args) => {
    var fileData;
    var commands;
    var command = [];

    // Read command data from file
    try {
        var fileData = fs.readFileSync(commandFile, "utf8");

        // Check for file data
        if (fileData.length == 0) {
            console.log("Liri: Sorry an error occured reading from " + commandFile + ": No command data found.");
            return;
        }

        // Split file data by new lines
        commands = fileData.split("\r\n");

        // Process each command in the file
        commands.forEach(function(data) {
            // Create command array
            command.push(data.substring(0, data.indexOf(" ")));
            command.push(data.substring(data.indexOf(" ")).trim());    
            // Process command
            processCommand(command);
            command.splice(0, command.length);
        });
    } catch (err) {
        console.log("Liri: Sorry an error occured reading from " + commandFile + ": " + err);
    }
};

// Process Command
var processCommand = (args) => {

    // Process command line arguments
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
           log("Liri: Unknown command \"" + args[0] + "\"");
    }
    
}

// Let's get it going...
log("Liri: started!!!");

// Get command line arguments
var args = process.argv.slice(2);

// Ensure command line (arguments are present
if (args.length == 0) {
    log("Liri: Missing command line arguments.");
    return;
}

// Log the Liri command
log("Liri: Command: " + args.join(" "));

// Process command
processCommand(args);

    