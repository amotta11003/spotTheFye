//SEED ARTIST/TRACK ACTIONS
export const addSeed = seed => dispatch => {
    if (seed.type === 'artist') {dispatch(addSeedArtistSuccess(seed));}
    else {dispatch(addSeedTrackSuccess(seed));}
}

export function addSeedArtistSuccess(seed) {
    return {
        type: "ADD_SEED_ARTIST",
        payload: seed
    }
};

export function addSeedTrackSuccess(seed) {
    return {
        type: "ADD_SEED_TRACK",
        payload: seed
    }
};

export const updateSeedArtists = (artists) => dispatch => {
    dispatch(updateSeedArtistsSuccess(artists));
}

export function updateSeedArtistsSuccess(artists) {
    return {
        type: "UPDATE_SEED_ARTISTS",
        payload: artists
    }
};

export const updateSeedTracks = (tracks) => dispatch => {
    dispatch(updateSeedTracksSuccess(tracks));
}

export function updateSeedTracksSuccess(tracks) {
    return {
        type: "UPDATE_SEED_TRACKS",
        payload: tracks
    }
};

