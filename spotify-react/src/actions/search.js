import { api } from '../services';
import { login } from './auth';
import { encodeSearchQuery } from '../helpers';

//SEARCH ACTIONS
export const fetchSearchResults = (query, type) => (dispatch) => {
    dispatch({type: "FETCH_SEARCH_RESULTS"});
    console.log("DISPATCHED FETCH_SEARCH_RESULTS, Query: " + query + ", Type: " + type);
    let encodedQuery = encodeSearchQuery(query);
    const map = {
        'artists': `api/searchartist?query=${encodedQuery}`,
        'tracks': `api/searchtrack?query=${encodedQuery}`,
        'playlists': `api/searchplaylist?query=${encodedQuery}`
    };
    let endpoint = map[type];

    console.log("FETCH SEARCH RESULTS: ENDPOINT = " + endpoint);
    //let params = { query: query };
    api.get(endpoint)
        .then((response) => {
            if (response.data.statusCode === 401){ return dispatch(login()); }
            switch(type){
                case 'artists':
                    return dispatch(fetchSearchResultsSuccess(response.data.artists.items));
                case 'tracks':
                    return dispatch(fetchSearchResultsSuccess(response.data.tracks.items));
                case 'playlists':
                    return dispatch(fetchSearchResultsSuccess(response.data.playlists.items));
                default:
                    return
            }
        }).catch((error) => {
            return dispatch(fetchSearchResultsError(error));
        });
};

export const fetchSearchResultsAsync = (query, type) => dispatch => {
    return Promise.all([dispatch(fetchSearchResults(query, type))]);
};

export function fetchSearchResultsSuccess (results) {
    console.log("DISPATCHED FETCH_SEARCH_RESULTS_SUCCESS")
    return {
        type: "FETCH_SEARCH_RESULTS_SUCCESS",
        payload: results
    }
};

export function fetchSearchResultsError (error) {
    console.log("DISPATCHED FETCH_SEARCH_RESULTS_ERROR");
    return {
        type: "FETCH_SEARCH_RESULTS_ERROR",
        payload: error
    }
}

//SEARCH TYPE ACTIONS (RADIO BUTTONS)
export const updateSearchType = event => dispatch => {
    dispatch(updateSearchTypeSuccess(event));
};

export function updateSearchTypeSuccess(event) {
    return {
        type: "UPDATE_SEARCH_TYPE",
        payload: event.target.value
    }
};

//QUERY ACTIONS
export const updateQuery = event => dispatch => {
    dispatch(updateQuerySuccess(event.target.value));
}

export function updateQuerySuccess(query) {
    return {
        type: "UPDATE_QUERY",
        payload: query
    }
};