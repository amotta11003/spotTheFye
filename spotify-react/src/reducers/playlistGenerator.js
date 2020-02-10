const initialState = {
    activeStep: 0,
    numSongs: 20,
    seedGenres: [],
    seedArtists: {},
    seedTracks: {},
    searchType: 'artists',
    query: 'Pharrell',
    searchResults: [],
    recommendations: [],
    playlist: {},
    attrs: [
        {name: 'popularity',
        value: -1,
        checked: false,
        min: 0,
        max: 100,
        step: 10},

        {name: 'danceability',
        value: -1,
        checked: false,
        min: 0,
        max: 1,
        step: 0.1},

        {name: 'valence',
        value: -1,
        checked: false,
        min: 0,
        max: 1,
        step: 0.1},
        
        {name: 'energy',
        value: -1,
        checked: false,
        min: 0,
        max: 1,
        step: 0.1},
        
        {name: 'acousticness',
        value: -1,
        checked: false,
        min: 0,
        max: 1,
        step: 0.1},

        
        {name: 'instrumentalness',
        value: -1,
        checked: false,
        min: 0,
        max: 1,
        step: 0.1}
    ],
    alert: false,
    popover: false,
    anchorEl: null,
    error: null,
    fetching: false
};

export function playlistGenerator(state= initialState, action) {
    switch(action.type) {
        case "FETCH_SEARCH_RESULTS":
            return Object.assign({}, state, {fetching: true});
        
        case "FETCH_SEARCH_RESULTS_SUCCESS":
            return Object.assign({}, state, {
                searchResults: action.payload,
                fetching: false
            });
        
        case "FETCH_SEARCH_RESULTS_ERROR":
            return Object.assign({}, state, {
                error: action.payload,
                fetching: false
            });
        case "UPDATE_NUM_SONGS":
            return Object.assign({}, state, {numSongs: action.payload})
        
        case "UPDATE_ACTIVE_STEP":
            return Object.assign({}, state, {activeStep: action.payload})
        
        case "UPDATE_SEED_GENRES":
            return Object.assign({}, state, {seedGenres: action.payload})
        
        case "UPDATE_SEED_ARTISTS":
            var seedArtists = state.seedArtists;
            var seedArtistNames = action.payload;
            for (const artistName in seedArtists){
                if (!(seedArtistNames.includes(artistName))){
                    console.log("DELETING ARTIST: ", artistName);
                    delete seedArtists[artistName];
                }
            }
            return Object.assign({}, state, {seedArtists: seedArtists})
        
        case "UPDATE_SEED_TRACKS":
            var seedTracks = state.seedTracks;
            var seedTrackNames = action.payload;
            for (const trackName in seedTracks){
                if (!(seedTrackNames.includes(trackName))){
                    console.log("DELETING TRACK: ", trackName);
                    delete seedTracks[trackName];
                }
            }
            return Object.assign({}, state, {seedTracks: seedTracks})
        
        case "ADD_SEED_ARTIST":
            var currSeedArtists = state.seedArtists;
            currSeedArtists[action.payload.name] = action.payload.id
            return Object.assign({}, state, {seedArtists: currSeedArtists})
        
        case "ADD_SEED_TRACK":
            var currSeedTracks = state.seedTracks;
            currSeedTracks[action.payload.name] = action.payload.id;
            return Object.assign({}, state, {seedTracks: currSeedTracks})
        
        case "UPDATE_SEARCH_TYPE":
            return Object.assign({}, state, {
                searchType: action.payload,
                searchResults: []
            })
        
        case "UPDATE_QUERY":
            return Object.assign({}, state, {query: action.payload})

        case "FETCH_RECOMMENDATION":
            return Object.assign({}, state, {fetching: true});

        case "FETCH_RECOMMENDATION_SUCCESS":
            return Object.assign({}, state, {
                recommendations: action.payload,
                fetching: false
            });
        
        case "FETCH_RECOMMENDATION_ERROR":
            return Object.assign({}, state, {
                error: action.payload,
                fetching: false
            });
        
        case "CREATE_PLAYLIST":
            return Object.assign({}, state, {fetching: true});
    
        case "CREATE_PLAYLIST_SUCCESS":
            return Object.assign({}, state, {
                playlist: action.payload,
                fetching: false
            });
            
        case "CREATE_PLAYLIST_ERROR":
            return Object.assign({}, state, {
                error: action.payload,
                fetching: false
            });
        
        case "TOGGLE_ALERT":
            return Object.assign({}, state, { alert: action.payload});

        case "TOGGLE_POPOVER":
            return Object.assign({}, state, { 
                popover: action.payload.popover,
                anchorEl: action.payload.anchorEl
            });
        
        case "ATTR_CHANGE":
            const attributes = state.attrs;
            switch(action.payload.attr){
                case "popularity":
                    var acous1 = attributes;
                    acous1.splice(0, 1, {name: attributes[0].name,
                        value: action.payload.value,
                        checked: attributes[0].checked,
                        min: attributes[0].min,
                        max: attributes[0].max,
                        step: attributes[0].step});
                    return Object.assign({}, state, {attrs: acous1});
                case "danceability":
                    var dance1 = attributes;
                    dance1.splice(1, 1, {name: attributes[1].name,
                        value: action.payload.value,
                        checked: attributes[1].checked,
                        min: attributes[1].min,
                        max: attributes[1].max,
                        step: attributes[1].step});
                    return Object.assign({}, state, {attrs: dance1});
                case "valence":
                    var energy1 = attributes;
                    energy1.splice(2, 1, {name: attributes[2].name,
                        value: action.payload.value,
                        checked: attributes[2].checked,
                        min: attributes[2].min,
                        max: attributes[2].max,
                        step: attributes[2].step});
                    return Object.assign({}, state, {attrs: energy1}); 
                case "energy":
                    var inst1 = attributes;
                    inst1.splice(3, 1, {name: attributes[3].name,
                        value: action.payload.value,
                        checked: attributes[3].checked,
                        min: attributes[3].min,
                        max: attributes[3].max,
                        step: attributes[3].step});
                    return Object.assign({}, state, {attrs: inst1});    
                case "acousticness":
                    var pop1 = attributes;
                    pop1.splice(4, 1, {name: attributes[4].name,
                        value: action.payload.value,
                        checked: attributes[4].checked,
                        min: attributes[4].min,
                        max: attributes[4].max,
                        step: attributes[4].step});
                    return Object.assign({}, state, {attrs: pop1});  
                case "instrumentalness":
                    var val1 = attributes;
                    val1.splice(5, 1, {name: attributes[5].name,
                        value: action.payload.value,
                        checked: attributes[5].checked,
                        min: attributes[5].min,
                        max: attributes[5].max,
                        step: attributes[5].step});
                    return Object.assign({}, state, {attrs: val1});           
                default:
                    return state
            }
        
        case "SWITCH_CHANGE":
            const attrs = state.attrs;
            switch(action.payload){
                case "popularity":
                    //const acous = state.acousticness;
                    var acous2 = attrs;
                    if (!attrs[0].checked){
                        acous2.splice(0, 1, {name: attrs[0].name,
                                            value: 0,
                                            checked: !attrs[0].checked,
                                            min: attrs[0].min,
                                            max: attrs[0].max,
                                            step: attrs[0].step});
                        return Object.assign({}, state, {attrs: acous2});
                    } else {
                        acous2.splice(0, 1, {name: attrs[0].name,
                                            value: -1,
                                            checked: !attrs[0].checked,
                                            min: attrs[0].min,
                                            max: attrs[0].max,
                                            step: attrs[0].step})
                        return Object.assign({}, state, {attrs: acous2});
                    }
                
                case "danceability":
                    var dance2 = attrs;
                    if (!attrs[1].checked){
                        dance2.splice(1, 1, {name: attrs[1].name,
                                            value: 0,
                                            checked: !attrs[1].checked,
                                            min: attrs[1].min,
                                            max: attrs[1].max,
                                            step: attrs[1].step});
                        return Object.assign({}, state, {attrs: dance2});
                    } else {
                        dance2.splice(1, 1, {name: attrs[1].name,
                                            value: -1,
                                            checked: !attrs[1].checked,
                                            min: attrs[1].min,
                                            max: attrs[1].max,
                                            step: attrs[1].step});
                        return Object.assign({}, state, {attrs: dance2});
                    }
                
                case "valence":
                    var energy2 = attrs;
                    if (!attrs[2].checked){
                        energy2.splice(2, 1, {name: attrs[2].name,
                                            value: 0,
                                            checked: !attrs[2].checked,
                                            min: attrs[2].min,
                                            max: attrs[2].max,
                                            step: attrs[2].step});
                        return Object.assign({}, state, {attrs: energy2});
                    } else {
                        energy2.splice(2, 1, {name: attrs[2].name,
                                            value: -1,
                                            checked: !attrs[2].checked,
                                            min: attrs[2].min,
                                            max: attrs[2].max,
                                            step: attrs[2].step});
                        return Object.assign({}, state, {attrs: energy2});
                    }
                
                case "energy":
                    var inst2 = attrs;
                    if (!attrs[3].checked){
                        inst2.splice(3, 1, {name: attrs[3].name,
                                                value: 0,
                                                checked: !attrs[3].checked,
                                                min: attrs[3].min,
                                                max: attrs[3].max,
                                                step: attrs[3].step});
                        return Object.assign({}, state, {attrs: inst2});
                    } else {
                        inst2.splice(3, 1, {name: attrs[3].name,
                                                value: -1,
                                                checked: !attrs[3].checked,
                                                min: attrs[3].min,
                                                max: attrs[3].max,
                                                step: attrs[3].step});
                        return Object.assign({}, state, {attrs: inst2});
                    }
                
                case "acousticness":
                    var pop2 = attrs;
                    if (!attrs[4].checked){
                        pop2.splice(4, 1, {name: attrs[4].name,
                                            value: 0,
                                            checked: !attrs[4].checked,
                                            min: attrs[4].min,
                                            max: attrs[4].max,
                                            step: attrs[4].step});
                        return Object.assign({}, state, {attrs: pop2});
                    } else {
                        pop2.splice(4, 1, {name: attrs[4].name,
                                            value: -1,
                                            checked: !attrs[4].checked,
                                            min: attrs[4].min,
                                            max: attrs[4].max,
                                            step: attrs[4].step});
                        return Object.assign({}, state, {attrs: pop2});
                    }

                case "instrumentalness":
                    var val2 = attrs;
                    if (!attrs[5].checked){
                        val2.splice(5, 1, {name: attrs[5].name,
                                            value: 0,
                                            checked: !attrs[5].checked,
                                            min: attrs[5].min,
                                            max: attrs[5].max,
                                            step: attrs[5].step});
                        return Object.assign({}, state, {attrs: val2});
                    } else {
                        val2.splice(5, 1, {name: attrs[5].name,
                                            value: -1,
                                            checked: !attrs[5].checked,
                                            min: attrs[5].min,
                                            max: attrs[5].max,
                                            step: attrs[5].step});
                        return Object.assign({}, state, {attrs: val2});
                    }
                
                default:
                    return state
            }
        
        case "RESET":
            return {
                activeStep: 0, numSongs: 20, seedGenres: [], seedArtists: {}, seedTracks: {}, searchType: 'artists',
                query: 'Pharrell', searchResults: [], recommendations: [], playlist: {},
                attrs: [
                    {name: 'popularity',
                    value: -1,
                    checked: false,
                    min: 0,
                    max: 100,
                    step: 10},
            
                    {name: 'danceability',
                    value: -1,
                    checked: false,
                    min: 0,
                    max: 1,
                    step: 0.1},
            
                    {name: 'valence',
                    value: -1,
                    checked: false,
                    min: 0,
                    max: 1,
                    step: 0.1},
                    
                    {name: 'energy',
                    value: -1,
                    checked: false,
                    min: 0,
                    max: 1,
                    step: 0.1},
                    
                    {name: 'acousticness',
                    value: -1,
                    checked: false,
                    min: 0,
                    max: 1,
                    step: 0.1},
            
                    
                    {name: 'instrumentalness',
                    value: -1,
                    checked: false,
                    min: 0,
                    max: 1,
                    step: 0.1}
                ],
                alert: false, popover: false, anchorEl: null, error: null, fetching: false
            };
        
        default: 
            return state
    }
}