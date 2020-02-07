require('dotenv').config();

const config = {
    spotifyClientID: process.env.SPOTIFY_CLIENT_ID,
    spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectURI: process.env.REDIRECT_URI
};
   
module.exports = config;