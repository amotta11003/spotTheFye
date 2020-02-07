import { createSelector } from 'reselect';
import { api } from '../services';
import { login } from './auth';

//Selectors
export const getTopArtists = state => state.topStreamed.artists;
export const getTopTracks = state => state.topStreamed.tracks;
export const getTimeRange = state => state.topStreamed.timeRange;
export const getTopStreamed = createSelector(getTopArtists, getTopTracks, (artists, tracks) => {
    return {artists, tracks};
});

//Actions
export const fetchTop = (type) => (dispatch, getState) => {
    dispatch({ type: "FETCH_TOP_STREAMED" });
    console.log("DISPATCHED FETCH_TOP_STREAMED: " + type);
    const timeRanges = getTimeRange(getState());
    const timeRange = timeRanges[type];

    let endpoint =  (type === 'artists') ? `api/${timeRange}artists`: `api/${timeRange}tracks`;
    api.get(endpoint)
        .then((response) => {
            if (response.data.statusCode === 401){ return dispatch(login()); }
            if (response.config.url.includes('artists')) {
                return dispatch(fetchTopSuccess(Object.assign({}, response, {type: 'artists'})));
            }
            return dispatch(fetchTopSuccess(Object.assign({}, response, {type: 'tracks'})));
        }).catch((error) => {
            console.log("ERROR: " + error);
            return dispatch(fetchTopError(error));
        });
};

export function fetchTopSuccess (response) {
    console.log("DISPATCHED FETCH_TOP_STREAMED_SUCCESS");
    console.log(response.data);
    return {
        type: "FETCH_TOP_STREAMED_SUCCESS",
        payload: {
            type: response.type,
            data: response.data
        }
    }
}

export function fetchTopError (error) {
    console.log("DISPATCHED FETCH_TOP_STREAMED_ERROR");
    return {
        type: "FETCH_TOP_STREAMED_ERROR",
        payload: error
    }
}

export const fetchTopStreamed = () => dispatch => {
    return Promise.all([dispatch(fetchTop('artists')), dispatch(fetchTop('tracks'))]);
};

export const setTimeRange = type => timeRange => {
    console.log("SETTING TIME RANGE type: " + type + " timeRange: " + timeRange);
    return {
        type: "SET_TIME_RANGE",
        payload: {type, timeRange}
    }
}

export const setArtistsTimeRange = setTimeRange('artists');
export const setTracksTimeRange = setTimeRange('tracks');

export const updateTimeRange = type => timeRange => dispatch => {
    console.log("UPDATING TIME RANGE type: " + type + " timeRange: " + timeRange);
    dispatch(setTimeRange(type)(timeRange));
    dispatch(fetchTop(type));
};

export const updateTimeRangeArtists = updateTimeRange('artists');
export const updateTimeRangeTracks = updateTimeRange('tracks');
