var express = require('express');
var request = require('request');
var router = express.Router();
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var SpotifyWebApi = require('spotify-web-api-node');
const config = require('../config/config');

// credentials 
var spotifyApi = new SpotifyWebApi({
  client_id: config.spotifyClientID,
  client_secret: config.spotifyClientSecret,
  redirect_uri: config.redirectURI
});

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };
  
var stateKey = 'spotify_auth_state';

router.get('/', function(req, res, next) {
    res.send('API is working properly');
});

router.get('/login', function(req, res) {
    console.log("LOGGING IN (SERVER SIDE)");
    console.log("CLIENT ID: ", spotifyApi._credentials.client_id);
    console.log("CLIENT ID: ", process.env.SPOTIFY_CLIENT_ID);
    console.log("CLIENT SECRET: ", spotifyApi._credentials.client_secret);
    console.log("CLIENT SECRET: ", process.env.SPOTIFY_CLIENT_SECRET);
    console.log("REDIRECT URI: ", spotifyApi._credentials.redirect_uri);
    console.log("REDIRECT URI: ", process.env.REDIRECT_URI);
    var state = generateRandomString(16);
    res.cookie(stateKey, state);
  
    // your application requests authorization
    var scope = 'user-top-read playlist-modify-private';
    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: spotifyApi._credentials.client_id,
        scope: scope,
        redirect_uri: spotifyApi._credentials.redirect_uri,
        state: state
      }));
  });
  
router.get('/refresh_token', function(req, res) {
  
    // requesting access token from refresh token
    var refresh_token = req.query.refresh_token;
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: { 'Authorization': 'Basic ' + (Buffer.from(spotifyApi._credentials.client_id + ':' + spotifyApi._credentials.client_secret).toString('base64')) },
      form: {
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      },
      json: true
    };
  
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token;
        spotifyApi.setAccessToken(access_token);
        res.send({
          'access_token': access_token
        });
      }
    });
});

module.exports = router;