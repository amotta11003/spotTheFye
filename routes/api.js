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
var stateKey = 'spotify_auth_state';

router.get('/', function(req, res, next) {
    res.send('API is working properly');
});

router.get('/callback', function(req, res) {
  
    // your application requests refresh and access tokens
    // after checking the state parameter
  
    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;
  
    if (state === null || state !== storedState) {
        res.redirect('/#' +
            querystring.stringify({
            error: 'state_mismatch'
        }));
    } else {

      res.clearCookie(stateKey);
      var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: spotifyApi._credentials.redirect_uri,
          grant_type: 'authorization_code'
        },
        headers: {
          'Authorization': 'Basic ' + (Buffer.from(spotifyApi._credentials.client_id + ':' + spotifyApi._credentials.client_secret).toString('base64'))
        },
        json: true
      };
  
      request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var access_token = body.access_token,
              refresh_token = body.refresh_token;
            
            spotifyApi.setAccessToken(access_token);
            spotifyApi.setRefreshToken(refresh_token);

            var options = {
                url: 'https://api.spotify.com/v1/me',
                headers: { 'Authorization': 'Bearer ' + access_token },
                json: true
            };
            // use the access token to access the Spotify Web API
            request.get(options, function(error, response, body) {
                console.log(body);
              res.redirect('https://spotthefye.herokuapp.com/#' +
                querystring.stringify({
                    access_token: access_token,
                    refresh_token: refresh_token,
                    userID: body.id
            }));
            });
            // we can also pass the token to the browser to make requests from there
            /*res.redirect('http://localhost:3000/callback/#' +
                querystring.stringify({
                    access_token: access_token,
                    refresh_token: refresh_token,
                    userID: userID
            }));*/
        } else {
          res.redirect('/#' +
            querystring.stringify({
              error: 'invalid_token'
            }));
        }
      });
    }
  });
  

// TOP STREAMED ARTISTS---------------------------------------------------------------
router.get('/shorttermartists', function(req, res, next) {
    var options = {'limit': 50, 'time_range': 'short_term'};
    spotifyApi.getMyTopArtists(options)
        .then(function(data) {
            //console.log('Top artists (Past month): ', JSON.stringify(data.body.items));
            res.send(data.body.items);
        }, function(err) {
            console.log('Something went wrong!', err);
            res.send(err);
        });
});

router.get('/mediumtermartists', function(req, res, next) {
    var options = {'limit': 50, 'time_range': 'medium_term'};
    spotifyApi.getMyTopArtists(options)
      .then(function(data) {
          //console.log('Top artists (Past 6 months): ', JSON.stringify(data.body.items));
          res.send(data.body.items);
      }, function(err) {
          console.log('Something went wrong!', err);
          res.send(err);
      });
});

router.get('/longtermartists', function(req, res, next) {
    var options = {'limit': 50, 'time_range': 'long_term'};
    spotifyApi.getMyTopArtists(options)
      .then(function(data) {
          //console.log('Top artists (Past few years): ', JSON.stringify(data));
          res.send(data.body.items);
      }, function(err) {
          console.log('Something went wrong!', err);
          res.send(err);
      });
});

//TOP STREAMED TRACKS------------------------------------------------------------------
router.get('/shorttermtracks', function(req, res, next) {
  var options = {'limit': 50, 'time_range': 'short_term'};
  spotifyApi.getMyTopTracks(options)
    .then(function(data) {
        //console.log('Top tracks (Past month): ', JSON.stringify(data.body.items));
        res.send(data.body.items);
    }, function(err) {
        console.log('Something went wrong!', err);
        res.send(err);
    });
});

router.get('/mediumtermtracks', function(req, res, next) {
  var options = {'limit': 50, 'time_range': 'medium_term'};
  spotifyApi.getMyTopTracks(options)
    .then(function(data) {
        //console.log('Top tracks (Past 6 months): ', JSON.stringify(data));
        res.send(data.body.items);
    }, function(err) {
        console.log('Something went wrong!', err);
        res.send(err);
    });
});

router.get('/longtermtracks', function(req, res, next) {
  var options = {'limit': 50, 'time_range': 'long_term'};
  spotifyApi.getMyTopTracks(options)
    .then(function(data) {
        //console.log('Top tracks (Past few years): ', JSON.stringify(data));
        res.send(data.body.items);
    }, function(err) {
        console.log('Something went wrong!', err);
        res.send(err);
    });
});

//SEARCH-------------------------------------------------------------------------------------
router.get('/searchartist', function(req, res, next) {
  var query = req.query.query; // Grab text from search input --MUST BE ENCODED '%20' or '+' for spaces
  //console.log("QUERY (server side) IS " + query);
  var types = ['artist']; //Grab search types from checkboxes i.e. [artist, track, playlist]
  spotifyApi.search(query, types)
    .then(function(data){
        //console.log("SEARCH DATA: " + JSON.stringify(data));
        res.send(data.body);
    }, function(err) {
        console.log("ERROR SERVER SIDE: ", JSON.stringify(err));
        res.send(err);
    });
});

router.get('/searchtrack', function(req, res, next) {
  var query = req.query.query; // Grab text from search input --MUST BE ENCODED '%20' or '+' for spaces
  //console.log("QUERY (server side) IS " + query);
  var types = ['track']; //Grab search types from checkboxes i.e. [artist, track, playlist]
  spotifyApi.search(query, types)
    .then(function(data){
        //console.log("SEARCH DATA: " + JSON.stringify(data));
        res.send(data.body);
    }, function(err) {
        res.send(err);
    });
});

router.get('/searchplaylist', function(req, res, next) {
  var query = req.query.query; // Grab text from search input --MUST BE ENCODED '%20' or '+' for spaces
  console.log("QUERY (server side) IS " + query);
  var types = ['playlist']; //Grab search types from checkboxes i.e. [artist, track, playlist]
  spotifyApi.search(query, types)
    .then(function(data){
        res.send(data.body);
    }, function(err) {
        res.send(err);
    });
});

//RECOMMENDATION BASED ON SEEDS
router.get('/recommendation', function(req, res, next) {
  var options = req.query;
  console.log("OPTIONS (Server side): " + JSON.stringify(options));
  spotifyApi.getRecommendations(options)
    .then(function(data){
        console.log("RECOMMENDATION RESPONSE (Server side): " + data.body);
        res.send(data.body);
    }, function(err){
        res.send(err);
    });
});

//PLAYLIST CREATION
router.get('/createplaylist', function(req, res, next) {
  var userID = req.query.userID;
  var playlistName = req.query.playlistName;
  console.log("CREATE PLAYLIST (Server side)-- USER ID: " + userID + ' PLAYLIST NAME: ' + playlistName);
  spotifyApi.createPlaylist(userID, playlistName, {public: false})
    .then(function(data){
        console.log("CREATE PLAYLIST RESPONSE (Server side): " + data.body);
        res.send(data.body);
    }, function(err){
        res.send(err);
    });
});

//PLAYLIST LOADING
router.get('/loadplaylist', function(req, res, next) {
  var playlistID = req.query.playlistID;
  var tracks = req.query.tracks;
  console.log("LOAD PLAYLIST (Server side)-- PLAYLIST ID: " + playlistID + ' TRACKS: ' + tracks);
  spotifyApi.addTracksToPlaylist(playlistID, tracks)
    .then(function(data){
        console.log("LOAD PLAYLIST RESPONSE (Server side): " + data.body);
        res.send(data.body);
    }, function(err){
        res.send(err);
    });
});



module.exports = router;