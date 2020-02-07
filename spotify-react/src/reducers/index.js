import { combineReducers } from 'redux';
import { authentication } from './auth';
import { topStreamed } from './topStreamed';
import { playlistGenerator } from './playlistGenerator';

const rootReducer = combineReducers({ 
    authentication: authentication,
    topStreamed: topStreamed,
    playlistGenerator: playlistGenerator
});

export default rootReducer;