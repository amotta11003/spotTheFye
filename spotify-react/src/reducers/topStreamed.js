const initialState = {
    artists: [],
    tracks:[],
    timeRange: {
        artists: 'shortterm',
        tracks: 'shortterm'
    },
    error: null,
    fetching: false
};

export function topStreamed(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_TOP_STREAMED':
            //console.log(JSON.stringify(Object.assign({}, state, {fetching: true})));
            return Object.assign({}, state, {fetching: true});
        case 'FETCH_TOP_STREAMED_SUCCESS':
            //console.log(JSON.stringify(Object.assign({}, state, {artists: action.payload, fetching: false})));
            if (action.payload.type === 'artists'){
                return Object.assign({}, state, {
                    artists: action.payload.data, 
                    fetching: false
                });
            }
            return Object.assign({}, state, {
                tracks: action.payload.data, 
                fetching: false
            });
            
        case 'FETCH_TOP_STREAMED_ERROR':
            return Object.assign({}, state, {
                error: action.payload, 
                fetching: false
            }); 
        case 'SET_TIME_RANGE':
            console.log("SET TIME RANGE REDUCER");
            const currTimeRange = state.timeRange;
            if (action.payload.type === 'artists'){
                return Object.assign({}, state, {
                    timeRange:{
                        artists: action.payload.timeRange,
                        tracks: currTimeRange.tracks
                    }
                });
            }
            return Object.assign({}, state, {
                timeRange:{
                    artists: currTimeRange.artists,
                    tracks: action.payload.timeRange
                }
            });
        default:
            return state
    }
}

