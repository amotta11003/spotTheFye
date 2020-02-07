//SEED GENRE ACTIONS
export const updateGenres = (event, value) => dispatch => {
    console.log("EVENT TARGET: ", event.target);
    dispatch(updateGenresSuccess(value));
}

export const removeGenre = genres => dispatch => {
    dispatch(updateGenresSuccess(genres));
};

export function updateGenresSuccess(genres) {
    return {
        type: "UPDATE_SEED_GENRES",
        payload: genres
    }
};

//SEED ATTRIBUTES
export const attrChange = (event, newValue) => dispatch => {
    dispatch(attrChangeSuccess(newValue, Object.values(event.target)[1]['aria-labelledby']));
};

export function attrChangeSuccess(value, attr){
    return{
        type:"ATTR_CHANGE",
        payload: {
            attr: attr,
            value: value
        }
    }
};

export const switchChange = (name, event) => dispatch => {
    console.log("TOGGLE SWITCH FOR  ", name);
    dispatch(switchChangeSuccess(name));
};

export function switchChangeSuccess(attr) {
    return {
        type: "SWITCH_CHANGE",
        payload: attr
    }
};

//NUM SONGS SELECT
export const numSongsChange = event => dispatch => {
    dispatch(numSongsChangeSuccess(event.target.value));
};

export function numSongsChangeSuccess(val) {
    return {
        type: "UPDATE_NUM_SONGS",
        payload: val
    }
};