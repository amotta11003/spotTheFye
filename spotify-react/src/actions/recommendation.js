import { api } from '../services';
import { login } from './auth';
import { createPlaylistAsync } from './playlist';
var querystring = require('querystring');

// RECOMMENDATION ACTIONS (BASED ON SEEDS)
export const fetchRecommendation = options => (dispatch) => {
    dispatch({type: "FETCH_RECOMMENDATION"});
    console.log("DISPATCHED FETCH_RECOMMENDATION, Options: " + JSON.stringify(options));
    var playlistInfo = {
        seed_artists: options['seedArtistIDs'],
        seed_tracks: options['seedTrackIDs'],
        seed_genres: options['seedGenres'],
        limit: options['limit']
    };
    for (var i = 0; i < Object.keys(options).length; i++){
        if (Object.keys(options)[i].includes('target')){ playlistInfo[Object.keys(options)[i]] = options[Object.keys(options)[i]]; }
    }
    let endpoint = `api/recommendation?` + querystring.stringify(playlistInfo);
    console.log("FETCH RECOMMENDATION ENDPOINT: ", endpoint);
    api.get(endpoint)
        .then((response) => {
            if (response.data.statusCode === 401){ return dispatch(login()); }
            console.log("RECOMMENDATION RESPONSE: ", response.data.tracks);
            dispatch(fetchRecommendationSuccess(response.data.tracks));
            dispatch(createPlaylistAsync({
                userID: options['userID'],
                seed_artists: options['seedArtists'],
                seed_tracks: options['seedTracks'],
                seed_genres: options['seedGenres']
            }));
        }).catch((error) => {
            return dispatch(fetchRecommendationError(error));
        });
};

export const fetchRecommendationAsync = options => dispatch => {
    return Promise.all([dispatch(fetchRecommendation(options))]);
};

export function fetchRecommendationSuccess (tracks) {
    console.log("DISPATCHED FETCH_RECOMMENDATION_SUCCESS")
    return {
        type: "FETCH_RECOMMENDATION_SUCCESS",
        payload: tracks
    }
};

export function fetchRecommendationError (error) {
    console.log("DISPATCHED FETCH_RECOMMENDATION_ERROR");
    return {
        type: "FETCH_RECOMMENDATION_ERROR",
        payload: error
    }
}