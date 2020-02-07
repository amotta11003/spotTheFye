/*import { api } from '../services';
import { login } from './auth';
import { getDate } from '../helpers';
var querystring = require('querystring');*/

//SELECTORS
export const getPlaylistGenerator = state => state.playlistGenerator;

export const reset = () => dispatch => {
    dispatch(resetSuccess());
};

export function resetSuccess() {
    return {type: "RESET"}
};




