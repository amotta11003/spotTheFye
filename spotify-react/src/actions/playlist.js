import { api } from '../services';
import { login } from './auth';
import { getDate } from '../helpers';
var querystring = require('querystring');

//SELECTORS
export const getRecommendations = state => state.playlistGenerator.recommendations;

// PLAYLIST CREATION ACTIONS
export const createPlaylist = playlistInfo => (dispatch) => {
    var options = playlistInfo;
    var date = getDate();
    options['playlistName'] = `${date} Genres: ${options['seed_genres']} Artists: ${options['seed_artists']} Tracks: ${options['seed_tracks']}`;
    dispatch({type: "CREATE_PLAYLIST"});
    console.log("DISPATCHED CREATE_PLAYLIST, OPTIONS: " + JSON.stringify(options));
    let endpoint = `api/createplaylist?` + querystring.stringify(options);
    console.log("CREATE_PLAYLIST ENDPOINT: ", endpoint);
    api.get(endpoint)
        .then((response) => {
            if (response.data.statusCode === 401){ return dispatch(login()); }
            console.log("CREATE PLAYLIST RESPONSE: ", response.data);
            dispatch(createPlaylistSuccess(response.data));
            dispatch(loadPlaylistAsync(response.data.id));
        }).catch((error) => {
            return dispatch(createPlaylistError(error));
        });
};

export const createPlaylistAsync = playlistInfo => dispatch => {
    return Promise.all([dispatch(createPlaylist(playlistInfo))]);
};

export function createPlaylistSuccess (playlist) {
    console.log("DISPATCHED CREATE_PLAYLIST_SUCCESS")
    return {
        type: "CREATE_PLAYLIST_SUCCESS",
        payload: playlist
    }
};

export function createPlaylistError (error) {
    console.log("DISPATCHED CREATE_PLAYLIST_ERROR");
    return {
        type: "CREATE_PLAYLIST_ERROR",
        payload: error
    }
}

// PLAYLIST LOADING ACTIONS
export const loadPlaylist = playlistID => (dispatch, getState) => {
    dispatch({type: "LOAD_PLAYLIST"});
    console.log("DISPATCHED LOAD_PLAYLIST");
    const recommendations = getRecommendations(getState());
    let tracks = recommendations.map((track) => (track.uri));
    console.log("LOAD PLAYLIST (TRACKS): ", tracks);
    let endpoint = `api/loadplaylist?` + querystring.stringify({
        playlistID: playlistID,
        tracks: tracks
    });
    console.log("LOAD_PLAYLIST ENDPOINT: ", endpoint);
    api.get(endpoint)
        .then((response) => {
            if (response.data.statusCode === 401){ return dispatch(login()); }
            console.log("LOAD PLAYLIST RESPONSE: ", response.data);
            return dispatch(loadPlaylistSuccess(response.data));
        }).catch((error) => {
            return dispatch(loadPlaylistError(error));
        });
};

export const loadPlaylistAsync = playlistInfo => dispatch => {
    return Promise.all([dispatch(loadPlaylist(playlistInfo))]);
};

export function loadPlaylistSuccess (playlist) {
    console.log("DISPATCHED LOAD_PLAYLIST_SUCCESS")
    return {
        type: "LOAD_PLAYLIST_SUCCESS",
        payload: playlist
    }
};

export function loadPlaylistError (error) {
    console.log("DISPATCHED LOAD_PLAYLIST_ERROR");
    return {
        type: "LOAD_PLAYLIST_ERROR",
        payload: error
    }
}