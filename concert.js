//
// LIRI Bot
// LIRI (Interpretation and Recognition Interface)
//
// LIRI Concert information

// Load Axios library
var axios = require('axios');

// Load Moment library
var moment = require('moment');

// Load the log library
var LiriLog = require('./log.js');

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
        LiriLog(eventLogData);
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
                LiriLog("Liri: Sorry no events scheduled for artist: " + artist);
            }
        })
        .catch(function (error) {
            // Something really bad happened... :(
            LiriLog("Liri: getConcertInfo: Sorry an error occured: " + error);
        });
    } else { 
        // User didn't give enough information  
        LiriLog("Liri: Missing command line argument. Please specify a band or artist.");
    }
};

// Export the LIRI getConcertInfo function
module.exports = getConcertInfo;