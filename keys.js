//
// Project LIRI
// LIRI (Interpretation and Recognition Interface)
// LIRI will search Spotify for songs, Bands in Town for concerts,
// and OMDB for movies.
//
// keys.js - Export Spotify key information
//
console.log('Keys.js is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};
