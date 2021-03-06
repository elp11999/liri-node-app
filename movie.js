//
// Project LIRI
// LIRI (Interpretation and Recognition Interface)
// LIRI will search Spotify for songs, Bands in Town for concerts,
// and OMDB for movies.
//
// movie.js - Proesses movie requests 
//

// Load Axios library
var axios = require('axios');

// Load the log library
var LiriLog = require('./log.js');

// Default Movie
const DefaultMovie = "Mr. Nobody";

// Display Movie data
var displayMovieInfo = (data) => {
    var movieLogData;

    // Get movie ratings
    var imdbRating = (data.Ratings.length > 0) ? data.Ratings[0].Value : "N/A";
    var rottenTomatoesRating = (data.Ratings.length > 1) ? data.Ratings[1].Value : "N/A";

    // Create movie data
    movieLogData = "--------------------------------\n" +
                "Title: " + data.Title + "\n" +
                "Year Release: " + data.Year + "\n" +
                "IMDB Rating: " + imdbRating + "\n" +
                "Rotten Tomatoes Rating: " + rottenTomatoesRating + "\n" +
                "Country: " + data.Country + "\n" +
                "Plot: " + data.Plot + "\n" +
                "Actors: " + data.Actors + "\n";

    // Log event data
    LiriLog(movieLogData);
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
            displayMovieInfo(response.data);
        else
        LiriLog("Liri: getMovieInfo: Sorry an error occured: " + response.data.Error);
    })
    .catch(function (error) {
        // Something really bad happened... :(
        LiriLog("Liri: getMovieInfo: Sorry an error occured: " + error);
    });
};

// Export the LIRI getMovieInfo function 
module.exports = getMovieInfo;