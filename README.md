# liri-node-app

* This project is a NodeJS based application. The project is call LIRI. LIRI is a Language Interpretation and Recognition Interface. LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies. 
* This project was a perfect way for me to get introduced to NodeJS.
* This project uses the following NPM packages:
  * Node-Spotify-API
  * Axios
  * Moment
  * DotEnv
* This project uses the following NodeJS API packages:
  * Node-Spotify-API
  * Bands in Town
  * OMDB

* The project will accept the following command line arguments:
  * concert-this [band or artist]
    * Example: node liri.js concert-this Slayer
    * This example will display all the upcoming concerts for Slayer
    * Below is a screen shot of this example:
    ![ScreenShot](https://raw.github.com/elp11999/liri-node-app/master/images/concert-this.png)
  * spotify-this-song [name of a song]
    * Example: node liri.js spotify-this-song Hells Bells
    * This example will display all the known tracks for the song Hells Bells
    * Below is a screen shot of this example:
    ![ScreenShot](https://raw.github.com/elp11999/liri-node-app/master/images/spotify-this-song.png)
  * movie-this [name of a movie]
    * Example: node liri.js movie-this Pulp Fiction
    * This example will display information about the movie Pulp Fiction
    * Below is a screen shot of this example:    
    ![ScreenShot](https://raw.github.com/elp11999/liri-node-app/master/images/movie-this.png)
  * do-what-it-says
    * Example: node liri.js do-what-it-says
    * This example will read and process commands from the file readme.txt.        
    * Below is a screen shot of this example:
    ![ScreenShot](https://raw.github.com/elp11999/liri-node-app/master/images/do-what-it-says.png)

* If you decide to clone this repository and check it out, please follow these instructions:
  * Make sure you have NodeJS installed.
    * https://nodejs.org/en/download/
  * Run npm install to setup the dependecies.
  * Obtain a Spotify API client id and client secret: 
    * https://developer.spotify.com/my-applications/#!/applications/create
  * Create file .env and enter the client id an client secret this format:
    * SPOTIFY_ID=your-spotify-id
    * SPOTIFY_SECRET=your-spotify-secret

* If you have any questions about the project, please contact me at mhenderson557@yahoo.com
* Enjoy :) 
