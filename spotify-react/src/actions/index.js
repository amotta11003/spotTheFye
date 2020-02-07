import { createStructuredSelector } from 'reselect';
import { getTopStreamed, getTimeRange } from './topStreamed';
import { getPlaylistGenerator} from './playlistGenerator';
import { getUser } from './auth';

export * from './auth';
export * from './topStreamed';
export * from './playlistGenerator';
export * from './search';
export * from './seedArtistsTracks';
export * from './stepper';
export * from './recommendation';
export * from './playlist';
export * from './alert';
export * from './seedGenreAttrs';

export const getAppViewData = createStructuredSelector({
    user: getUser,
    topStreamed: getTopStreamed,
    timeRange: getTimeRange,
    playlistGenerator: getPlaylistGenerator
});