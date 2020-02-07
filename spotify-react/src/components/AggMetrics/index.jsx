import React from 'react';
import Typography from '@material-ui/core/Typography';

// helper functions
function avgPop(items){
    return (items.map(({popularity}) => popularity).reduce((sum, i) => sum + i, 0)) / 50.0;
}

function maxPop(items) {
    if (items.length === 0) return 0;
    return (items.map(({popularity}) => popularity).reduce(function(max, i){
        if (max > i) return max;
        else if (max < i) return i;
        else return max;
    }, 0));
}

function minPop(items) {
    if (items.length === 0) return 999;
    return (items.map(({popularity}) => popularity).reduce(function(min, i){
        if (min < i) return min;
        else if (min > i) return i;
        else return min;
    }, 999));
}

function findItemWithPop(items, pop){
    if (items.length === 0) return "";
    return items.find(function(item){ return item.popularity === pop; });
}

//aggregate metrics components
const AggArtistMetrics = ({topStreamed}) => (

    <Typography align='center' color='textPrimary'>
        <span>Your average artist popularity is <b>{avgPop(topStreamed.artists)}</b>.</span><br/>
        <span>The most popular artist in your list is <b>{findItemWithPop(topStreamed.artists, maxPop(topStreamed.artists)).name}</b>.</span><br/>
        <span>The least popular artist in your list is <b>{findItemWithPop(topStreamed.artists, minPop(topStreamed.artists)).name}</b>.</span>
    </Typography>
);

const AggTrackMetrics = ({topStreamed}) => (
        <Typography align='center' color='textPrimary'>
        <span>Your average track popularity is <b>{avgPop(topStreamed.tracks)}</b>.</span><br/>
        <span>The most popular track in your list is <b>{findItemWithPop(topStreamed.tracks, maxPop(topStreamed.tracks)).name}</b>.</span><br/>
        <span>The least popular track in your list is <b>{findItemWithPop(topStreamed.tracks, minPop(topStreamed.tracks)).name}</b>.</span>
        </Typography>
);

export {
    AggArtistMetrics,
    AggTrackMetrics
}
